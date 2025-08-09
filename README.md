# 🚀 Vite MPA 项目

这是一个使用 Vite 构建的多页面应用(MPA)项目，支持统一构建和独立构建模式。

注意：

1. 保持全部入口 html 文件都在项目根目录，没有单独整理到一个文件夹下，是为了保持对应 dist 产物的结构正确。
2. 独立构建模式下，产物包是 user-level/user-level.html，而不是 user-level/index.html，这个问题待确认。

## 📦 构建模式

### 1. 统一构建模式（默认）

将所有入口点构建到同一个 `dist/` 目录下：

```bash
npm run build
```

优势：

- 所有页面共享依赖，减少重复打包
- 便于统一管理资源
- 便于部署和更新

构建结果：

```
dist/
├── logout-account.html
├── user-level.html
└── assets/
```

### 2. 独立构建模式

每个入口点构建到独立的目录：

```bash
npm run build:separate
```

优势：

- 每个页面独立打包，互不干扰
- 便于独立部署和更新

构建结果：

```
dist/
├── logout-account/
│   └── logout-account.html    # 注销账户页面独立包
└── user-level/
    └── user-level.html        # 用户等级页面独立包
```

## 🔧 配置架构

### 入口点配置 (`config/entries.js`)

```javascript
export const entries = {
  'logout-account': {
    input: resolve(rootDir, 'logout-account.html'),
    name: 'logout-account',
  },
  'user-level': {
    input: resolve(rootDir, 'user-level.html'),
    name: 'user-level',
  },
}
```

### 添加新入口点

1. 在 `config/entries.js` 中添加新入口配置
2. 创建对应的 HTML 文件
3. 无需修改其他配置文件

## 🛠️ 开发命令

```bash
# 启动开发服务器
npm run dev

# 统一构建（所有入口到同一目录）
npm run build

# 独立构建（每个入口到独立目录）
npm run build:separate

# 预览构建结果
npm run preview
```
