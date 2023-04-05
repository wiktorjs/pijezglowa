// import "./animated/whyImage";
import "./animated/headerImage"

const headerImage = document.querySelector('.header__title--svg-image');

headerImage.style.height = `${headerImage.getBoundingClientRect().width / 1.52}px`
window.addEventListener("resize", e => {
    headerImage.style.height = `${headerImage.getBoundingClientRect().width / 1.52}px`
})

const nav = document.querySelector('nav');
const navBtn = document.querySelector('.nav-menu__button');
navBtn.addEventListener('click', (e) => {
    const btnParent = e.target.closest('.nav-menu__button');
    const btnChildren = btnParent.querySelectorAll('*');

    btnChildren.forEach(btnChild => {
        btnChild.classList.toggle('active');
    });
    btnParent.classList.toggle('box--active');
    nav.classList.toggle('nav--visible');
})


