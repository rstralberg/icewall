function navbarToggle(navbar) {
    var element = document.querySelector('.' + navbar);
    if (element === null)
        return;
    if (element.className === navbar) {
        element.className += ' responsive';
    }
    else {
        element.className = navbar;
    }
}
function evPageSelected(id) {
    getPage(id).then((page) => {
        Session.page = page;
        //loadPageTheme(id);
        getSub(id);
        getContents(id);
        let rtPublic = eGet('#rt-public');
        if (rtPublic)
            rtPublic.style.color = page.publ ? PUBLIC_COLOR : INTERN_COLOR;
    }, (err) => {
        error(err);
    });
}
function navbarThemeSelected(theme) {
    loadTheme(theme);
}
function onThemeSelect() {
    let select = eGet('theme-select');
    if (select) {
        let themeName = select.options[select.selectedIndex].value;
        loadTheme(themeName);
    }
}
function evParentSelected(e) {
    let ul = e.querySelectorAll('ul')[0];
    if (ul) {
        toggleDisplay(ul);
        for (let i = 0; i < ul.childElementCount; i++) {
            let li = ul.children[i];
            toggleDisplay(li);
        }
    }
}
function evToggleIcon(e) {
    let menu = eGet('#menu');
    toggleDisplay(menu);
    let burger = document.querySelector('#nav-burger');
    let close = document.querySelector('#nav-close');
    if (burger && close) {
        burger.style.display = burger.style.display === 'none' ? 'content' : 'none';
        close.style.display = burger.style.display === 'none' ? 'content' : 'none';
    }
}
function getTop() {
    let request = new SrvReq('top', [
        { key: 'theme', value: getStyle('name') },
        { key: 'username', value: Session.user.username }
    ]);
    request.send().then((resolve) => {
        let element = eGet('.top');
        element.innerHTML = resolve;
    }, (reject) => { error(reject); });
}
