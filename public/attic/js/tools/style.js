function getStyle(name) {
    return getComputedStyle(document.querySelector('html')).getPropertyValue('--' + name);
}
function setStyle(name, value) {
    document.documentElement.style.setProperty('--' + name, value);
}
