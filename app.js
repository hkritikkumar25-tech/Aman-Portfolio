// Smooth, robust JS with theme toggle (Sun = light, Moon = dark)

// 1) Mobile nav
const burger = document.getElementById('burger');
const navMenu = document.getElementById('navMenu');
burger?.addEventListener('click', () => navMenu.classList.toggle('show'));

// 2) Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// 3) Tabs
const tabs = document.querySelectorAll('.tab');
const workGrids = document.querySelectorAll('.grid--work');
tabs.forEach(t => {
t.addEventListener('click', () => {
tabs.forEach(bt => bt.classList.remove('tab--active'));
workGrids.forEach(g => g.classList.remove('is-active'));
t.classList.add('tab--active');
document.getElementById(t.dataset.tab).classList.add('is-active');
});
});

// 4) Lightbox video
const lightbox = document.getElementById('lightbox');
const lbVideo = document.getElementById('lightboxVideo');
const lbClose = document.getElementById('lightboxClose');

function openVideo(src){
if(!src) return;

// Check if it's a YouTube URL
if(src.includes('youtu.be/') || src.includes('youtube.com/')){
  // Extract video ID from YouTube URL
  let videoId = '';
  if(src.includes('youtu.be/')){
    videoId = src.split('youtu.be/')[1].split('?')[0];
  } else if(src.includes('youtube.com/watch')){
    const urlParams = new URLSearchParams(src.split('?')[1]);
    videoId = urlParams.get('v');
  }
  
  if(videoId){
    // Create iframe for YouTube embed
    const iframe = document.createElement('iframe');
    iframe.width = '100%';
    iframe.height = '100%';
    iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
    iframe.title = 'YouTube video player';
    iframe.frameBorder = '0';
    iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
    iframe.allowFullscreen = true;
    
    // Replace video element with iframe temporarily
    lbVideo.style.display = 'none';
    lightbox.insertBefore(iframe, lbClose.nextSibling);
    lightbox.classList.add('show');
    lightbox.setAttribute('aria-hidden','false');
  }
} 
// Check if it's an Instagram URL
else if(src.includes('instagram.com/reel/')){
  // Extract reel ID from Instagram URL
  const reelId = src.split('reel/')[1].split('/')[0].split('?')[0];
  
  if(reelId){
    // Create iframe for Instagram embed
    const iframe = document.createElement('iframe');
    iframe.width = '100%';
    iframe.height = '100%';
    iframe.src = `https://www.instagram.com/p/${reelId}/embed/`;
    iframe.title = 'Instagram reel player';
    iframe.frameBorder = '0';
    iframe.scrolling = 'no';
    iframe.allowTransparency = true;
    iframe.allowFullscreen = true;
    
    // Replace video element with iframe temporarily
    lbVideo.style.display = 'none';
    lightbox.insertBefore(iframe, lbClose.nextSibling);
    lightbox.classList.add('show');
    lightbox.setAttribute('aria-hidden','false');
  }
} else {
  // Regular video file
  lbVideo.style.display = 'block';
  lbVideo.src = src;
  lightbox.classList.add('show');
  lightbox.setAttribute('aria-hidden','false');
  lbVideo.play().catch(()=>{});
}
}
function closeVideo(){
// Remove YouTube or Instagram iframe if it exists
const iframe = lightbox.querySelector('iframe');
if(iframe) {
  iframe.remove();
}

// Reset video element
lbVideo.pause();
lbVideo.currentTime = 0;
lbVideo.removeAttribute('src');
lbVideo.style.display = 'block';

// Hide lightbox
lightbox.classList.remove('show');
lightbox.setAttribute('aria-hidden','true');
}
document.querySelectorAll('.work').forEach(card=>{
card.addEventListener('click', ()=> openVideo(card.getAttribute('data-video')));
});
lbClose.addEventListener('click', closeVideo);
lightbox.addEventListener('click', e => { if(e.target === lightbox) closeVideo(); });
document.addEventListener('keydown', e => { if(e.key === 'Escape') closeVideo(); });

// 5) Play reel buttons
const showreelSrc = 'assets/showreel.mp4'; // replace with your URL if needed
document.getElementById('playReel')?.addEventListener('click', ()=> openVideo(showreelSrc));
document.getElementById('floatPlay')?.addEventListener('click', ()=> openVideo(showreelSrc));

// 6) Animated counters on view
const counters = document.querySelectorAll('.stat__num');
let countersStarted = false;
function inView(el){ const r = el.getBoundingClientRect(); return r.top < innerHeight - 80; }
function startCounters(){
if(countersStarted) return;
if(counters.length && inView(counters)){
countersStarted = true;
counters.forEach(el=>{
const max = +el.dataset.count || 0;
let n = 0;
const step = Math.max(1, Math.round(max/60));
const timer = setInterval(()=>{
n += step;
if(n >= max){ n = max; clearInterval(timer); }
el.textContent = n;
}, 20);
});
}
}
addEventListener('scroll', startCounters);
addEventListener('load', startCounters);

// 7) Testimonials dots
const quotes = document.querySelectorAll('.quote');
const dotsWrap = document.getElementById('quoteDots');
quotes.forEach((_, i) => {
const b = document.createElement('button');
if(i===0) b.classList.add('is-active');
b.addEventListener('click', () => {
quotes.forEach(q => q.classList.remove('is-active'));
dotsWrap.querySelectorAll('button').forEach(d => d.classList.remove('is-active'));
quotes[i].classList.add('is-active');
b.classList.add('is-active');
});
dotsWrap.appendChild(b);
});

// 8) Contact form validation (front-end only)
const form = document.getElementById('contactForm');
const statusEl = document.getElementById('formStatus');
form?.addEventListener('submit', e => {
e.preventDefault();
statusEl.textContent = '';
const name = form.name.value.trim();
const email = form.email.value.trim();
const message = form.message.value.trim();

let ok = true;
if(!name){ ok=false; showErr('name'); }
if(!/^\S+@\S+.\S+$/.test(email)){ ok=false; showErr('email'); }
if(!message){ ok=false; showErr('message'); }
if(!ok) return;

statusEl.textContent = 'Thanks! Your message has been queued.';
form.reset();
});
function showErr(id){
const field = document.getElementById(id).closest('.field');
const err = field.querySelector('.err');
err.style.display = 'block';
setTimeout(()=> err.style.display = 'none', 2500);
}

// 9) Theme toggle (Sun -> Light/White, Moon -> Dark/Black) with persistence
const root = document.documentElement;
const THEME_KEY = 'site_theme';
const toggle = document.getElementById('themeToggle');


function applyTheme(mode){
root.setAttribute('data-theme', mode);
try{ localStorage.setItem(THEME_KEY, mode); }catch(e){}
}

(function initTheme(){
const saved = (()=>{ try{ return localStorage.getItem(THEME_KEY); }catch(e){ return null; } })();
if(saved){ applyTheme(saved); return; }
const prefersLight = matchMedia('(prefers-color-scheme: light)').matches;
applyTheme(prefersLight ? 'light' : 'dark');
})();

toggle?.addEventListener('click', ()=>{
const isLight = root.getAttribute('data-theme') === 'light';
applyTheme(isLight ? 'dark' : 'light');
});