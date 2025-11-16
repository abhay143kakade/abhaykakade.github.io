
// Simple typing effect and scroll reveal for the static portfolio.
// Typing
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
document.addEventListener('DOMContentLoaded', ()=>{
  typeLoop();

  // Simple scroll reveal (IntersectionObserver)
  const observer = new IntersectionObserver((entries)=> {
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add('in-view');
      }
    });
  }, {threshold: 0.15});
  document.querySelectorAll('.card, .skill-card, .project-card').forEach(el=> observer.observe(el));

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
});
