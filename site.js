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

```
const light = body.classList.contains('light-mode');

if (isEnglish) {
  toggle.innerHTML = light
    ? '🌙 <span>Dark mode</span>'
    : '☀️ <span>Light mode</span>';

  toggle.setAttribute(
    'aria-label',
    light ? 'Enable dark mode' : 'Enable light mode'
  );
} else {
  toggle.innerHTML = light
    ? '🌙 <span>Modo escuro</span>'
    : '☀️ <span>Modo claro</span>';

  toggle.setAttribute(
    'aria-label',
    light ? 'Ativar modo escuro' : 'Ativar modo claro'
  );
}
```

}

updateThemeButton();

toggle?.addEventListener('click', () => {
body.classList.toggle('light-mode');

```
localStorage.setItem(
  'site-theme',
  body.classList.contains('light-mode')
    ? 'light'
    : 'dark'
);

updateThemeButton();
```

});

// ==============================
// SUBMENU DE CRÉDITOS
// ==============================

const creditSections = document.querySelectorAll('.creditos-secao');

const creditLinks = document.querySelectorAll(
'.submenu a[href*="professores"], .submenu a[href*="desenvolvedores"]'
);

const creditMainLink = document.querySelector(
'.dropdown > a[href="creditos.html"]'
);

// Só executa se esta página possuir as seções de créditos
if (creditSections.length) {

```
function showCreditSection(sectionId) {

  creditSections.forEach(section => {
    section.classList.remove('creditos-ativo');
    section.style.display = 'none';
  });

  const selected = document.getElementById(sectionId);

  if (selected) {
    selected.style.display = 'block';
    selected.classList.add('creditos-ativo');

    selected.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }
}


// Orientadores / Desenvolvedores
creditLinks.forEach(link => {

  link.addEventListener('click', event => {

    const href = link.getAttribute('href');

    if (!href) return;

    const sectionId = href.split('#')[1];

    if (!sectionId) return;

    event.preventDefault();

    showCreditSection(sectionId);

    history.pushState(
      null,
      '',
      '#' + sectionId
    );
  });

});


// ==============================
// CLIQUE EM "CRÉDITOS"
// MOSTRA TUDO NOVAMENTE
// ==============================

creditMainLink?.addEventListener('click', event => {

  const href = creditMainLink.getAttribute('href');

  if (href !== 'creditos.html') return;

  event.preventDefault();

  creditSections.forEach(section => {
    section.style.display = 'block';
    section.classList.remove('creditos-ativo');
  });

  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });

  history.pushState(
    null,
    '',
    'creditos.html'
  );
});


// ==============================
// ABRIR DIRETAMENTE PELA ÂNCORA
// ==============================

const hash = window.location.hash;

if (
  hash === '#professores' ||
  hash === '#desenvolvedores'
) {

  const sectionId = hash.substring(1);

  showCreditSection(sectionId);

} else {

  // Página normal: mostra todas as seções
  creditSections.forEach(section => {
    section.style.display = 'block';
  });

}
```

}

// ==============================
// CARROSSEL DE IMAGENS
// ==============================

const slides = Array.from(
document.querySelectorAll('.carousel-slide')
);

const carousel = document.querySelector('.carousel-container');
const dotsWrap = document.querySelector('.carousel-dots');

// Se a página não tiver carrossel,
// encerra apenas a parte do carrossel.
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

```
slides.forEach((_, i) => {

  const button = document.createElement('button');

  button.className = 'carousel-dot';
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
```

}

// ==============================
// MOSTRAR UMA IMAGEM
// ==============================

function showSlide(newIndex) {

```
slides[index].classList.remove('active');
dots[index]?.classList.remove('active');

index =
  (newIndex + slides.length) %
  slides.length;

slides[index].classList.add('active');
dots[index]?.classList.add('active');
```

}

// ==============================
// BOTÕES ANTERIOR E PRÓXIMO
// ==============================

window.changeSlide = function(direction) {

```
showSlide(index + direction);

restartAutoPlay();
```

};

// ==============================
// TROCA AUTOMÁTICA
// ==============================

function startAutoPlay() {

```
if (timer !== null) return;

timer = setInterval(() => {
  showSlide(index + 1);
}, 4500);
```

}

function stopAutoPlay() {

```
if (timer !== null) {

  clearInterval(timer);
  timer = null;

}
```

}

function restartAutoPlay() {

```
stopAutoPlay();
startAutoPlay();
```

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
