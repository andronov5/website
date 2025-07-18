/* ===== POP‑UP ===== */
const demoBtn  = document.getElementById('demoBtn');
const popup    = document.getElementById('demoPopup');
const closeBtn = document.getElementById('closePopup');

demoBtn.addEventListener('click', () => popup.style.display = 'flex');
closeBtn.addEventListener('click', () => popup.style.display = 'none');
window.addEventListener('click', e => { if (e.target === popup) popup.style.display = 'none'; });

/* ===== NAVBAR ===== */
const navbar   = document.querySelector('.navbar');
let lastScroll = window.scrollY;
let hideTimer  = null;

window.addEventListener('scroll', () => {
  // Solid background after 80 px
  navbar.classList.toggle('navbar--solid', window.scrollY > 80);

  // Debounced hide: wait 350 ms of downward scroll before hiding
  if (window.scrollY > lastScroll && window.scrollY > 200){
    clearTimeout(hideTimer);
    hideTimer = setTimeout(()=>navbar.classList.add('navbar--hidden'), 350);
  } else {
    clearTimeout(hideTimer);
    navbar.classList.remove('navbar--hidden');
  }
  lastScroll = window.scrollY;
});

/* ===== SECTION FADE‑IN ===== */
const faders = document.querySelectorAll('.fade');
const revealIO = new IntersectionObserver((entries,obs)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add('show');
      obs.unobserve(entry.target);
    }
  });
},{threshold:.15});
faders.forEach(el=>revealIO.observe(el));

/* ===== STAT COUNTERS ===== */
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
  const frames = 60;
  const step   = target / frames;
  const tick = () => {
    current += step;
    if(current < target){
      el.textContent = current.toFixed(1);
      requestAnimationFrame(tick);
    } else el.textContent = target;
  };
  requestAnimationFrame(tick);
}
