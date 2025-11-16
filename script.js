// script.js
// Typing effect
const roles = ["Embedded Systems", "C++ Developer", "AI Enthusiast", "Hardware-Software Integrator"];
let idx = 0, charIdx = 0, forward = true;
const typingEl = document.getElementById('typing');
function typeLoop(){
  const current = roles[idx];
  if(forward){
    charIdx++;
    if(charIdx > current.length){ forward=false; setTimeout(typeLoop,800); return; }
  } else {
    charIdx--;
    if(charIdx < 0){ forward=true; idx=(idx+1)%roles.length; setTimeout(typeLoop,400); return; }
  }
  if(typingEl) typingEl.textContent = current.slice(0,charIdx);
  setTimeout(typeLoop, 80);
}

// Scroll reveal & active nav + smooth scroll
document.addEventListener('DOMContentLoaded', ()=>{
  typeLoop();

  // Smooth scroll for internal links
  document.querySelectorAll('a[href^="#"]').forEach(anchor=>{
    anchor.addEventListener('click', function(e){
      const targetId = this.getAttribute('href').slice(1);
      const target = document.getElementById(targetId);
      if(target){
        e.preventDefault();
        window.scrollTo({
          top: target.getBoundingClientRect().top + window.pageYOffset - 70,
          behavior: 'smooth'
        });
        // close mobile menu if open
        document.body.classList.remove('nav-open');
      }
    });
  });

  // IntersectionObserver for reveal + active nav
  const observer = new IntersectionObserver((entries)=> {
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add('in-view');
      }
    });
  }, {threshold: 0.18});
  document.querySelectorAll('.card, .skill-card, .project-card, .hero').forEach(el=> observer.observe(el));

  // Active nav on scroll
  const sections = document.querySelectorAll('main section[id], header');
  const navLinks = document.querySelectorAll('.nav-links a');
  const sectionObserver = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        const id = entry.target.id;
        navLinks.forEach(a => {
          a.classList.toggle('active', a.getAttribute('href') === `#${id}`);
        });
      }
    });
  }, {threshold: 0.45});
  sections.forEach(s => { if(s.id) sectionObserver.observe(s); });

  // Contact form stub
  const form = document.getElementById('contactForm');
  if(form){
    form.addEventListener('submit', (e)=>{
      e.preventDefault();
      alert('This form is a demo. Configure Netlify Forms or Formspree for live email submissions.');
      form.reset();
    });
  }

  // Theme toggle basic (save to localStorage)
  const themeToggle = document.getElementById('themeToggle');
  themeToggle?.addEventListener('click', ()=>{
    document.body.classList.toggle('light-mode');
    localStorage.setItem('theme', document.body.classList.contains('light-mode') ? 'light' : 'dark');
  });
  if(localStorage.getItem('theme')==='light') document.body.classList.add('light-mode');

  // Mobile hamburger
  const burger = document.getElementById('burgerBtn');
  burger?.addEventListener('click', ()=> document.body.classList.toggle('nav-open'));
});
// mobile tap toggle for profile flip badge
(function(){
  const badge = document.querySelector('.profile-badge');
  if(!badge) return;

  // toggle on click/tap
  badge.addEventListener('click', (e)=>{
    // ignore if user clicked a link inside (none here)
    badge.classList.toggle('flipped');
  });

  // also allow keyboard toggle (Enter/Space)
  badge.addEventListener('keydown', (e)=>{
    if(e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      badge.classList.toggle('flipped');
    }
  });

  // optionally remove 'flipped' after 3s on mobile (uncomment if you want auto-revert)
  // badge.addEventListener('click', ()=> setTimeout(()=> badge.classList.remove('flipped'), 3000));
})();
