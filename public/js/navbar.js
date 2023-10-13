
function navbarToggle(navbar) {
    var element = document.querySelector('.'+navbar);
    if (element.className === navbar) {
        element.className += ' responsive';
    } else {
        element.className = navbar;
    }
}


function onPageSelect(id) {

    Cookie.pageId = id;
    getPageTitle(id, Cookie.username);
    getBlocks(id);

}


function onThemeSelect() {

    let select = document.getElementById('theme-select');
    let themeName = select.options[select.selectedIndex].value;
    loadTheme(themeName);

}