
(() => {
  const colors=["#efacde","#91dbe6","#d8d4fa","#cfeaf0"];
  const layer=document.querySelector(".particle-layer");
  const reduced=window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if(layer && !reduced){
    const create=()=>{
      const p=document.createElement("i"); p.className="particle";
      const size=3+Math.random()*6, drift=-55+Math.random()*110, duration=9+Math.random()*9;
      p.style.cssText=`left:${Math.random()*100}%;width:${size}px;height:${size}px;background:${colors[Math.floor(Math.random()*colors.length)]};animation-duration:${duration}s;animation-delay:${Math.random()*5}s;--drift:${drift}px`;
      p.addEventListener("animationend",()=>{p.remove();create()});
      layer.appendChild(p);
    };
    for(let i=0;i<14;i++) create();
  }

  const btn=document.querySelector(".menu-btn"), menu=document.querySelector(".full-menu");
  if(btn && menu){
    const close=()=>{menu.classList.remove("show");btn.classList.remove("menu-open");btn.setAttribute("aria-expanded","false")};
    btn.addEventListener("click",()=>{const on=!menu.classList.contains("show");menu.classList.toggle("show",on);btn.classList.toggle("menu-open",on);btn.setAttribute("aria-expanded",String(on))});
    menu.querySelectorAll("a").forEach(a=>a.addEventListener("click",close));
    document.addEventListener("keydown",e=>{if(e.key==="Escape") close()});
  }

  const els=document.querySelectorAll(".reveal");
  if("IntersectionObserver" in window && !reduced){
    const io=new IntersectionObserver(entries=>entries.forEach(x=>{if(x.isIntersecting){x.target.classList.add("show");io.unobserve(x.target)}}),{threshold:.12});
    els.forEach(el=>io.observe(el));
  }else els.forEach(el=>el.classList.add("show"));
})();
