(function(){
window.renderBusinessFlow=function(language){
const en=language==='en',t=(zh,english)=>en?english:zh;
const esc=s=>s.replace(/&/g,'&amp;').replace(/</g,'&lt;');
function node(x,y,w,h,title,sub,decision=false){return `<g class="flow-node ${decision?'flow-decision':''}"><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="0"/><text x="${x+w/2}" y="${y+(sub?30:38)}" text-anchor="middle">${esc(title)}</text>${sub?`<text class="flow-sub" x="${x+w/2}" y="${y+53}" text-anchor="middle">${esc(sub)}</text>`:''}</g>`}
function edge(d,label,x,y){return `<path class="flow-edge" d="${d}" marker-end="url(#flow-arrow)"/>${label?`<text class="flow-edge-label" x="${x}" y="${y}">${label}</text>`:''}`}
const defs='<defs><marker id="flow-arrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0 0L8 4L0 8" fill="currentColor"/></marker></defs>';
const main=`<svg viewBox="0 0 1160 630" role="img" aria-label="${t('抽奖业务主流程','Draw business flow')}">${defs}
${node(20,30,230,80,t('进入活动页','Enter campaign'),t('浏览奖品与活动规则','Browse prizes and rules'))}
${node(315,30,230,80,t('读取活动配置','Load configuration'),t('活动是否开放？','Is the campaign open?'),true)}
${node(610,30,230,80,t('登录 / 注册','Sign in / register'),t('正式环境校验身份','Authenticate in production'))}
${node(905,30,230,80,t('读取账号状态','Load account state'),t('次数、奖励与历史记录','Chances, rewards and history'))}
${edge('M250 70H315')}${edge('M545 70H610',t('开放','Open'),565,55)}${edge('M840 70H905')}
${node(315,200,230,80,t('停止新增参与','Stop new participation'),t('保留历史合法权益','Preserve existing rewards'))}${edge('M430 110V200',t('关闭','Closed'),445,160)}
${node(905,200,230,80,t('还有抽奖机会？','Any chances left?'),t('每日基础 2 次（案例规则）','2 daily chances (case rule)'),true)}${edge('M1020 110V200')}
${node(610,200,230,80,t('生成唯一抽奖请求','Create a unique draw request'),t('锁定按钮，防止重复提交','Lock control; prevent duplicate draws'))}${edge('M905 240H840',t('有','Yes'),863,224)}
${node(610,370,230,80,t('确定结果并保存','Resolve and save result'),t('原子扣次 / 实物预占库存','Consume chance / reserve inventory'))}${edge('M725 280V370')}
${node(315,370,230,80,t('动效结束展示结果','Animate, then show result'),t('更新次数与奖励记录','Update chances and reward history'))}${edge('M610 410H545')}
${node(20,370,230,80,t('领取奖励','Claim reward'),t('优惠券 / 指定实物商品','Coupon / awarded physical product'))}${edge('M315 410H250')}
${node(905,370,230,80,t('分享获取额外机会','Share for an extra chance'),t('有效好友打开后确认赠次','Grant after a valid friend visit'))}${edge('M1020 280V370',t('无','No'),1035,330)}
${node(20,530,230,80,t('继续参与 / 进入购物','Play again / shop'),t('关闭弹窗仍保留奖励记录','Closing preserves reward history'))}${edge('M135 450V530')}
<text class="flow-note" x="315" y="550">${t('超时未知：查询原 requestId；确认结果后恢复操作。','Unknown timeout: query the original requestId before resuming.')}</text>
<text class="flow-note" x="315" y="580">${t('明确失败：说明原因，保留权益，允许安全重试。','Confirmed failure: explain the cause, retain rewards and allow safe retry.')}</text>
</svg>`;
const claims=`<svg viewBox="0 0 1160 330" role="img" aria-label="${t('领奖与转化分支','Claim and conversion branches')}">
${node(20,30,220,80,t('优惠券奖励','Coupon reward'),t('确认面额、门槛与期限','Check value, conditions and expiry'))}${node(325,30,220,80,t('领取成功','Claim confirmed'),t('保存券及绝对到期时间','Save coupon and expiry time'))}${node(630,30,220,80,t('进入适用商品列表','Browse eligible products'),t('按券规则参与购物','Shop under coupon conditions'))}${node(935,30,205,80,t('核销关联订单','Redeem with an order'),t('记录实际订单结果','Record actual order outcome'))}
${edge('M240 70H325')}${edge('M545 70H630')}${edge('M850 70H935')}
${node(20,205,220,80,t('实物奖励','Physical reward'),t('展示中奖 SKU 与商品快照','Show awarded SKU and snapshot'))}${node(325,205,220,80,t('领取指定商品权益','Claim product entitlement'),t('校验账号、库存与有效期','Validate account, stock and expiry'))}${node(630,205,220,80,t('地址及免费结算','Address and free checkout'),t('指定商品 0 元、运费 0 元','Awarded item and shipping: zero'))}${node(935,205,205,80,t('提交并创建订单','Submit and create order'),t('履约由宿主电商承接','Fulfil via the host commerce system'))}
${edge('M240 245H325')}${edge('M545 245H630')}${edge('M850 245H935')}
</svg>`;
const share=`<svg viewBox="0 0 1160 170" role="img" aria-label="${t('分享赠次流程','Referral chance flow')}">
${node(20,30,220,80,t('签发邀请链接','Create invitation link'),t('复制 / 选择外部渠道','Copy / choose a sharing channel'))}${node(325,30,220,80,t('好友打开活动页','Friend opens campaign'),t('先浏览，再登录参与','Browse before signing in'))}${node(630,30,220,80,t('服务端验证有效访问','Validate the referral visit'),t('排除自邀及重复设备','Exclude self-referrals and duplicates'))}${node(935,30,205,80,t('邀请者增加 1 次','Grant inviter 1 chance'),t('刷新赠次账本与额度','Refresh chance balance and ledger'))}
${edge('M240 70H325')}${edge('M545 70H630')}${edge('M850 70H935')}
<text class="flow-note" x="20" y="150">${t('复制链接或外部跳转不直接赠次；活动关闭后停止分享赠次。','Copying or opening a share channel does not grant a chance; closed campaigns stop referral grants.')}</text></svg>`;
return `<div class="business-flow"><p class="flow-intro">${t('把活动触达、参与资格、奖励领取与购物转化串成完整链路。以下依据本案例 PRD 梳理：前端已展示交互状态，真实鉴权、发奖、库存、结算及去重由正式服务实现。','Connect campaign discovery, eligibility, reward claims and shopping. Based on the case PRD: the frontend demonstrates interaction states; authentication, reward issuance, inventory, checkout and deduplication require production services.')}</p>${[[t('01 / 抽奖主流程','01 / Draw flow'),main],[t('02 / 领奖与购物转化','02 / Claims and shopping'),claims],[t('03 / 分享赠次闭环','03 / Referral loop'),share]].map(([title,svg])=>`<div class="flow-block"><h3>${title}</h3><div class="flow-scroll" tabindex="0" aria-label="${t('业务流程图，可左右滚动','Business diagram; scroll horizontally')}">${svg}</div></div>`).join('')}<div class="flow-principles"><p><strong>${t('奖励可恢复','Recoverable rewards')}</strong>${t('关闭弹窗不丢失；待领取、待下单、已下单与已失效分别记录。','Closing retains rewards; track unclaimed, claimed, ordered and expired states separately.')}</p><p><strong>${t('实物不超发','Inventory protection')}</strong>${t('抽奖结果预占实际商品；展示轮播不决定中奖商品。','Reserve the awarded product; the carousel does not determine the prize.')}</p><p><strong>${t('结果可衡量','Measurable outcomes')}</strong>${t('分开统计抽奖、领取、核销与订单；零元礼品单不计付费复购。','Measure draws, claims, redemption and orders separately; free gift orders are not paid repeat purchases.')}</p></div></div>`;
};
})();
