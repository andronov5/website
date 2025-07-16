
/* ----------  NAVBAR behaviour  ---------- */
const navbar     = document.querySelector('.navbar');
let lastScroll   = window.scrollY;

window.addEventListener('scroll', () => {
  // Solid background after 80 px
  if (window.scrollY > 80) navbar.classList.add('navbar--solid');
  else                     navbar.classList.remove('navbar--solid');

  // Hide on scroll‑down, show on scroll‑up
  if (window.scrollY > lastScroll && window.scrollY > 200)
       navbar.classList.add('navbar--hidden');
  else navbar.classList.remove('navbar--hidden');

  lastScroll = window.scrollY;
});

/* ----------  Fade‑in observer  ---------- */
const faders   = document.querySelectorAll('.fade');
const revealIO = new IntersectionObserver((entries,obs)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add('show');
      obs.unobserve(entry.target);
    }
  });
},{threshold:.15});
faders.forEach(el=>revealIO.observe(el));

/* ----------  Stat counter animation  ---------- */
const counters = document.querySelectorAll('.stat__num');
const counterIO = new IntersectionObserver((entries,obs)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      animateCount(entry.target);
      obs.unobserve(entry.target);
    }
  });
},{threshold:.6});
counters.forEach(c=>counterIO.observe(c));

function animateCount(el){
  const target = +el.dataset.count;
  let current = 0;
  const step = target / 60; // 60 frames
  const tick = () => {
    current += step;
    if(current < target){
      el.textContent = current.toFixed(1);
      requestAnimationFrame(tick);
    } else el.textContent = target;
  };
  requestAnimationFrame(tick);
}

/* ----------  Testimonial slider  ---------- */
const slides = document.querySelectorAll('.slide');
const prev   = document.querySelector('.prev');
const next   = document.querySelector('.next');
let idx = 0;

function update(dir=1){
  slides[idx].classList.remove('active');
  idx = (idx + dir + slides.length) % slides.length;
  slides[idx].classList.add('active');
}
prev.addEventListener('click',()=>update(-1));
next.addEventListener('click',()=>update(1));

let auto = setInterval(update, 8000);
document.querySelector('.testimonials').addEventListener('mouseenter',()=>clearInterval(auto));
document.querySelector('.testimonials').addEventListener('mouseleave',()=>auto=setInterval(update,8000));
