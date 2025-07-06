#!/bin/bash

# 智能差评转化助手 - 部署脚本
# 使用此脚本快速部署到Vercel

echo "🚀 开始部署智能差评转化助手..."

# 检查是否安装了Vercel CLI
if ! command -v vercel &> /dev/null; then
    echo "📦 正在安装 Vercel CLI..."
    npm install -g vercel
fi

# 构建项目
echo "🔨 构建项目..."
npm run build

# 部署到Vercel
echo "🌍 部署到Vercel..."
vercel --prod

echo "✅ 部署完成！"
echo "🎉 您的智能差评转化助手已成功部署"
echo "📱 请在Vercel控制台查看您的项目链接" 