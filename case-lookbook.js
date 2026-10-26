(() => {
  let observer;
  const esc = value => String(value ?? '').replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
  window.renderLookbook = (resource, language) => {
    const en=language==='en';
    let number=0;
    return `<div class="lookbook"><div class="lookbook-note">NEVERIN / STYLING DIRECTION</div><div class="lookbook-grid">${resource.groups.map((group,index)=>`<div class="lookbook-category"><span>0${index+1}</span>${esc(group.title[language])}</div>`).join('')}${resource.groups.flatMap(group=>group.images).map(img=>{number++;return `<figure class="lookbook-item"><button type="button" class="lookbook-image" data-design-src="${esc(img.url)}" data-design-title="${esc(img.title[language])}" aria-label="${en?'Enlarge':'放大查看'} ${esc(img.title[language])}"><img src="${esc(img.url)}" alt="${esc(img.title[language])}" loading="lazy"><span class="lookbook-open" aria-hidden="true">↗</span></button><figcaption><span>${String(number).padStart(2,'0')}</span><span>${esc(img.title[language])}</span></figcaption></figure>`}).join('')}</div></div>`;
  };
  window.initLookbooks = () => {
    observer?.disconnect();
    const root=document.querySelector('.lookbook');if(!root)return;
    if(!matchMedia('(prefers-reduced-motion: reduce)').matches&&'IntersectionObserver'in window){
      root.classList.add('has-motion');
      observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');observer.unobserve(entry.target)}}),{threshold:.08});
      root.querySelectorAll('.lookbook-item').forEach(item=>observer.observe(item));
    }
  };
})();
