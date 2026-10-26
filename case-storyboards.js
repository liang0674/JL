(() => {
  let observer;
  const esc = value => String(value ?? '').replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
  const arrow = '<svg viewBox="0 0 52 30" aria-hidden="true"><path class="storyboard-arrow-ghost" d="M3 15.5c8-.8 14 .5 22-.2 7-.7 13-.3 21-.6m-11-10c2.7 4.1 6.6 7.5 11.4 10-4.7 2-8.4 5.2-11.2 9"/><path class="storyboard-arrow-line" d="M2 13.5c7.5-.7 14.5.6 22.5-.2 7.6-.7 13.5-.5 21-.3m-11.5-9c2.9 4 6.7 7 11.8 9.2-4.7 2.2-8.5 5.3-11.3 9.4"/></svg>';
  window.renderStoryboard = (resource, language) => {
    const en = language === 'en';
    const initial = resource.groups.find(group => group.images.length)?.id || resource.groups[0]?.id;
    return `<div class="storyboard"><div class="storyboard-top"><span class="storyboard-note">NEVERIN / MOTION PLAN</span><div class="storyboard-tabs" role="tablist" aria-label="${en?'Video storyboard styles':'按款式查看视频脚本'}">${resource.groups.map(group => `<button id="storyboard-tab-${group.id}" type="button" role="tab" data-storyboard-tab="${group.id}" aria-controls="storyboard-panel-${group.id}" aria-selected="${group.id===initial}" tabindex="${group.id===initial?0:-1}">${esc(group.title[language])}<span>${String(group.images.length).padStart(2,'0')}</span></button>`).join('')}</div></div>${resource.groups.map(group => `<div id="storyboard-panel-${group.id}" class="storyboard-panel" role="tabpanel" aria-labelledby="storyboard-tab-${group.id}" ${group.id!==initial?'hidden':''}><div class="storyboard-track">${group.images.map((img,index) => `<figure class="storyboard-step"><button class="storyboard-frame" type="button" data-design-src="${esc(img.url)}" data-design-title="${esc(img.title[language])}" aria-label="${en?'Enlarge':'放大查看'} ${esc(img.title[language])}"><img src="${esc(img.url)}" alt="${esc(img.title[language])}" loading="lazy" width="1050" height="1350"><span class="storyboard-zoom" aria-hidden="true">↗</span></button><figcaption><span class="storyboard-number">${String(index+1).padStart(2,'0')}</span><span>${esc(group.title[language])} · ${en?'Shot':'镜头'} ${String(index+1).padStart(2,'0')}</span></figcaption></figure>${index<group.images.length-1?`<div class="storyboard-arrow" aria-hidden="true">${arrow}</div>`:''}`).join('')}</div></div>`).join('')}</div>`;
  };
  window.initStoryboards = () => {
    observer?.disconnect();
    const root=document.querySelector('.storyboard');if(!root)return;
    if(!matchMedia('(prefers-reduced-motion: reduce)').matches&&'IntersectionObserver'in window){
      root.classList.add('has-motion');
      observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');observer.unobserve(entry.target)}}),{threshold:.08});
      root.querySelectorAll('.storyboard-step').forEach(step=>observer.observe(step));
    }
    const activate=button=>{const id=button.dataset.storyboardTab;root.querySelectorAll('[data-storyboard-tab]').forEach(tab=>{tab.setAttribute('aria-selected',String(tab===button));tab.tabIndex=tab===button?0:-1});root.querySelectorAll('.storyboard-panel').forEach(panel=>panel.hidden=panel.id!==`storyboard-panel-${id}`)};
    root.querySelectorAll('[data-storyboard-tab]').forEach(button=>{
      button.addEventListener('click',()=>activate(button));
      button.addEventListener('keydown',event=>{if(!['ArrowLeft','ArrowRight','Home','End'].includes(event.key))return;event.preventDefault();const tabs=[...root.querySelectorAll('[data-storyboard-tab]')],i=tabs.indexOf(button),next=event.key==='Home'?0:event.key==='End'?tabs.length-1:(i+(event.key==='ArrowRight'?1:-1)+tabs.length)%tabs.length;activate(tabs[next]);tabs[next].focus()});
    });
  };
})();
