
function th_menu() {

    if( is_valid(document.querySelector('#theme-menu-form') )) return;

    server('th/th_menu', {
        nbarH: get_style('nbarH'),
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

function atm_close() {
    server('update_theme_menu', {
        theme: get_style('theme'),
        nbarH: get_style('nbarH'),
        nbarBold: get_style('nbarBold'),
        nbarItalic: get_style('nbarItalic'),
        nbarFsize: get_style('nbarFsize'),
        nbarBgHi: get_style('nbarBgHi'),
        nbarFgHi: get_style('nbarFgHi'),
    });
    remove_form('theme-menu-form');
}

function atm_nbarh(element) {
    let h = parseInt(element.value);
    set_style('nbarH', h + 'vh');
}

function atm_nbarBold(element) {
    let bold = element.checked;
    set_style('nbarBold', bold?'bold':'normal');
}

function atm_tbarItalic(element) {
    let italic = element.checked;
    set_style('nbarItalic', italic?'italic':'normal');
}

function atm_nbarfsize(element) {
    set_style('nbarFsize', element.value);
}

function atm_nbarbghi(element) {
    set_style('nbarBgHi', element.value);
}

function atm_nbarfghi(element) {
    set_style('nbarFgHi', element.value);
}

