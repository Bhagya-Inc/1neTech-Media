/* sticky header */
const hdr = document.getElementById('hdr');

window.addEventListener(
  'scroll',
  () => hdr.classList.toggle('scrolled', scrollY > 36),
  { passive: true }
);

/* drawer */
const hamBtn = document.getElementById('hamBtn');
const drawer = document.getElementById('drawer');
const dcls = document.getElementById('dcls');

hamBtn.addEventListener('click', () => {
  drawer.classList.add('open');
  hamBtn.setAttribute('aria-expanded', 'true');
  document.body.style.overflow = 'hidden';
});

dcls.addEventListener('click', cdraw);

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') cdraw();
});

function cdraw() {
  drawer.classList.remove('open');
  hamBtn.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
}

/* scroll reveal */
const ro = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        ro.unobserve(e.target);
      }
    });
  },
  {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px',
  }
);

document.querySelectorAll('.rv').forEach((el) => ro.observe(el));

/* smooth scroll */
document.querySelectorAll('a[href^="#"]').forEach((a) => {
  a.addEventListener('click', function (e) {
    const t = document.querySelector(this.getAttribute('href'));

    if (t) {
      e.preventDefault();

      window.scrollTo({
        top: t.offsetTop - 70,
        behavior: 'smooth',
      });
    }
  });
});

/* EmailJS */
emailjs.init("5THLu50MhNoIcPsPx");

const form = document.getElementById("contactForm");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const submitBtn = document.getElementById("submitBtn");

  // Get values
  const name = document.getElementById("fname").value.trim();
  const email = document.getElementById("femail").value.trim();
  const business = document.getElementById("fbiz").value.trim();
  const message = document.getElementById("fmsg").value.trim();

  // Check empty fields
  if (!name || !email || !business || !message) {
    alert("Please fill all fields.");
    return;
  }

  // Email validation pattern
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailPattern.test(email)) {
    alert("Please enter a valid email address.");
    return;
  }

  // Button loading state
  submitBtn.disabled = true;
  submitBtn.innerText = "Sending...";

  // EmailJS template params
  const templateParams = {
    name: name,
    email: email,
    business: business,
    message: message,
  };

  // Send mail
  emailjs
    .send(
      "service_6oj8mwo",
      "template_zr4wk9l",
      templateParams
    )
    .then(function () {
      alert("✅ Sent! We\'ll be in touch soon.");

      form.reset();
    })
    .catch(function (error) {
      console.error("Failed to send message.");
      //console.error("Error:", error);

      alert("Failed to send message.");
    })
    .finally(function () {
      submitBtn.disabled = false;
      submitBtn.innerText = "Send Message";
    });
});