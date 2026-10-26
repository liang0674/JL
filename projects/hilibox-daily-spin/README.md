# HiliBox Daily Spin — Static Frontend Demo

纯HTML/CSS/JavaScript演示，无后端、数据库、npm依赖或构建步骤。此版本是独立演示副本，不影响原App仓库。

## 本地运行

解压后直接用浏览器打开 index.html。也可通过VS Code Live Server或任意静态托管访问；不需要Python。若浏览器限制file://的本地存储，页面自动使用内存模拟，刷新可能重置演示数据。

## GitHub Pages

将本目录内容（包括index.html、app目录和.nojekyll）上传到独立GitHub仓库根目录，然后使用GitHub Pages发布仓库根目录。无需安装依赖或服务器接口。所有页面、样式、字体和商品素材采用相对路径，支持仓库子路径部署。

首页：index.html。打开后可切换语言及演示场景。GitHub仓库地址本身不是网页演示地址；发布后使用Pages提供的网站地址。

## 演示内容

3个原创美妆产品示意案例：玫瑰唇膏、焕亮精华液、水润保湿面霜。图片为本地SVG包装示意，价格、SKU和库存均为演示值，不代表真实可领取商品。

英文/阿语RTL/中文；每日2次模拟抽奖；主动中奖弹窗；优惠券领取与记录；3件美妆轮播；实物中奖、售罄、失败重试及分享页场景。“新一轮演示”重置本演示站点的hilibox-spin-模拟数据。

## 演示边界

默认模拟已登录、满足实物资格，不连接真实注册登录/发券/下单/库存/埋点服务。演示数据仅在当前浏览器内处理，无法跨设备真实共享，不用于生产发奖或统计。分享链接可打开静态演示，但邀请奖励仅本机模拟。

商店下载链接是用户点击后打开的外部链接，不是运行依赖。真实结算与商品列表不在本包内。请勿使用原App生产部署流程覆盖此演示站点，也不要把本包当正式业务接口。

## 结构

index.html：演示控制与入口。
app/mobile.html、hilibox-theme.css：活动页面和样式。
app/spin-config.js：本地奖项、3件美妆及演示价格配置。
app/spin-mock-api.js、spin-referral.js、spin-runtime.js：浏览器内模拟。
app/standalone-bootstrap.js：纯静态模拟初始化与存储兼容。
app/images、fonts：本地素材；无需CDN。

来源基线f7d1e42，独立演示更新2026-10-23。

## PC适配（2026-10-24）

桌面宽度900px及以上显示双栏：左侧转盘、右侧抽奖操作/商品/记录；小屏保持单列。演示顶部支持自动、PC、手机375×812切换。app/mobile.html可独立访问，通过layout=desktop或layout=mobile指定模式；缺省自适应。静态部署方式不变。
