const headerImage = document.querySelector('.header__title--svg-image');
console.log(headerImage);

headerImage.style.height = `${headerImage.getBoundingClientRect().width / 1.52}px`
window.addEventListener("resize", e => {
    headerImage.style.height = `${headerImage.getBoundingClientRect().width / 1.52}px`
})