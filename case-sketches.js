(() => {
  const escape = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  let observer;
  window.renderSketchbook = (resource, language) => {
    const en = language === 'en';
    const initialGroup = resource.groups.find(group => group.images.length)?.id || resource.groups[0]?.id;
    return `<div class="sketchbook"><div class="sketchbook-top"><span class="sketchbook-note">NEVERIN / CONCEPT ARCHIVE</span><div class="sketch-tabs" role="tablist" aria-label="${en ? 'Style studies' : '按款式查看手稿'}">${resource.groups.map((group,i) => `<button id="sketch-tab-${group.id}" type="button" role="tab" data-sketch-tab="${group.id}" aria-controls="sketch-panel-${group.id}" aria-selected="${group.id===initialGroup}" tabindex="${group.id===initialGroup?0:-1}">${escape(group.title[language])}<span>${group.images.length ? String(group.images.length).padStart(2,'0') : (en?'SOON':'待补充')}</span></button>`).join('')}</div></div>${resource.groups.map((group,i) => `<div id="sketch-panel-${group.id}" class="sketch-panel" role="tabpanel" aria-labelledby="sketch-tab-${group.id}" ${group.id!==initialGroup?'hidden':''}>${group.images.length ? `<div class="sketch-editorial">${group.images.map((img,n) => `<figure class="sketch-item"><button class="sketch-image" type="button" data-design-src="${escape(img.url)}" data-design-title="${escape(img.title[language])}" aria-label="${en?'Enlarge':'放大查看'} ${escape(img.title[language])}"><img src="${escape(img.url)}" alt="${escape(img.title[language])}" loading="lazy" width="1000" height="1286"><span class="sketch-enlarge" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M8 4H4v4m12-4h4v4M4 16v4h4m12-4v4h-4"/></svg></span></button><figcaption><span>${String(n+1).padStart(2,'0')} / ${escape(group.title[language])}</span><span>${en?'VISUAL STUDY':'视觉方案'}</span></figcaption></figure>`).join('')}</div>` : `<div class="sketch-empty"><span>SHORT / CONCEPT ARCHIVE</span><h3>${en?'Short-style studies':'短款视觉方案'}</h3><p>${en?'The short-style collection will be added here. Explore the long-style studies in the meantime.':'短款手稿将在此补充，可先切换至长款查看本批方案。'}</p></div>`}</div>`).join('')}</div>`;
  };
  window.initSketchbooks = () => {
    observer?.disconnect();
    const root = document.querySelector('.sketchbook');
    if (!root) return;
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!reduced && 'IntersectionObserver' in window) {
      root.classList.add('has-motion');
      observer = new IntersectionObserver(entries => entries.forEach(entry => {
        if (entry.isIntersecting) {entry.target.classList.add('is-visible');observer.unobserve(entry.target);}
      }), {threshold:0.08});
      root.querySelectorAll('.sketch-item').forEach(item => observer.observe(item));
    }
    const activate = button => {
      const id = button.dataset.sketchTab;
      root.querySelectorAll('[data-sketch-tab]').forEach(tab => {tab.setAttribute('aria-selected', String(tab===button));tab.tabIndex=tab===button?0:-1;});
      root.querySelectorAll('.sketch-panel').forEach(panel => {panel.hidden=panel.id!==`sketch-panel-${id}`;});
    };
    root.querySelectorAll('[data-sketch-tab]').forEach(button => {
      button.addEventListener('click', () => activate(button));
      button.addEventListener('keydown', event => {
        if (!['ArrowLeft','ArrowRight','Home','End'].includes(event.key)) return;
        event.preventDefault();
        const tabs=[...root.querySelectorAll('[data-sketch-tab]')],index=tabs.indexOf(button);
        const next=event.key==='Home'?0:event.key==='End'?tabs.length-1:(index+(event.key==='ArrowRight'?1:-1)+tabs.length)%tabs.length;
        activate(tabs[next]);tabs[next].focus();
      });
    });
  };
})();
