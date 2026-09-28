(() => {
    'use strict';

    const body = document.body;
    const toggle = document.querySelector('.theme-toggle');
    const isEnglish = document.documentElement.lang.toLowerCase().startsWith('en');

    /* =========================================================
       MODO ESCURO / MODO CLARO
    ========================================================= */

    const savedTheme = localStorage.getItem('site-theme');

    const prefersLight =
        window.matchMedia &&
        window.matchMedia('(prefers-color-scheme: light)').matches;

    if (savedTheme === 'light' || (!savedTheme && prefersLight)) {
        body.classList.add('light-mode');
    } else {
        body.classList.remove('light-mode');
    }

    function updateThemeButton() {
        if (!toggle) return;

        const lightMode = body.classList.contains('light-mode');

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
    }

    updateThemeButton();

    if (toggle) {
        toggle.addEventListener('click', () => {
            body.classList.toggle('light-mode');

            localStorage.setItem(
                'site-theme',
                body.classList.contains('light-mode')
                    ? 'light'
                    : 'dark'
            );

            updateThemeButton();
        });
    }


    /* =========================================================
       SUBMENUS
    ========================================================= */

    const dropdowns = document.querySelectorAll('.dropdown');

    dropdowns.forEach(dropdown => {
        const link = dropdown.querySelector(':scope > a');
        const submenu = dropdown.querySelector('.submenu');

        if (!link || !submenu) return;

        link.addEventListener('click', event => {
            const isMobile = window.innerWidth <= 700;

            if (isMobile) {
                event.preventDefault();
                dropdown.classList.toggle('open');
            }
        });
    });


    /* =========================================================
       FILTRO DA PÁGINA DE CRÉDITOS
    ========================================================= */

    const creditSections = document.querySelectorAll('.creditos-secao');

    function showCreditsSection(section) {
        if (!creditSections.length) return;

        creditSections.forEach(item => {
            item.style.display = 'none';
        });

        const selected = document.getElementById(section);

        if (selected) {
            selected.style.display = '';
            selected.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        } else {
            creditSections.forEach(item => {
                item.style.display = '';
            });
        }
    }

    function handleCreditsHash() {
        if (!creditSections.length) return;

        const hash = window.location.hash.replace('#', '');

        if (hash === 'professores' || hash === 'desenvolvedores') {
            showCreditsSection(hash);
        } else {
            creditSections.forEach(section => {
                section.style.display = '';
            });
        }
    }

    handleCreditsHash();

    window.addEventListener('hashchange', handleCreditsHash);


    /* =========================================================
       CARROSSEL
    ========================================================= */

    const slides = Array.from(
        document.querySelectorAll('.carousel-slide')
    );

    const carousel = document.querySelector('.carousel-container');
    const dotsWrap = document.querySelector('.carousel-dots');

    /*
       IMPORTANTE:
       Se a página não tiver carrossel, o restante do JS continua
       funcionando normalmente.
    */

    if (slides.length > 0 && carousel) {

        let index = slides.findIndex(
            slide => slide.classList.contains('active')
        );

        if (index < 0) {
            index = 0;
            slides[0].classList.add('active');
        }

        const dots = [];
        let timer = null;


        /* Criar bolinhas */

        if (dotsWrap) {

            dotsWrap.innerHTML = '';

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
        }


        function showSlide(newIndex) {

            if (!slides[index]) return;

            slides[index].classList.remove('active');
            dots[index]?.classList.remove('active');

            index =
                (newIndex + slides.length) %
                slides.length;

            slides[index].classList.add('active');
            dots[index]?.classList.add('active');
        }


        /* Botões anterior / próximo */

        window.changeSlide = function(direction) {

            showSlide(index + direction);

            restartAutoPlay();
        };


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


        /* Pausar quando o mouse estiver sobre o carrossel */

        carousel.addEventListener(
            'mouseenter',
            stopAutoPlay
        );

        carousel.addEventListener(
            'mouseleave',
            startAutoPlay
        );


        /* Ativar primeira bolinha */

        dots[index]?.classList.add('active');

        startAutoPlay();
    }

})();
