document.addEventListener('DOMContentLoaded', () => {
    // Логика для уведомления по клику на Contact
    const contactLink = document.getElementById('contact-link');
    if (contactLink) {
        contactLink.addEventListener('click', (event) => {
            event.preventDefault();
            alert('Our contact email: luciscepesh@gmail.com');
        });
    }

    // Логика для подсветки активной секции при прокрутке
    const homeLink = document.getElementById('home-link');
    const aboutLink = document.getElementById('about-link');
    const aboutSection = document.getElementById('about');

    function onScroll() {
        if (!aboutSection || !homeLink || !aboutLink) return;
        const aboutSectionTop = aboutSection.getBoundingClientRect().top;
        
        if (aboutSectionTop <= window.innerHeight / 2) {
            aboutLink.classList.add('active');
            homeLink.classList.remove('active');
        } else {
            homeLink.classList.add('active');
            aboutLink.classList.remove('active');
        }
    }
    window.addEventListener('scroll', onScroll);
    
    // Логика для фона, реагирующего на мышь
    const heroSection = document.getElementById('hero');
    if (heroSection) {
        heroSection.addEventListener("pointermove", (e)=>{
            const { currentTarget: el, clientX: x, clientY: y } = e;
            const { top: t, left: l, width: w, height: h } = el.getBoundingClientRect();
            el.style.setProperty('--posX',  x - l - w/2);
            el.style.setProperty('--posY',  y - t - h/2);
        })
    }
});