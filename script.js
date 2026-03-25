  /* sticky header */
  const hdr = document.getElementById('hdr');
  window.addEventListener('scroll', () => hdr.classList.toggle('scrolled', scrollY > 36), {passive:true});

  /* drawer */
  const hamBtn = document.getElementById('hamBtn');
  const drawer = document.getElementById('drawer');
  const dcls   = document.getElementById('dcls');
  hamBtn.addEventListener('click', () => {
    drawer.classList.add('open');
    hamBtn.setAttribute('aria-expanded','true');
    document.body.style.overflow = 'hidden';
  });
  dcls.addEventListener('click', cdraw);
  document.addEventListener('keydown', e => { if (e.key==='Escape') cdraw(); });
  function cdraw() {
    drawer.classList.remove('open');
    hamBtn.setAttribute('aria-expanded','false');
    document.body.style.overflow = '';
  }

  /* scroll reveal */
  const ro = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); ro.unobserve(e.target); } });
  }, {threshold:0.1, rootMargin:'0px 0px -40px 0px'});
  document.querySelectorAll('.rv').forEach(el => ro.observe(el));

  /* smooth scroll */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function(e) {
      const t = document.querySelector(this.getAttribute('href'));
      if (t) { e.preventDefault(); window.scrollTo({top: t.offsetTop - 70, behavior:'smooth'}); }
    });
  });

  /* contact form */
  const form = document.getElementById('contactForm');
  const sbtn = document.getElementById('submitBtn');
  form.addEventListener('submit', e => {
    e.preventDefault();
    sbtn.disabled = true;
    sbtn.textContent = 'Sending…';
    setTimeout(() => {
      sbtn.textContent = '✅ Sent! We\'ll be in touch soon.';
      sbtn.style.background = '#16a34a';
      form.reset();
      setTimeout(() => {
        sbtn.disabled = false;
        sbtn.style.background = '';
        sbtn.innerHTML = 'Send Message <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5" style="width:16px;height:16px;vertical-align:middle;margin-left:4px"><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"/></svg>';
      }, 4000);
    }, 1500);
  });
