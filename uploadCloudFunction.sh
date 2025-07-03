#!/bin/bash

echo "开始上传云函数..."

# 上传第一阶段云函数
echo "上传 generate-safe-replies 云函数..."
cd cloudfunctions/generate-safe-replies && npm install && cd ../..

# 上传第二阶段云函数  
echo "上传 add-compensation 云函数..."
cd cloudfunctions/add-compensation && npm install && cd ../..

echo "云函数上传完成！请在微信开发者工具中手动部署。"