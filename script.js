/*==========| Header |==========*/
const buttonsJoin = document.querySelectorAll('.button-join');
const header = document.querySelector('header');
const nav = document.querySelector('.main-nav');

const isMobile = window.matchMedia("(max-width: 768px)");

window.addEventListener('scroll', function () {

    if (isMobile.matches) return;

    if (window.scrollY > 10) {
        header.classList.add('scrolled');
        buttonsJoin.forEach(btn => btn.classList.remove('big'));
        nav.classList.add('compact');
    } else {
        header.classList.remove('scrolled');
        buttonsJoin.forEach(btn => btn.classList.add('big'));
        nav.classList.remove('compact');
    }
});

/*==========| Language switcher |==========*/
      function setLang(lang) {
         document.querySelectorAll('[data-lang]').forEach(el => {
            el.style.display = el.getAttribute('data-lang') === lang ? '' : 'none';
         });
         document.getElementById('btn-en').classList.toggle('active', lang === 'EN');
         document.getElementById('btn-ru').classList.toggle('active', lang === 'RU');
      }
      setLang('RU');

/*==========| box-commander |==========*/
let hasScrolled = false;

function startObserver() {
    const commanders = document.querySelectorAll('.box-commander');

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, {
        threshold: 0.2
    });

    commanders.forEach(commander => observer.observe(commander));
}

function handleFirstScroll() {
    if (!hasScrolled) {
        hasScrolled = true;
        startObserver();
        window.removeEventListener('scroll', handleFirstScroll);
    }
}

window.addEventListener('scroll', handleFirstScroll);


/*==========| langue |==========*/
function changeLanguage(url) {
    if (url) {
        window.location.href = url;
    }
}


/*==========| img |==========*/
const images = [
    './img/logos/logo-1.png',   
    './img/logos/logo-2.png',
    './img/logos/logo-3.png',
    './img/logos/logo-4.png',
    './img/logos/logo-5.png',
    './img/logos/logo-6.png',
];

let current = 0;
const imgElement = document.getElementById('rotating-image');

setInterval(() => {
    current = (current + 1) % images.length;
    imgElement.style.opacity = 0;
    setTimeout(() => {
        imgElement.src = images[current];
        imgElement.style.opacity = 1;
    }, 500);
}, 150);



