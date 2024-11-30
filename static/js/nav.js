document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav__link');
    navLinks.forEach(link => {
        if (link.href === window.location.href) {
            link.classList.add('nav__link__active');
        }
    });
});
