
function on_menu() {

    if( is_valid(document.querySelector('#theme-menu-form') )) return;

    server('themes/menu', {
        theme: get_style('theme'),
        nbarBold: get_style('nbarBold'),
        nbarItalic: get_style('nbarItalic'),
        nbarFsize: get_style('nbarFsize'),
        nbarBgHi: get_style('nbarBgHi'),
        nbarFgHi: get_style('nbarFgHi'),
    }).then(
        (resolve) => {
            add_form('theme-menu-form', resolve);
        }
    )
}

function close_menu() {
    server('themes/menu_upd', {
        theme: get_style('theme'),
        nbarBold: get_style('nbarBold'),
        nbarItalic: get_style('nbarItalic'),
        nbarFsize: get_style('nbarFsize'),
        nbarBgHi: get_style('nbarBgHi'),
        nbarFgHi: get_style('nbarFgHi'),
    });
    remove_form('theme-menu-form');
}

function on_nbarBold(element) {
    let bold = element.checked;
    set_style('nbarBold', bold?'bold':'normal');
}

function on_nbarItalic(element) {
    let italic = element.checked;
    set_style('nbarItalic', italic?'italic':'normal');
}

function on_nbarFsize(element) {
    set_style('nbarFsize', element.value);
}

function on_nbarBgHi(element) {
    set_style('nbarBgHi', element.value);
}

function on_nbarFgHi(element) {
    set_style('nbarFgHi', element.value);
}

