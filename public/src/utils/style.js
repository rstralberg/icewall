
function get_style(name) {
    return getComputedStyle(query('html')).getPropertyValue('--' + name);
}

function set_style(name, value) {
    document.documentElement.style.setProperty('--' + name, value);
}