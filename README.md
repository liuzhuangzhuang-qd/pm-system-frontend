# pm-system-frontend

轻量级项目管理系统前端（Vue 3 + Vite + Element Plus + Pinia + Vue Router + ECharts）。

## 运行环境

- Node.js 16+ 建议使用 18+
- npm 或 pnpm、yarn 均可

## 安装依赖

```bash
cd pm-system-frontend
npm install
```

## 开发启动

```bash
npm run dev
```

默认启动在 `http://localhost:8081`，并通过 Vite 代理将 `/api` 请求转发到 `http://localhost:8080`。

如需自定义后端地址，可在根目录创建 `.env.development`，配置：

```env
VITE_API_BASE_URL=/api
```

或直接改为：

```env
VITE_API_BASE_URL=http://your-backend-host
```

## 主要技术点

- 路由：`hash` 模式，按业务模块拆分，支持角色路由控制
- 状态管理：`Pinia` 管理用户、应用状态，并对用户信息做 `localStorage` 持久化
- 接口封装：Axios 统一封装请求/响应拦截，处理 token、错误提示、401 跳转登录
- 页面功能：登录、仪表盘、项目/任务/看板、缺陷、报表、系统管理、通知等模块

