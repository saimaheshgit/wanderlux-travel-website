
document.addEventListener('DOMContentLoaded',()=>{
  const toggle=document.querySelector('.menu-toggle');
  const nav=document.querySelector('.nav-links');
  if(toggle&&nav){toggle.addEventListener('click',()=>{const open=nav.classList.toggle('open');toggle.setAttribute('aria-expanded',String(open));});}
  const revealItems=document.querySelectorAll('.reveal');
  if('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches){
    const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target);}}),{threshold:.12});
    revealItems.forEach(item=>observer.observe(item));
  }else{revealItems.forEach(item=>item.classList.add('visible'));}
  const hero=document.querySelector('.hero');
  if(hero){
    const slides=[
      "url('https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1800&q=85')",
      "url('https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1800&q=85')",
      "url('https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=1800&q=85')"
    ];
    const dots=[...document.querySelectorAll('.carousel-dots button')];let active=0;
    function showSlide(i){active=i;hero.style.backgroundImage=`linear-gradient(90deg,rgba(9,35,55,.78),rgba(9,35,55,.18)),${slides[i]}`;dots.forEach((d,n)=>d.classList.toggle('active',n===i));}
    dots.forEach((dot,i)=>dot.addEventListener('click',()=>showSlide(i)));
    let timer=setInterval(()=>showSlide((active+1)%slides.length),6000);
    hero.addEventListener('mouseenter',()=>clearInterval(timer));
  }
  const tripForm=document.querySelector('#trip-form');
  if(tripForm){tripForm.addEventListener('submit',e=>{
    e.preventDefault();
    const destination=document.querySelector('#destination').value;
    const travellers=Number(document.querySelector('#travellers').value);
    const days=Number(document.querySelector('#days').value);
    const multiplier=Number(document.querySelector('#style').value);
    if(!Number.isInteger(travellers)||travellers<1||travellers>20||!Number.isInteger(days)||days<1||days>60){alert('Please enter 1–20 travellers and 1–60 days.');return;}
    const daily={Bali:180,Italy:290,Japan:250}[destination];
    const setup={Bali:350,Italy:650,Japan:550}[destination];
    const total=Math.round((daily*travellers*days+setup*travellers)*multiplier);
    const styleName=multiplier===.8?'Budget':multiplier===1?'Standard':'Luxury';
    document.querySelector('#estimate').innerHTML=`<span class="muted">Estimated total (AUD)</span><br><strong>${total.toLocaleString('en-AU',{style:'currency',currency:'AUD',maximumFractionDigits:0})}</strong><p>Estimate for ${travellers} traveller(s) to ${destination} for ${days} day(s) · ${styleName} travel style.</p>`;
  });}
});
