# 🤖 智能差评转化助手

> 基于AI的商家差评回复生成工具，帮助商家用专业话术化解用户负面情绪

## ✨ 产品亮点

- 🎯 **真实AI分析**：接入字节跳动豆包大模型，提供专业分析
- 🗣️ **双语支持**：支持普通话/粤语双语言模式
- 🎨 **多种风格**：提供诚恳、卖萌、霸气三种回复风格
- 📱 **iPhone容器展示**：精美的iPhone手机容器，完美展示移动端效果
- ⚡ **即时生成**：30秒内生成专业回复话术
- 🔄 **实时切换**：动态选择回复策略和风格

## 🚀 在线体验

[📱 web端立即体验](https://your-project.vercel.app) （部署后更新链接）

## �� 产品截图

![小程序实机效果](/screenshots/iphone-container.png)

## 🛠️ 技术栈

### 前端技术
- **框架**: Next.js 15 (App Router)
- **UI组件**: shadcn/ui
- **样式**: Tailwind CSS
- **动画**: Framer Motion
- **图标**: Lucide React
- **语言**: TypeScript

### 后端技术
- **API**: Next.js API Routes
- **AI模型**: 字节跳动豆包大模型 (Doubao)
- **HTTP客户端**: Fetch API

### 开发工具
- **包管理**: npm
- **代码规范**: ESLint + Prettier
- **部署**: Vercel

## 💡 核心功能

### 1. 智能分析
- 差评内容解析
- 情绪强度评估（0-100分）
- 问题类型识别
- 关键矛盾提取

### 2. 策略生成
- **诚恳道歉**：表明重视用户反馈，承诺优化
- **问题解释**：解释问题原因，表明非故意
- **安抚用户**：理解用户情绪，消除负面感受

### 3. 补偿方案
- **重做一份**：AI融入重做信息
- **立即退款**：AI融入退款信息
- **赠送优惠券**：AI融入优惠券信息
- **专人跟进**：AI融入专人跟进信息

## 🎯 使用场景

- 📦 商家平台客服回复
- 🍔 餐饮外卖差评处理
- 🏨 酒店民宿评价回复
- 🛍️ 零售服务投诉处理
- 💼 各类服务业客诉处理

## 📊 产品优势

### 传统人工回复 vs AI智能回复

| 对比项目 | 人工回复 | AI智能回复 |
|---------|---------|-----------|
| 响应速度 | 5-30分钟 | 30秒内 |
| 回复质量 | 依赖个人水平 | 专业话术保证 |
| 情绪控制 | 容易受个人情绪影响 | 客观冷静分析 |
| 成本效益 | 人力成本高 | 自动化降本增效 |
| 一致性 | 回复质量参差不齐 | 统一专业标准 |

## 🔧 本地开发

### 环境要求
- Node.js 18.17+
- npm 9.0+
- 豆包API密钥

### 快速开始

```bash
# 克隆项目
git clone https://github.com/yourusername/negative-review-helper-web.git

# 进入项目目录
cd negative-review-helper-web

# 安装依赖
npm install

# 配置环境变量
cp env.example .env.local
# 编辑 .env.local 文件，填入你的豆包API密钥

# 启动开发服务器
npm run dev
```

打开 [http://localhost:3000](http://localhost:3000) 查看效果。

### 🔑 API密钥配置

1. **获取豆包API密钥**：
   - 访问 [火山引擎控制台](https://console.volcengine.com/ark/region:ark+cn-beijing/model)
   - 注册/登录账号
   - 创建推理接入点
   - 获取API密钥

2. **配置环境变量**：
   ```bash
   # 复制示例文件
   cp env.example .env.local
   
   # 编辑 .env.local 文件
   ARK_API_KEY=your_actual_api_key_here
   ```

### 可用脚本

```bash
# 开发模式
npm run dev

# 构建生产版本
npm run build

# 启动生产服务器
npm start

# 代码检查
npm run lint

# 类型检查
npm run type-check
```

## 📁 项目结构

```
negative-review-helper-web/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── api/                # API 路由
│   │   │   ├── add-compensation/ # 补偿接口
│   │   │   └── generate-replies/ # 豆包AI接口
│   │   ├── globals.css         # 全局样式
│   │   ├── layout.tsx          # 根布局
│   │   └── page.tsx            # 主页面
│   ├── components/             # 组件目录
│   │   ├── ui/                 # shadcn/ui 组件
│   │   └── PhoneContainer.tsx  # iPhone容器组件
│   └── lib/                    # 工具函数
├── public/                     # 静态资源
├── env.example                 # 环境变量示例
├── package.json               # 依赖配置
├── tailwind.config.js         # Tailwind 配置
├── tsconfig.json              # TypeScript 配置
└── README.md                  # 项目说明
```

## 🎨 设计理念

### iPhone容器设计
- **真实iPhone外观**：完整的iPhone外壳、刘海、按钮细节
- **沉浸式体验**：深色背景突出手机容器
- **移动端优化**：专为移动端体验设计的布局

### 色彩系统
- **主色调**: 紫色渐变 (Purple to Pink)
- **辅助色**: 灰色系 (Slate)
- **功能色**: 成功绿、警告黄、错误红

### 交互设计
- **流畅动画**: 使用 Framer Motion 提供丝滑体验
- **响应式布局**: 移动优先的设计策略
- **微交互**: 悬停效果和点击反馈

## 🚀 部署指南

### Vercel 部署（推荐）

1. **推送代码到GitHub**
2. **在Vercel导入项目**
3. **配置环境变量**：
   - 在Vercel项目设置中添加环境变量
   - `ARK_API_KEY` = 你的豆包API密钥
4. **自动部署完成**

### 环境变量配置

在Vercel部署时，需要在项目设置中配置以下环境变量：

```
ARK_API_KEY=your_doubao_api_key_here
```

### 其他部署方式

- **Netlify**: 支持静态站点部署（需要配置Serverless Functions）
- **Railway**: 支持全栈应用部署
- **Docker**: 容器化部署

## 📈 功能路线图

### 当前版本 (v1.0)
- ✅ 真实AI接口集成（豆包大模型）
- ✅ iPhone容器移动端展示
- ✅ 多策略回复生成
- ✅ 补偿功能
- ✅ 响应式界面设计

### 计划功能 (v2.0)
- 🔄 支持更多AI模型选择
- 📊 数据统计和分析
- 🎨 更多回复风格
- 💾 历史记录保存
- 🔐 用户登录系统
- 📱 补偿建议功能

## 🤖 AI模型说明

本项目使用字节跳动的**豆包大模型** (Doubao-1.5-pro-32k)：
- **高质量回复**：经过专业训练的商务对话模型
- **多语言支持**：支持普通话和粤语回复
- **安全可控**：严格控制不提供具体补偿承诺
- **快速响应**：平均响应时间30秒以内

## 🤝 贡献指南

欢迎提交 Issues 和 Pull Requests！

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

## 📄 许可证

MIT License - 详见 [LICENSE](LICENSE) 文件

## 📞 联系方式

- 📧 邮箱: your-email@example.com
- 🐱 GitHub: [@yourusername](https://github.com/yourusername)
- 💬 微信: your-wechat-id

---

⭐ 如果这个项目对你有帮助，请给一个 Star 支持！ 