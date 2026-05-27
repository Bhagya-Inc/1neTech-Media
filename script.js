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

/* ─────────────────────────────────────────────────────────────
   TESTIMONIALS CAROUSEL  –  1neTech Media
───────────────────────────────────────────────────────────── */

(function () {
  "use strict";

  /* ── Config ────────────────────────────────────────── */
  const AUTO_DELAY = 5000;

  /* ── Elements ──────────────────────────────────────── */
  const track = document.getElementById("tcTrack");
  const dotsWrap = document.getElementById("tcDots");
  const btnPrev = document.getElementById("tcPrev");
  const btnNext = document.getElementById("tcNext");

  // Exit if section doesn't exist
  if (!track) return;

  const slides = Array.from(
    track.querySelectorAll(".tc-slide")
  );

  const total = slides.length;

  let current = 0;
  let timer = null;

  /* ── Build Dots ────────────────────────────────────── */
  slides.forEach(function (_, i) {

    const dot = document.createElement("button");

    dot.className =
      "tc-dot" + (i === 0 ? " active" : "");

    dot.setAttribute(
      "aria-label",
      "Go to testimonial " + (i + 1)
    );

    dot.addEventListener("click", function () {
      goTo(i);
    });

    dotsWrap.appendChild(dot);
  });

  /* ── Main Navigation Function ─────────────────────── */
  function goTo(index) {

    current = ((index % total) + total) % total;

    track.style.transform =
      "translateX(-" + current * 100 + "%)";

    updateDots();

    resetTimer();
  }

  /* ── Update Active Dot ────────────────────────────── */
  function updateDots() {

    const dots =
      dotsWrap.querySelectorAll(".tc-dot");

    dots.forEach(function (dot, i) {

      dot.classList.toggle(
        "active",
        i === current
      );
    });
  }

  /* ── Button Controls ──────────────────────────────── */
  if (btnPrev) {
    btnPrev.addEventListener("click", function () {
      goTo(current - 1);
    });
  }

  if (btnNext) {
    btnNext.addEventListener("click", function () {
      goTo(current + 1);
    });
  }

  /* ── Swipe Support ────────────────────────────────── */
  let touchStartX = 0;
  let touchEndX = 0;

  track.addEventListener(
    "touchstart",
    function (e) {

      touchStartX =
        e.changedTouches[0].screenX;
    },
    { passive: true }
  );

  track.addEventListener(
    "touchend",
    function (e) {

      touchEndX =
        e.changedTouches[0].screenX;

      const diff =
        touchStartX - touchEndX;

      // Minimum swipe distance
      if (Math.abs(diff) > 40) {

        if (diff > 0) {
          goTo(current + 1);
        } else {
          goTo(current - 1);
        }
      }
    },
    { passive: true }
  );

  /* ── Keyboard Navigation ──────────────────────────── */
  document.addEventListener(
    "keydown",
    function (e) {

      if (e.key === "ArrowLeft") {
        goTo(current - 1);
      }

      if (e.key === "ArrowRight") {
        goTo(current + 1);
      }
    }
  );

  /* ── Auto Play ────────────────────────────────────── */
  function resetTimer() {

    clearInterval(timer);

    timer = setInterval(function () {

      goTo(current + 1);

    }, AUTO_DELAY);
  }

  /* ── Pause on Hover ───────────────────────────────── */
  track.addEventListener(
    "mouseenter",
    function () {

      clearInterval(timer);
    }
  );

  track.addEventListener(
    "mouseleave",
    function () {

      resetTimer();
    }
  );

  /* ── Start Carousel ───────────────────────────────── */
  resetTimer();

})();

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