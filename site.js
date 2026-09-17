(() => {
// =========================================================
// MODO CLARO / MODO ESCURO
// =========================================================

const body = document.body;
const toggle = document.querySelector('.theme-toggle');

const savedTheme = localStorage.getItem('site-theme');

const prefersLight =
window.matchMedia &&
window.matchMedia('(prefers-color-scheme: light)').matches;

// Aplica o tema salvo ou o tema preferido pelo sistema
if (
savedTheme === 'light' ||
(!savedTheme && prefersLight)
) {
body.classList.add('light-mode');
}

const isEnglish =
document.documentElement.lang
.toLowerCase()
.startsWith('en');

// Atualiza o texto do botão
function updateThemeButton() {

```
if (!toggle) return;

const lightMode =
  body.classList.contains('light-mode');

if (isEnglish) {

  toggle.innerHTML = lightMode
    ? '🌙 <span>Dark mode</span>'
    : '☀️ <span>Light mode</span>';

  toggle.setAttribute(
    'aria-label',
    lightMode
      ? 'Enable dark mode'
      : 'Enable light mode'
  );

} else {

  toggle.innerHTML = lightMode
    ? '🌙 <span>Modo escuro</span>'
    : '☀️ <span>Modo claro</span>';

  toggle.setAttribute(
    'aria-label',
    lightMode
      ? 'Ativar modo escuro'
      : 'Ativar modo claro'
  );

}
```

}

updateThemeButton();

// Clique no botão de tema
if (toggle) {

```
toggle.addEventListener('click', () => {

  body.classList.toggle('light-mode');

  const lightMode =
    body.classList.contains('light-mode');

  localStorage.setItem(
    'site-theme',
    lightMode ? 'light' : 'dark'
  );

  updateThemeButton();

});
```

}

// =========================================================
// SUBMENU DE CRÉDITOS
// =========================================================

const creditSections =
document.querySelectorAll('.creditos-secao');

// Só executa esta parte nas páginas que possuem
// as seções especiais dos créditos.
if (creditSections.length > 0) {

```
const advisorLinks =
  document.querySelectorAll(
    '.submenu a[href*="#professores"]'
  );

const developerLinks =
  document.querySelectorAll(
    '.submenu a[href*="#desenvolvedores"]'
  );

const creditMainLink =
  document.querySelector(
    '.dropdown > a[href="creditos.html"], ' +
    '.dropdown > a[href="creditos_en.html"]'
  );


// ---------------------------------------------------------
// Mostra somente uma seção
// ---------------------------------------------------------

function showOnlySection(sectionId) {

  creditSections.forEach(section => {

    section.style.display = 'none';
    section.classList.remove('creditos-ativo');

  });


  const selectedSection =
    document.getElementById(sectionId);


  if (selectedSection) {

    selectedSection.style.display = 'block';

    selectedSection.classList.add(
      'creditos-ativo'
    );

    // Pequeno atraso para garantir que a seção
    // já esteja visível antes da rolagem.
    setTimeout(() => {

      selectedSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });

    }, 50);

  }

}


// ---------------------------------------------------------
// Mostra todas as seções
// ---------------------------------------------------------

function showAllCreditSections() {

  creditSections.forEach(section => {

    section.style.display = 'block';

    section.classList.remove(
      'creditos-ativo'
    );

  });

}


// ---------------------------------------------------------
// ORIENTADORES
// ---------------------------------------------------------

advisorLinks.forEach(link => {

  link.addEventListener('click', event => {

    event.preventDefault();

    showOnlySection('professores');

    history.pushState(
      null,
      '',
      link.getAttribute('href')
    );

  });

});


// ---------------------------------------------------------
// DESENVOLVEDORES
// ---------------------------------------------------------

developerLinks.forEach(link => {

  link.addEventListener('click', event => {

    event.preventDefault();

    showOnlySection('desenvolvedores');

    history.pushState(
      null,
      '',
      link.getAttribute('href')
    );

  });

});


// ---------------------------------------------------------
// BOTÃO PRINCIPAL "CRÉDITOS"
// ---------------------------------------------------------

if (creditMainLink) {

  creditMainLink.addEventListener(
    'click',
    event => {

      event.preventDefault();

      showAllCreditSections();

      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });

      history.pushState(
        null,
        '',
        creditMainLink.getAttribute('href')
      );

    }
  );

}


// ---------------------------------------------------------
// ABRIR PÁGINA COM #PROFESSORES OU #DESENVOLVEDORES
// ---------------------------------------------------------

function checkCreditHash() {

  const hash =
    window.location.hash;

  if (hash === '#professores') {

    showOnlySection('professores');

  } else if (
    hash === '#desenvolvedores'
  ) {

    showOnlySection(
      'desenvolvedores'
    );

  } else {

    showAllCreditSections();

  }

}


checkCreditHash();


// Se o usuário navegar pelo histórico
// do navegador.
window.addEventListener(
  'popstate',
  checkCreditHash
);

window.addEventListener(
  'hashchange',
  checkCreditHash
);
```

}

// =========================================================
// CARROSSEL DE IMAGENS
// =========================================================

const slides =
Array.from(
document.querySelectorAll(
'.carousel-slide'
)
);

const carousel =
document.querySelector(
'.carousel-container'
);

const dotsWrap =
document.querySelector(
'.carousel-dots'
);

// Se a página não possui carrossel,
// simplesmente não executa esta parte.
// Isso NÃO interfere no modo claro.
if (slides.length > 0 && carousel) {

```
let index =
  slides.findIndex(slide =>
    slide.classList.contains('active')
  );


// Se nenhuma imagem estiver marcada como ativa
if (index < 0) {

  index = 0;

  slides[0].classList.add(
    'active'
  );

}


const dots = [];

let timer = null;


// ---------------------------------------------------------
// CRIAÇÃO DAS BOLINHAS
// ---------------------------------------------------------

if (dotsWrap) {

  // Evita criar bolinhas duplicadas
  dotsWrap.innerHTML = '';

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


    button.addEventListener(
      'click',
      () => {

        showSlide(i);

        restartAutoPlay();

      }
    );


    dotsWrap.appendChild(button);

    dots.push(button);

  });

}


// ---------------------------------------------------------
// MOSTRAR SLIDE
// ---------------------------------------------------------

function showSlide(newIndex) {

  // Remove o slide atual
  slides[index].classList.remove(
    'active'
  );

  dots[index]?.classList.remove(
    'active'
  );


  // Calcula o novo índice
  index =
    (newIndex + slides.length) %
    slides.length;


  // Ativa o novo slide
  slides[index].classList.add(
    'active'
  );

  dots[index]?.classList.add(
    'active'
  );

}


// ---------------------------------------------------------
// BOTÃO ANTERIOR / PRÓXIMO
// ---------------------------------------------------------

window.changeSlide =
  function(direction) {

    showSlide(
      index + direction
    );

    restartAutoPlay();

  };


// ---------------------------------------------------------
// INICIAR CARROSSEL AUTOMÁTICO
// ---------------------------------------------------------

function startAutoPlay() {

  // Não cria vários timers ao mesmo tempo
  if (timer !== null) return;


  timer = setInterval(
    () => {

      showSlide(
        index + 1
      );

    },
    4500
  );

}


// ---------------------------------------------------------
// PARAR CARROSSEL
// ---------------------------------------------------------

function stopAutoPlay() {

  if (timer !== null) {

    clearInterval(timer);

    timer = null;

  }

}


// ---------------------------------------------------------
// REINICIAR CARROSSEL
// ---------------------------------------------------------

function restartAutoPlay() {

  stopAutoPlay();

  startAutoPlay();

}


// ---------------------------------------------------------
// PAUSAR AO PASSAR O MOUSE
// ---------------------------------------------------------

carousel.addEventListener(
  'mouseenter',
  stopAutoPlay
);

carousel.addEventListener(
  'mouseleave',
  startAutoPlay
);


// ---------------------------------------------------------
// INICIALIZAÇÃO
// ---------------------------------------------------------

dots[index]?.classList.add(
  'active'
);

startAutoPlay();
```

}

})();
