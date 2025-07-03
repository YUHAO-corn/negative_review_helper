# 提示词管理 📝

本文件夹用于集中管理差评转化助手的所有AI提示词，便于维护和优化。

## 📁 文件结构

```
prompts/
├── README.md                   # 本说明文档
├── index.js                    # 提示词统一导出文件
├── generate-safe-replies.js    # 第一阶段：生成安全回复
└── add-compensation.js         # 第二阶段：添加补偿措施
```

## 🚀 使用方法

### 在云函数中导入
```javascript
// 导入所有提示词
const { generateSafeRepliesPrompt, addCompensationPrompt } = require('../../../miniprogram/prompts');

// 使用第一阶段提示词
const prompt1 = generateSafeRepliesPrompt(reviewText, language);

// 使用第二阶段提示词  
const prompt2 = addCompensationPrompt(originalReply, compensationType);
```

### 单独导入特定提示词
```javascript
const { generateSafeRepliesPrompt } = require('../../../miniprogram/prompts/generate-safe-replies');
```

## ⚙️ 提示词参数说明

### generateSafeRepliesPrompt(reviewText, language)
- `reviewText`: 用户输入的差评内容
- `language`: 回复语言 ('cantonese' | 'mandarin')
- **返回**: 完整的LLM提示词字符串
- **生成**: 9种回复 (3个角度 × 3种风格)
  - **角度**: 诚恳道歉、问题解释、安抚用户
  - **风格**: 诚恳、卖萌(含emoji)、霸气

### addCompensationPrompt(originalReply, compensationType)  
- `originalReply`: 原始回复文本
- `compensationType`: 补偿类型
  - `'重做一份'`: 重新制作/配送
  - `'立即退款'`: 办理退款
  - `'赠送优惠券'`: 赠送优惠
  - `'专人跟进'`: 安排专人联系处理 ✨ **新增**
- **返回**: 完整的LLM提示词字符串

## 📝 修改指南

1. **修改现有提示词**: 直接编辑对应的`.js`文件
2. **添加新提示词**: 
   - 创建新的`.js`文件
   - 在`index.js`中添加导出
   - 更新本README文档
3. **版本控制**: 修改后记得更新`index.js`中的版本信息

## 🎯 设计原则

- **模块化**: 每个提示词独立文件，便于维护
- **参数化**: 使用模板字符串，支持动态内容
- **标准化**: 统一的导出格式和命名规范
- **文档化**: 详细的注释和使用说明

## 📅 更新记录

- **v3.1** (2024-12-18): 🔄 业务优化更新
  - 将"幽默化解"改为"安抚用户" 
  - 将"专业解释"改为"问题解释"
  - 增加卖萌风格的emoji使用说明
  - 新增"专人跟进"补偿选项
- **v2.0** (2024-12-18): 重构提示词管理系统，模块化设计
- **v1.0** (2024-12-15): 初始版本，直接在云函数中定义 