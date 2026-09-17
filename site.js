(() => {

  const body = document.body;
  const toggle = document.querySelector('.theme-toggle');

  // ==============================
  // MODO CLARO E MODO ESCURO
  // ==============================

  const saved = localStorage.getItem('site-theme');

  const prefersLight =
    window.matchMedia &&
    window.matchMedia('(prefers-color-scheme: light)').matches;

  if (saved === 'light' || (!saved && prefersLight)) {
    body.classList.add('light-mode');
  }

  const isEnglish = document.documentElement.lang
    .toLowerCase()
    .startsWith('en');


  function updateThemeButton() {

    if (!toggle) return;

    const light = body.classList.contains('light-mode');

    if (isEnglish) {

      toggle.innerHTML = light
        ? '🌙 <span>Dark mode</span>'
        : '☀️ <span>Light mode</span>';

      toggle.setAttribute(
        'aria-label',
        light
          ? 'Enable dark mode'
          : 'Enable light mode'
      );

    } else {

      toggle.innerHTML = light
        ? '🌙 <span>Modo escuro</span>'
        : '☀️ <span>Modo claro</span>';

      toggle.setAttribute(
        'aria-label',
        light
          ? 'Ativar modo escuro'
          : 'Ativar modo claro'
      );

    }

  }


  updateThemeButton();


  toggle?.addEventListener('click', () => {

    body.classList.toggle('light-mode');

    localStorage.setItem(
      'site-theme',
      body.classList.contains('light-mode')
        ? 'light'
        : 'dark'
    );

    updateThemeButton();

  });


  // ==============================
  // FILTRO DA PÁGINA DE CRÉDITOS
  // ==============================

  const filtros =
    document.querySelectorAll('.filtro-creditos');

  const professores =
    document.getElementById('professores');

  const desenvolvedores =
    document.getElementById('desenvolvedores');

  const titulo =
    document.getElementById('secao-titulo');


  function mostrarTudo() {

    if (titulo) {
      titulo.style.display = '';
    }

    if (professores) {
      professores.style.display = '';
    }

    if (desenvolvedores) {
      desenvolvedores.style.display = '';
    }

  }


  function mostrarProfessores() {

    if (titulo) {
      titulo.style.display = 'none';
    }

    if (professores) {
      professores.style.display = '';
    }

    if (desenvolvedores) {
      desenvolvedores.style.display = 'none';
    }

    professores?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });

  }


  function mostrarDesenvolvedores() {

    if (titulo) {
      titulo.style.display = 'none';
    }

    if (professores) {
      professores.style.display = 'none';
    }

    if (desenvolvedores) {
      desenvolvedores.style.display = '';
    }

    desenvolvedores?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });

  }


  filtros.forEach(link => {

    link.addEventListener('click', event => {

      event.preventDefault();

      const destino = link.getAttribute('href');

      if (destino === '#professores') {

        mostrarProfessores();

      }

      else if (destino === '#desenvolvedores') {

        mostrarDesenvolvedores();

      }

    });

  });


  // ==============================
  // BOTÃO "CRÉDITOS"
  // MOSTRA A PÁGINA COMPLETA
  // ==============================

  const linkCreditos =
    document.getElementById('link-creditos');

  linkCreditos?.addEventListener('click', event => {

    /*
      Se já estiver em creditos.html,
      impede recarregar a página e
      simplesmente mostra tudo.
    */

    if (
      window.location.pathname.endsWith('creditos.html') ||
      window.location.pathname.endsWith('/')
    ) {

      event.preventDefault();

      mostrarTudo();

      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });

    }

  });


  // ==============================
  // CARROSSEL DE IMAGENS
  // ==============================

  const slides = Array.from(
    document.querySelectorAll('.carousel-slide')
  );

  const carousel =
    document.querySelector('.carousel-container');

  const dotsWrap =
    document.querySelector('.carousel-dots');


  // Se a página não tiver carrossel,
  // encerra apenas essa parte.
  if (!slides.length || !carousel) return;


  let index = slides.findIndex(slide =>
    slide.classList.contains('active')
  );


  if (index < 0) {

    index = 0;
    slides[0].classList.add('active');

  }


  const dots = [];
  let timer = null;


  // ==============================
  // CRIAÇÃO DAS BOLINHAS
  // ==============================

  if (dotsWrap) {

    slides.forEach((_, i) => {

      const button =
        document.createElement('button');

      button.className =
        'carousel-dot';

      button.type = 'button';

      button.setAttribute(
        'aria-label',
        isEnglish
          ? `Go to slide ${i + 1}`
          : `Ir para o slide ${i + 1}`
      );


      button.addEventListener('click', () => {

        showSlide(i);
        restartAutoPlay();

      });


      dotsWrap.appendChild(button);
      dots.push(button);

    });

  }


  // ==============================
  // MOSTRAR UMA IMAGEM
  // ==============================

  function showSlide(newIndex) {

    slides[index].classList.remove('active');

    dots[index]?.classList.remove('active');


    index =
      (newIndex + slides.length) %
      slides.length;


    slides[index].classList.add('active');

    dots[index]?.classList.add('active');

  }


  // ==============================
  // BOTÕES ANTERIOR E PRÓXIMO
  // ==============================

  window.changeSlide = function(direction) {

    showSlide(index + direction);

    restartAutoPlay();

  };


  // ==============================
  // TROCA AUTOMÁTICA
  // ==============================

  function startAutoPlay() {

    if (timer !== null) return;


    timer = setInterval(() => {

      showSlide(index + 1);

    }, 4500);

  }


  function stopAutoPlay() {

    if (timer !== null) {

      clearInterval(timer);

      timer = null;

    }

  }


  function restartAutoPlay() {

    stopAutoPlay();
    startAutoPlay();

  }


  // ==============================
  // PAUSAR AO PASSAR O MOUSE
  // ==============================

  carousel.addEventListener(
    'mouseenter',
    stopAutoPlay
  );

  carousel.addEventListener(
    'mouseleave',
    startAutoPlay
  );


  // ==============================
  // INICIALIZAÇÃO
  // ==============================

  dots[index]?.classList.add('active');

  startAutoPlay();


})();
