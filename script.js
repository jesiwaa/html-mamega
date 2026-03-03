// ========== HAMBURGER MENU ==========
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
  });
});

// ========== NAVBAR SCROLL EFFECT ==========
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.style.padding = '0.6rem 2.5rem';
  } else {
    navbar.style.padding = '1rem 2.5rem';
  }
});

// ========== TESTIMONIAL SLIDER ==========
const track = document.getElementById('testimonialTrack');
const cards = track.querySelectorAll('.testimonial-card');
const dots = document.querySelectorAll('.dot');
let current = 0;
let autoSlide;

function goToSlide(index) {
  current = index;
  track.scrollTo({ left: cards[0].offsetWidth * index, behavior: 'smooth' });
  dots.forEach(d => d.classList.remove('active'));
  dots[index].classList.add('active');
}

dots.forEach(dot => {
  dot.addEventListener('click', () => goToSlide(parseInt(dot.dataset.i)));
});

function startAutoSlide() {
  autoSlide = setInterval(() => {
    let next = (current + 1) % cards.length;
    goToSlide(next);
  }, 4000);
}

startAutoSlide();
track.addEventListener('mouseenter', () => clearInterval(autoSlide));
track.addEventListener('mouseleave', startAutoSlide);

// ========== SCROLL REVEAL ==========
const revealElements = document.querySelectorAll('.menu-card, .feature, .contact-item, .about-text, .about-circle');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

revealElements.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(el);
});

// ========== CONTACT FORM ==========
const form = document.getElementById('contactForm');
const successMsg = document.getElementById('formSuccess');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const btn = form.querySelector('button[type="submit"]');
  btn.textContent = 'Sending...';
  btn.disabled = true;

  setTimeout(() => {
    form.reset();
    btn.textContent = 'Send Message';
    btn.disabled = false;
    successMsg.style.display = 'block';
    setTimeout(() => successMsg.style.display = 'none', 5000);
  }, 1200);
});

// ========== ACTIVE NAV LINK ==========
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let fromTop = window.scrollY + 100;
  sections.forEach(section => {
    if (section.offsetTop <= fromTop && section.offsetTop + section.offsetHeight > fromTop) {
      navAnchors.forEach(a => {
        a.style.color = '';
        if (a.getAttribute('href') === '#' + section.id) {
          a.style.color = 'var(--orange)';
        }
      });
    }
  });
});


// ============================================================
// 1. BACK TO TOP BUTTON
// ============================================================
const backToTopBtn = document.createElement('button');
backToTopBtn.id = 'backToTop';
backToTopBtn.innerHTML = '&#8679;';
backToTopBtn.title = 'Back to top';
backToTopBtn.style.cssText = `
  position: fixed;
  bottom: 100px;
  right: 24px;
  z-index: 999;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: var(--orange);
  color: white;
  font-size: 1.6rem;
  border: none;
  cursor: pointer;
  box-shadow: 0 4px 20px rgba(232,101,10,0.5);
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.3s, transform 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
`;
document.body.appendChild(backToTopBtn);

window.addEventListener('scroll', () => {
  if (window.scrollY > 400) {
    backToTopBtn.style.opacity = '1';
    backToTopBtn.style.transform = 'translateY(0)';
  } else {
    backToTopBtn.style.opacity = '0';
    backToTopBtn.style.transform = 'translateY(20px)';
  }
});

backToTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});


