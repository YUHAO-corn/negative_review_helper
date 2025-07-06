import { NextRequest, NextResponse } from 'next/server';

interface AddCompensationRequest {
  originalReply: string;
  compensationType: string;
}

/**
 * 构建发送给大语言模型的指令 (Prompt)
 */
const buildPrompt = (originalReply: string, compensationType: string) => {
  const promptContent = `
**角色**: 你是一个专业的文本编辑。

**核心任务**:
1.  **理解原文**: 阅读下面提供的【原始回复文本】。
2.  **融入补偿**: 将指定的【补偿措施】自然、流畅地整合进原始回复中，使其看起来像一个完整的、一气呵成的回复。不要只是简单地在末尾追加。
3.  **保持风格**: 在修改过程中，必须保持【原始回复文本】的语气和风格不变。
4.  **直接输出**: 你的回答只能包含修改后的最终回复文本，不要有任何额外的解释或标签。

**补偿类型处理说明**:
- **重做一份**: 表示将重新制作/配送，可融入"我们马上重做一份"等表述
- **立即退款**: 表示办理退款，可融入"我们立即为您办理退款"等表述  
- **赠送优惠券**: 表示赠送优惠，可融入"我们送您一张优惠券"等表述
- **专人跟进**: 表示安排专人联系处理，可融入"我们安排专人联系您"、"客服经理会亲自跟进"等表述

**原始回复文本**:
\`\`\`
${originalReply}
\`\`\`

**补偿措施**:
\`\`\`
${compensationType}
\`\`\`
`;

  return [
    {
      role: "user",
      content: promptContent.trim()
    }
  ];
};

export async function POST(request: NextRequest) {
  try {
    const body: AddCompensationRequest = await request.json();
    const { originalReply, compensationType } = body;

    if (!originalReply || !compensationType) {
      return NextResponse.json(
        { errCode: -2, errMsg: '请求参数错误，缺少原始回复或补偿类型。' },
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
        { errCode: -1, errMsg: '云函数未配置API密钥。' },
        { status: 500 }
      );
    }

    const messages = buildPrompt(originalReply, compensationType);

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
      const finalReply = data.choices[0].message.content;
      return NextResponse.json({
        errCode: 0,
        errMsg: 'success',
        data: {
          finalReply: finalReply
        }
      });
    } else {
      throw new Error("大模型返回数据结构不符合预期。");
    }

  } catch (error) {
    console.error('调用大模型API失败:', error);

    let errMsg = '调用补偿服务失败，请稍后再试。';
    if (error instanceof Error) {
      errMsg = error.message;
    }

    return NextResponse.json(
      { errCode: -3, errMsg: errMsg },
      { status: 500 }
    );
  }
} 