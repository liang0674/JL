# Leon Sun · 个人作品网站

响应式中英文个人网站，使用 HTML、CSS、JavaScript，无需构建或安装依赖。

## 本地运行

在仓库目录执行：

```bash
python3 -m http.server 8877 --bind 127.0.0.1
```

打开 http://127.0.0.1:8877/ 。

## 收录案例

- **Neverin 品牌创立与 0—1 建设**：策略与职责、视觉方案手稿、发型与妆容参考、视频脚本、视频、传播视觉、包装及成果复盘。
- **游戏转盘**：MRD、PRD、业务流程图、UI/UX 设计稿、交互文档及内嵌前端演示。账号、抽奖、库存及订单为静态模拟。

## 文件说明

- `index.html`：首页。
- `case.html`、`case.js`：案例详情与交互。
- `work-catalog.js`：案例内容、图片及视频资源配置。
- `document-content.js`：项目文档正文。
- `case-business-flow.js`、`case-business-flow.css`：业务流程图。
- `projects/`：案例演示、设计稿、图片和视频。

静态文件直接位于仓库根目录，可交由静态网站服务托管。上传仓库本身不等于已开启 GitHub Pages。
