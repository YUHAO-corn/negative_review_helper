/**
 * 提示词管理中心 (v3.1)
 * 统一导出所有提示词，方便在云函数中使用
 */

const { generateSafeRepliesPrompt } = require('./generate-safe-replies');
const { addCompensationPrompt } = require('./add-compensation');

module.exports = {
  // 第一阶段：生成安全回复
  generateSafeRepliesPrompt,
  
  // 第二阶段：添加补偿措施
  addCompensationPrompt,
  
  // 提示词版本信息
  version: '3.1',
  lastUpdated: '2024-12-18',
  changes: [
    '将"幽默化解"改为"安抚用户"',
    '将"专业解释"改为"问题解释"', 
    '增加卖萌风格的emoji使用说明',
    '新增"专人跟进"补偿选项'
  ]
}; 