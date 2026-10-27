// ===== Mobile menu =====
const burger = document.getElementById('burger');
const mobileNav = document.getElementById('mobileNav');

burger.addEventListener('click', () => {
  mobileNav.classList.toggle('active');
});

// Close mobile menu on link click
mobileNav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mobileNav.classList.remove('active');
  });
});

// ===== Simulator =====
const slider = document.getElementById('resistanceSlider');
const resistanceValue = document.getElementById('resistanceValue');
const forceValue = document.getElementById('forceValue');
const calValue = document.getElementById('calValue');
const repCounter = document.getElementById('repCounter');
const squeezeBtn = document.getElementById('squeezeBtn');
const resetBtn = document.getElementById('resetBtn');

let reps = 0;
let calories = 0;

function updateResistance() {
  const val = parseInt(slider.value, 10);
  resistanceValue.textContent = val;
  forceValue.textContent = val;
}

slider.addEventListener('input', updateResistance);

squeezeBtn.addEventListener('click', () => {
  reps += 1;
  const resistance = parseInt(slider.value, 10);
  // Approximate calories: \~0.04 kcal per squeeze at 30 kg, scales with resistance
  calories += (resistance / 30) * 0.04;
  
  repCounter.textContent = String(reps).padStart(4, '0');
  calValue.textContent = calories.toFixed(1);

  // Visual feedback
  squeezeBtn.style.transform = 'scale(0.95)';
  setTimeout(() => {
    squeezeBtn.style.transform = '';
  }, 100);
});

resetBtn.addEventListener('click', () => {
  reps = 0;
  calories = 0;
  repCounter.textContent = '0000';
  calValue.textContent = '0';
});

// ===== Order form =====
const orderForm = document.getElementById('orderForm');
const successModal = document.getElementById('successModal');
const closeModal = document.getElementById('closeModal');

orderForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const nova = document.getElementById('nova').value.trim();

  if (!name  !phone  !nova) {
    alert('Ѕудь ласка, заповн≥ть ус≥ пол€.');
    return;
  }

  // Simple phone validation (Ukrainian format)
  const phoneClean = phone.replace(/\D/g, '');
  if (phoneClean.length < 10) {
    alert('¬вед≥ть коректний номер телефону.');
    return;
  }

  // Show success modal (in real project you would send data to backend / Telegram / etc.)
  successModal.classList.add('active');
  orderForm.reset();
});

closeModal.addEventListener('click', () => {
  successModal.classList.remove('active');
});

// Close modal on backdrop click
successModal.addEventListener('click', (e) => {
  if (e.target === successModal) {
    successModal.classList.remove('active');
  }
});

// ===== Smooth scroll offset for sticky header =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    
    const target = document.querySelector(targetId);
    if (target) {
      e.preventDefault();
      const headerHeight = document.querySelector('.header').offsetHeight;
      const top = target.getBoundingClientRect().top + window.pageYOffset - headerHeight - 10;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});