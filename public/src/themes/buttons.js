
function on_buttons() {

    if( is_valid(document.querySelector('#theme-buttons-form') )) return;

    server('themes/buttons', {
        theme: get_style('theme'),
        btnH: get_style('btnH'),
        btnBg: get_style('btnBg'),
        btnFg: get_style('btnFg'),
        btnBgHi: get_style('btnBgHi'),
        btnFgHi: get_style('btnFgHi'),
        btnBgDis: get_style('btnBgDis'),
        btnFgDis: get_style('btnFgDis'),
        btnBold: get_style('btnBold'),
        btnItalic: get_style('btnItalic'),
        btnFsize: get_style('btnFsize'),
        btnShadow: get_style('btnShadow'),
        btnBorder: get_style('btnBorder')
    }).then(
        (resolve) => {
            add_form('theme-buttons-form', resolve);
        }
    )
}

function close_buttons() {
    server('themes/buttons_upd', {
        theme: get_style('theme'),
        btnH: get_style('btnH'),
        btnBg: get_style('btnBg'),
        btnFg: get_style('btnFg'),
        btnBgHi: get_style('btnBgHi'),
        btnFgHi: get_style('btnFgHi'),
        btnBgDis: get_style('btnBgDis'),
        btnFgDis: get_style('btnFgDis'),
        btnBold: get_style('btnBold'),
        btnItalic: get_style('btnItalic'),
        btnFsize: get_style('btnFsize'),
        btnShadow: get_style('btnShadow'),
        btnBorder: get_style('btnBorder')
    });
    remove_form('theme-buttons-form');
}

function on_btnH(element) {
    let v = parseInt(element.value);
    set_style('btnH', v + 'em');
}

function on_btnBold(element) {
    let v = element.checked;
    set_style('btnBold', v?'bold':'italic');
}

function on_btnItalic(element) {
    let v = element.checked;
    set_style('btnItalic', v?'italic':'normal');
}

function on_btnFsize(element) {
    let v = element.value;
    set_style('btnFsize', v);
}

function on_btnShadow(element) {
    let v = element.checked;
    set_style('btnShadow', v?'1':'0');
}

function on_btnBg(element) {
    let v = element.value;
    set_style('btnBg', v);
}

function on_btnFg(element) {
    let v = element.value;
    set_style('btnFg', v);
}

function on_btnBgHi(element) {
    let v = element.value;
    set_style('btnBgHi', v);
}

function on_btnFgHi(element) {
    let v = element.value;
    set_style('btnFgHi', v);
}

function atb_btnbgdis(element) {
    let v = element.value;
    set_style('btnBgDis', v);
}

function atb_btnfgdis(element) {
    let v = element.value;
    set_style('btnFgDis', v);
}

function atb_bordercolor(element) {
    let border = split_border(get_style('btnBorder'));
    border.color = element.value;
    set_style('btnBorder', build_border(border));
}

function atb_borderwidth(element) {
    let border = split_border(get_style('btnBorder'));
    border.width = parseInt(element.value);
    set_style('btnBorder', build_border(border));
}

