# 🏗️ 构建说明

## 📦 构建模式

项目支持两种构建模式：

### 1. 统一构建模式（默认）
将所有入口点构建到同一个 `dist/` 目录下：
```bash
npm run build
```

### 2. 独立构建模式（推荐）
每个入口点构建到独立的目录：

#### 构建所有入口点
```bash
npm run build:separate
```
构建结果：
```
dist/
├── main/     # 主页面独立包
├── home/     # 首页独立包
└── contact/  # 联系页面独立包
```

#### 构建单个入口点
```bash
# 使用脚本（推荐）
npm run build:single main
npm run build:single home
npm run build:single contact

# 直接使用环境变量
npm run build:main
npm run build:home
npm run build:contact
```

## 🚀 部署优势

### 独立部署
每个目录都是完整的独立包，可以：
- 部署到不同的服务器
- 使用不同的CDN
- 独立更新发布
- 分别配置缓存策略

### 资源优化
- 共享依赖会在各自目录中优化打包
- 只包含当前页面需要的资源
- 支持Tree Shaking和代码分割

## 📁 构建产物结构

每个独立构建目录包含：
```
dist/main/
├── index.html          # 页面HTML文件
├── assets/
│   ├── index-xxx.js    # 页面主逻辑
│   ├── vue-xxx.js      # Vue框架（共享依赖）
│   ├── common-xxx.js   # 共享组件和工具
│   └── index-xxx.css   # 样式文件
└── favicon.ico         # 静态资源
```

## 🎯 使用场景

### 微前端架构
- 每个页面作为独立的微应用
- 可以由不同团队维护
- 支持独立技术栈升级

### 渐进式迁移
- 逐步替换旧页面
- 保持现有页面不受影响
- 支持A/B测试

### 多环境部署
- 测试环境只部署部分页面
- 生产环境分批发布
- 支持蓝绿部署策略

## ⚡ 性能对比

| 构建模式 | 首屏加载 | 缓存利用 | 部署灵活性 |
|---------|---------|---------|-----------|
| 统一构建 | 较慢     | 较好     | 较低       |
| 独立构建 | 较快     | 很好     | 很高       |

## 🔧 自定义配置

如需添加新的入口点，只需：

1. 在 `vite.config.js` 的 `entries` 对象中添加新入口
2. 在构建脚本中添加对应的入口名称
3. 创建对应的HTML文件和页面组件

示例：
```javascript
// vite.config.js
const entries = {
  main: { input: resolve(__dirname, 'index.html'), name: 'main' },
  home: { input: resolve(__dirname, 'home.html'), name: 'home' },
  contact: { input: resolve(__dirname, 'contact.html'), name: 'contact' },
  about: { input: resolve(__dirname, 'about.html'), name: 'about' } // 新增
}
```