// preloader
(function(){
  const fill = document.getElementById('preFill');
  const text = document.getElementById('preText');
  const pre = document.getElementById('preloader');
  let p = 0;
  const iv = setInterval(()=>{
    p += Math.random()*18;
    if(p >= 100){ p = 100; clearInterval(iv); setTimeout(()=>pre.classList.add('done'), 250); }
    fill.style.width = p + '%';
    text.textContent = 'Loading experience... ' + Math.floor(p) + '%';
  }, 140);
  window.addEventListener('load', ()=>{ setTimeout(()=>pre.classList.add('done'), 900); });
})();

// custom cursor
(function(){
  const cursor = document.getElementById('cursor');
  const trail = document.getElementById('cursorTrail');
  if(window.matchMedia('(hover:none)').matches) return;
  window.addEventListener('mousemove', e=>{
    cursor.style.left = e.clientX+'px'; cursor.style.top = e.clientY+'px';
    trail.style.left = e.clientX+'px'; trail.style.top = e.clientY+'px';
  });
})();

// nav scroll state + scrollspy
(function(){
  const nav = document.getElementById('navbar');
  const links = document.querySelectorAll('.nlink');
  const sections = document.querySelectorAll('main section[id]');
  window.addEventListener('scroll', ()=>{
    nav.classList.toggle('scrolled', window.scrollY > 40);
    let current = sections[0]?.id;
    sections.forEach(sec=>{
      if(window.scrollY + 120 >= sec.offsetTop) current = sec.id;
    });
    links.forEach(l=>l.classList.toggle('active', l.dataset.sec === current));
  });
})();

// mobile menu
(function(){
  const burger = document.getElementById('burger');
  const drawer = document.getElementById('mobDrawer');
  const overlay = document.getElementById('mobOverlay');
  const close = document.getElementById('mobClose');
  function open(){ drawer.classList.add('open'); overlay.classList.add('open'); }
  function shut(){ drawer.classList.remove('open'); overlay.classList.remove('open'); }
  burger.addEventListener('click', open);
  overlay.addEventListener('click', shut);
  close.addEventListener('click', shut);
  document.querySelectorAll('.mob-link').forEach(a=>a.addEventListener('click', shut));
})();

// hero role rotator
(function(){
  const words = document.querySelectorAll('.hr-word');
  let i = 0;
  setInterval(()=>{
    words[i].classList.remove('active');
    i = (i+1) % words.length;
    words[i].classList.add('active');
  }, 2400);
})();

// stat counters
(function(){
  const nums = document.querySelectorAll('.sband-num[data-target]');
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if(e.isIntersecting){
        const el = e.target;
        const target = parseInt(el.dataset.target,10);
        let cur = 0;
        const step = Math.max(1, Math.round(target/30));
        const iv = setInterval(()=>{
          cur += step;
          if(cur >= target){ cur = target; clearInterval(iv); }
          el.textContent = cur;
        }, 40);
        io.unobserve(el);
      }
    });
  }, {threshold:0.5});
  nums.forEach(n=>io.observe(n));
})();

// scroll reveal
(function(){
  const els = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } });
  }, {threshold:0.12});
  els.forEach(el=>io.observe(el));
})();

// project filter
(function(){
  const btns = document.querySelectorAll('.pf-btn');
  const cards = document.querySelectorAll('.proj-card');
  btns.forEach(btn=>{
    btn.addEventListener('click', ()=>{
      btns.forEach(b=>b.classList.remove('active'));
      btn.classList.add('active');
      const f = btn.dataset.f;
      cards.forEach(c=>{
        const cats = c.dataset.cat.split(' ');
        c.classList.toggle('show', f === 'all' || cats.includes(f));
      });
    });
  });
})();

// back to top
(function(){
  const btt = document.getElementById('btt');
  window.addEventListener('scroll', ()=>{ btt.classList.toggle('show', window.scrollY > 500); });
  btt.addEventListener('click', ()=>window.scrollTo({top:0, behavior:'smooth'}));
})();

// contact form -> mailto
(function(){
  const form = document.getElementById('contactForm');
  form.addEventListener('submit', function(e){
    e.preventDefault();
    const name = document.getElementById('cname').value;
    const email = document.getElementById('cemail').value;
    const topic = document.getElementById('ctopic').value;
    const subject = document.getElementById('csubject').value;
    const msg = document.getElementById('cmsg').value;
    const body = `Name: ${name}\nEmail: ${email}\nTopic: ${topic}\n\n${msg}`;
    window.location.href = `mailto:engrmateeurrasool@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });
})();