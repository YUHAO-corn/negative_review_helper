import { NextRequest, NextResponse } from 'next/server';

interface GenerateRepliesRequest {
  reviewText: string;
  language: 'mandarin' | 'cantonese';
}

/**
 * 根据设计文档，构建发送给大语言模型的完整指令 (Prompt)
 */
const buildPrompt = (reviewText: string, language: string) => {
  const langMap = {
    mandarin: '普通话',
    cantonese: '粤语'
  };

  const promptContent = `
**角色**: 你是一个顶级的商家客服专家，拥有多年的客户关系处理经验，尤其擅长处理外卖差评。你的目标是通过专业、有同理心且高效的沟通，将负面评价转化为正面体验。

**核心任务**:
1.  **深度分析差评**: 对以下用户差评进行多维度分析。
2.  **生成高质量、无成本承诺的回复**: 根据分析结果，结合多种【角度】和【风格】，为指定的 **${langMap[language as keyof typeof langMap] || '粤语'}** 生成9种回复。
3.  **严格的安全限制**: **绝对禁止** 在回复中提及任何形式的具体补偿措施，例如"退款"、"重做"、"补送"、"优惠券"、"代金券"、"折扣"等词语。回复应聚焦于安抚情绪、解释问题和表达歉意。
4.  **格式化输出**: 你的最终回答必须是一个完整的、可以被程序直接解析的JSON对象，严格遵循以下结构，不要有任何多余的文字、解释或代码块标记。

**回复质量准则 (必须严格遵守)**:
*   **避免空话套话**: 不要使用"我们深感抱歉"、"给您带来不便敬请谅解"等模板式语句。
*   **共情与安抚**: 真诚地站在用户的角度理解他的感受。
*   **主动承担责任**: 不要推卸责任，直接承认问题所在。
*   **承诺跟进，而非成本补偿**: 可以承诺进行内部调查、或由专人联系客户，但不能直接提出任何需要成本的补偿方案。
*   **体现品牌个性**: 在不同风格的回复中，注入对应的品牌人设。

**风格说明**:
*   **诚恳风格**: 语气真诚、专业，表达责任感
*   **卖萌风格**: 适当使用emoji表情符号（如😅🥰😊等），语气可爱亲切，但仍保持专业
*   **霸气风格**: 语气自信、有担当，体现品牌实力

**用户差评**:
\`\`\`
${reviewText}
\`\`\`

**输出JSON结构**:
\`\`\`json
{
  "analysis": {
    "issueType": "分析出的问题类型 (例如: 配送问题, 菜品质量, 服务态度)",
    "anger": "一个代表用户愤怒程度的整数 (0-100)",
    "keywords": "提取出的核心矛盾关键词 (字符串)"
  },
  "replies": {
    "诚恳道歉": {
      "sincere": "基于'诚恳道歉'角度的诚恳回复",
      "cute": "基于'诚恳道歉'角度的卖萌回复（含emoji）",
      "confident": "基于'诚恳道歉'角度的霸气回复"
    },
    "问题解释": {
      "sincere": "基于'问题解释'角度的诚恳回复", 
      "cute": "基于'问题解释'角度的卖萌回复（含emoji）",
      "confident": "基于'问题解释'角度的霸气回复"
    },
    "安抚用户": {
      "sincere": "基于'安抚用户'角度的诚恳回复",
      "cute": "基于'安抚用户'角度的卖萌回复（含emoji）", 
      "confident": "基于'安抚用户'角度的霸气回复"
    }
  }
}
\`\`\`
`;

  return [
    {
      role: "system",
      content: "You are a helpful assistant."
    },
    {
      role: "user",
      content: promptContent.trim()
    }
  ];
};

/**
 * 清理并解析来自大模型的回复
 */
const parseLLMResponse = (rawContent: string) => {
  // 去除可能的Markdown代码块标记
  const cleanedContent = rawContent.replace(/^```json\s*/, '').replace(/\s*```$/, '');
  try {
    return JSON.parse(cleanedContent);
  } catch (e) {
    console.error("Failed to parse LLM response JSON:", e);
    console.error("Raw content was:", rawContent);
    throw new Error("返回数据格式错误，无法解析为JSON。");
  }
};

export async function POST(request: NextRequest) {
  try {
    const body: GenerateRepliesRequest = await request.json();
    const { reviewText, language } = body;

    if (!reviewText) {
      return NextResponse.json(
        { errCode: -2, errMsg: '请求参数错误，缺少评价内容(reviewText)。' },
        { status: 400 }
      );
    }

    // 从环境变量中获取API密钥
    const apiKey = process.env.ARK_API_KEY;
    const modelId = 'doubao-1-5-pro-32k-250115';
    const url = 'https://ark.cn-beijing.volces.com/api/v3/chat/completions';

    if (!apiKey) {
      console.error("API Key not found in environment variables.");
      return NextResponse.json(
        { errCode: -1, errMsg: 'API密钥未配置，请联系管理员。' },
        { status: 500 }
      );
    }

    const messages = buildPrompt(reviewText, language);

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({ 
        model: modelId, 
        messages 
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`API错误: ${response.status} ${JSON.stringify(errorData)}`);
    }

    const data = await response.json();

    if (data && data.choices && data.choices[0]) {
      const resultData = parseLLMResponse(data.choices[0].message.content);
      return NextResponse.json({
        errCode: 0,
        errMsg: 'success',
        data: resultData
      });
    } else {
      throw new Error("大模型返回数据结构不符合预期。");
    }

  } catch (error) {
    console.error('调用大模型API失败:', error);

    let errMsg = '调用大模型服务失败，请稍后再试。';
    if (error instanceof Error) {
      errMsg = error.message;
    }

    return NextResponse.json(
      { errCode: -3, errMsg: errMsg },
      { status: 500 }
    );
  }
} 