// ============================================================
// 2. WHATSAPP FLOATING ORDER BUTTON
// ============================================================
const waBtn = document.createElement('a');
waBtn.id = 'whatsappBtn';
waBtn.href = 'https://wa.me/233249876543?text=Hi%20Mamega!%20I%27d%20like%20to%20order%20fresh%20tilapia.';
waBtn.target = '_blank';
waBtn.rel = 'noopener noreferrer';
waBtn.title = 'Order on WhatsApp';
waBtn.innerHTML = `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="28" height="28" fill="white">
    <path d="M16 0C7.163 0 0 7.163 0 16c0 2.833.738 5.49 2.028 7.8L0 32l8.418-2.004A15.93 15.93 0 0016 32c8.837 0 16-7.163 16-16S24.837 0 16 0zm0 29.25a13.22 13.22 0 01-6.748-1.843l-.484-.287-5.003 1.192 1.224-4.878-.316-.5A13.198 13.198 0 012.75 16C2.75 8.958 8.958 2.75 16 2.75S29.25 8.958 29.25 16 23.042 29.25 16 29.25zm7.27-9.773c-.398-.199-2.353-1.162-2.718-1.294-.365-.133-.63-.199-.896.199-.265.398-1.028 1.294-1.261 1.56-.232.265-.464.298-.863.1-.398-.2-1.682-.62-3.204-1.977-1.184-1.057-1.983-2.362-2.215-2.76-.232-.398-.025-.613.175-.811.18-.178.398-.464.597-.696.2-.232.266-.398.399-.664.132-.265.066-.497-.033-.696-.1-.199-.896-2.16-1.228-2.957-.323-.775-.651-.67-.896-.682l-.763-.013c-.265 0-.696.1-1.061.497-.365.398-1.393 1.36-1.393 3.317s1.427 3.846 1.626 4.111c.199.265 2.808 4.286 6.804 6.013.951.41 1.693.655 2.271.838.954.303 1.823.26 2.51.158.766-.114 2.353-.962 2.685-1.891.332-.929.332-1.726.232-1.891-.099-.166-.364-.265-.763-.464z"/>
  </svg>
  <span>Order Now</span>
`;
waBtn.style.cssText = `
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 999;
  background: #25D366;
  color: white;
  padding: 0.75rem 1.2rem;
  border-radius: 50px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: var(--font-body);
  font-weight: 700;
  font-size: 0.9rem;
  text-decoration: none;
  box-shadow: 0 4px 20px rgba(37,211,102,0.5);
  transition: transform 0.2s, box-shadow 0.2s;
`;
waBtn.addEventListener('mouseenter', () => {
  waBtn.style.transform = 'translateY(-3px)';
  waBtn.style.boxShadow = '0 8px 30px rgba(37,211,102,0.6)';
});
waBtn.addEventListener('mouseleave', () => {
  waBtn.style.transform = 'translateY(0)';
  waBtn.style.boxShadow = '0 4px 20px rgba(37,211,102,0.5)';
});
document.body.appendChild(waBtn);




const statusBadge = document.createElement('div');
statusBadge.id = 'shopStatus';

function updateStatus() {
  const open = getShopStatus();
  statusBadge.innerHTML = open
    ? '🟢 <strong>We\'re Open</strong> — Come get your fresh tilapia!'
    : '🔴 <strong>We\'re Closed</strong> — Open daily 10AM – 9PM';
  statusBadge.style.cssText = `
    position: fixed;
    top: 75px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 998;
    background: ${open ? 'rgba(46,139,87,0.95)' : 'rgba(139,0,0,0.92)'};
    color: white;
    padding: 0.5rem 1.8rem;
    border-radius: 50px;
    font-size: 0.85rem;
    font-family: var(--font-body);
    letter-spacing: 0.5px;
    box-shadow: 0 4px 20px rgba(0,0,0,0.3);
    white-space: nowrap;
  `;
}

updateStatus();
document.body.appendChild(statusBadge);
setInterval(updateStatus, 60000);


// ============================================================
// 4. IMAGE LIGHTBOX (click menu images to zoom)
// ============================================================
const lightbox = document.createElement('div');
lightbox.id = 'lightbox';
lightbox.style.cssText = `
  display: none;
  position: fixed;
  inset: 0;
  z-index: 2000;
  background: rgba(0,0,0,0.9);
  align-items: center;
  justify-content: center;
  cursor: zoom-out;
`;
lightbox.innerHTML = `<img id="lightboxImg" style="max-width:90vw; max-height:85vh; border-radius:12px; box-shadow:0 20px 60px rgba(0,0,0,0.5); transition: transform 0.3s;" />`;
document.body.appendChild(lightbox);

const lightboxImg = document.getElementById('lightboxImg');

document.querySelectorAll('.menu-img, .gallery-item img').forEach(img => {
  img.style.cursor = 'zoom-in';
  img.addEventListener('click', () => {
    const bg = window.getComputedStyle(img).backgroundImage;
    const urlMatch = bg.match(/url\(["']?([^"')]+)["']?\)/);
    if (urlMatch) {
      lightboxImg.src = urlMatch[1];
      lightbox.style.display = 'flex';
      setTimeout(() => lightboxImg.style.transform = 'scale(1)', 10);
    }
  });
});

lightbox.addEventListener('click', () => {
  lightboxImg.style.transform = 'scale(0.9)';
  setTimeout(() => {
    lightbox.style.display = 'none';
    lightboxImg.src = '';
  }, 200);
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && lightbox.style.display === 'flex') {
    lightbox.style.display = 'none';
    lightboxImg.src = '';
  }
});