// Interactions for friend-page
let lastComplimentIndex = -1;


// Utility: simple confetti generator
function burstConfetti(amount = 40){
const colors = ['#FFC1E3','#BFE9FF','#FFD7A8','#FFF59D','#C8FFD4'];
for(let i=0;i<amount;i++){
const el = document.createElement('div');
el.className = 'confetti-piece';
const left = Math.random()*100; // vw
el.style.left = left + 'vw';
el.style.top = '-10vh';
el.style.background = colors[Math.floor(Math.random()*colors.length)];
el.style.transform = `rotate(${Math.random()*360}deg)`;
const size = 6 + Math.random()*12;
el.style.width = size + 'px';
el.style.height = (size + Math.random()*6) + 'px';
const delay = Math.random()*200;
const duration = 1200 + Math.random()*1200;
el.style.animation = `confetti-fall ${duration}ms linear ${delay}ms forwards`;
el.style.zIndex = 9999;
confettiRoot.appendChild(el);
// cleanup
setTimeout(()=>{ el.remove(); }, duration + delay + 50);
}
}


// Surprise button behavior
surpriseBtn.addEventListener('click', ()=>{
const showing = hiddenMessage.classList.contains('show');
if(!showing){
hiddenMessage.classList.add('show');
// small confetti burst
burstConfetti(26);
} else {
hiddenMessage.classList.remove('show');
}
});


// Compliment button behavior
complimentBtn.addEventListener('click', ()=>{
// pick a random index not equal to last
if(compliments.length === 0) return;
let idx;
let attempts = 0;
do{
idx = Math.floor(Math.random()*compliments.length);
attempts++;
} while(idx === lastComplimentIndex && attempts < 8);
lastComplimentIndex = idx;
complimentText.textContent = compliments[idx];
complimentText.classList.remove('pop');
// trigger reflow to restart animation
void complimentText.offsetWidth;
complimentText.classList.add('pop');
// confetti + tiny hearts
burstConfetti(18);
});


// Optional: make images lazy-fallback if missing
document.querySelectorAll('.polaroid img').forEach(img => {
  img.addEventListener('error', () => {
    img.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200"><rect width="100%" height="100%" fill="lightgray"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-size="20" fill="black">No Photo</text></svg>';
  });
});

// List of compliments
const compliments = [
  "You make everything brighter 💙",
  "Your smile is literally contagious 😄",
  "Talking to you feels good 🤗",
  "You’re effortlessly cool 🌸",
  "Your energy makes boring days exciting ✨"
];

const btn = document.getElementById("complimentBtn");
const text = document.getElementById("complimentText");

// Add click event
btn.addEventListener("click", () => {
  const randomIndex = Math.floor(Math.random() * compliments.length);
  text.textContent = compliments[randomIndex];
});
