window.renderSavanaProductFlow=function(language){
 const en=language==='en',esc=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])),t=(zh,english)=>en?english:zh;
 const suite=window.savanaFlowSuite||[];
 function diagram(flow){
  const nodes=flow.nodes.map(n=>({...n,x:[25,370,715][n.col],y:20+n.row*150,w:n.col===0?280:300,h:80}));
  const byId=Object.fromEntries(nodes.map(n=>[n.id,n]));const height=Math.max(...nodes.map(n=>n.y+n.h))+35;
  const edges=flow.edges.map(edge=>{const a=byId[edge.from],b=byId[edge.to];let path,lx,ly;
   if(a.row===b.row){const ax=a.x+a.w/2,bx=b.x+b.w/2,y=a.y-30;path=`M${ax} ${a.y}V${y}H${bx}V${b.y}`;lx=(ax+bx)/2;ly=y-10}
   else if(a.col===b.col&&b.row-a.row>1){const x=a.x-15;path=`M${a.x} ${a.y+a.h/2}H${x}V${b.y+b.h/2}H${b.x}`;lx=x+18;ly=b.y-16}
   else if(a.col===b.col){const x=a.x+a.w/2;path=`M${x} ${a.y+a.h}V${b.y}`;lx=x+12;ly=(a.y+a.h+b.y)/2-8}
   else{const side=b.col<a.col?a.x:a.x+a.w,tx=b.x+b.w/2,sy=a.y+a.h/2;path=`M${side} ${sy}H${tx}V${b.y}`;lx=(side+tx)/2;ly=sy-12}
   return `<path class="spf-edge${edge.dashed?' spf-dashed':''}" d="${path}" marker-end="url(#spf-${flow.id})"/>${edge.label[language]?`<text class="spf-edge-label" x="${lx}" y="${ly}" text-anchor="middle">${esc(edge.label[language])}</text>`:''}`;
  }).join('');
  const boxes=nodes.map(n=>`<g class="spf-node${n.decision?' spf-decision':''}"><rect x="${n.x}" y="${n.y}" width="${n.w}" height="${n.h}"/><text x="${n.x+n.w/2}" y="${n.y+(n.sub[language]?31:46)}" style="font-size:${en&&n.title[language].length>32?14:17}px" text-anchor="middle">${esc(n.title[language])}</text>${n.sub[language]?`<text class="spf-sub" x="${n.x+n.w/2}" y="${n.y+57}" text-anchor="middle">${esc(n.sub[language])}</text>`:''}</g>`).join('');
  return `<details class="savana-flow-item" id="savana-flow-${flow.id}"${flow.id==='overview'?' open':''}><summary><span>${esc(flow.title[language])}</span><small>${t('展开 / 收起','Expand / collapse')}</small></summary><div class="spf-scroll" tabindex="0" role="region" aria-label="${esc(flow.title[language])}"><svg viewBox="0 0 1040 ${height}" role="img" aria-label="${esc(flow.title[language])}"><defs><marker id="spf-${flow.id}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0L10 5L0 10z" fill="currentColor"/></marker></defs>${edges}${boxes}</svg></div></details>`;
 }
 const coverage=[["Home / 活动曝光", "Home / exposure", "Banner、Popup 与营销模块", "Banners, popups and marketing modules"], ["PLP / 发现", "PLP / discovery", "活动 Feed、商品与推荐场景", "Campaign feeds and product discovery"], ["PDP / 商品决策", "PDP / decisions", "价格层级、资格、时间与库存", "Prices, qualification, time and stock"], ["规格与数量", "Size / variant", "SKU 可售与活动价格", "SKU availability and offer price"], ["Cart", "Cart", "活动状态与价格复核", "Offer status and price review"], ["Checkout", "Checkout", "最终费用与优惠关系", "Final amount and offer relationships"], ["Payment", "Payment", "支付状态与超时恢复", "Payment outcome and timeout recovery"], ["Order Success / 结果", "Order Success / result", "订单确认与活动结果", "Order confirmation and promotion result"]];
 return `<p>${t('总览图说明功能之间的关系，四张功能流程图分别展开主路径与异常分支。功能机制依据更新后的项目描述，流程以回溯文档呈现；待确认参数和补充处理规则不能当作已上线事实。','The overview shows feature relationships; four dedicated flows cover main paths and exceptions. Mechanisms follow the updated project account; the retrospective flows distinguish unresolved parameters and proposed handling from confirmed scope.')}</p><p class="spf-hint">${t('窄屏可横向滑动查看完整图。Flash Sale 与 1 元购不是强制串行流程；页面覆盖图用于核对场景，不代表每位用户必须依次经过所有页面。','Scroll horizontally on narrow screens. Flash Sale and the campaign are not sequential requirements. The coverage map is a review checklist, not a mandatory journey.')}</p><nav class="savana-flow-index" aria-label="${t('流程图目录','Flow index')}">${suite.map(f=>`<a href="#savana-flow-${f.id}">${esc(f.title[language])}</a>`).join('')}<a href="#savana-flow-coverage">${t('Mega Promotion｜页面覆盖图','Mega Promotion | Coverage map')}</a></nav>${suite.map(diagram).join('')}<details class="savana-flow-item" id="savana-flow-coverage"><summary><span>${t('Mega Promotion｜页面覆盖图','Mega Promotion | Page coverage map')}</span><small>${t('展开 / 收起','Expand / collapse')}</small></summary><p>${t('主链路覆盖依据更新资料；以下将曝光、发现、商品决策、购物车、结算、支付与结果展开，具体页面样式与参数待设计资料补证。','The updated account confirms the main chain. This map expands exposure, discovery, decisions, cart, checkout, payment and results; layouts and parameters still need design evidence.')}</p><div class="savana-coverage-grid">${coverage.map((c,i)=>`<div><small>${String(i+1).padStart(2,'0')}</small><h4>${esc(c[en?1:0])}</h4><p>${esc(c[en?3:2])}</p></div>`).join('')}</div></details>`;
};

window.initSavanaProductFlow=function(){
 const id=decodeURIComponent(location.hash.slice(1));
 if(!id.startsWith('savana-flow-'))return;
 const target=document.getElementById(id);
 if(target?.tagName==='DETAILS')target.open=true;
};
document.addEventListener('click',event=>{
 const link=event.target.closest('.savana-flow-index a');
 if(!link)return;
 const target=document.getElementById(link.getAttribute('href').slice(1));
 if(target?.tagName==='DETAILS')target.open=true;
});
window.addEventListener('hashchange',()=>window.initSavanaProductFlow());
