
function adt_theme_buttons() {

    server('adt_theme_buttons', {
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

function atb_close() {
    server('update_theme_buttons', {
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

function atb_btnh(element) {
    let v = parseInt(element.value);
    set_style('btnH', v + 'em');
}

function atb_btnBold(element) {
    let v = element.checked;
    set_style('btnBold', v?'bold':'italic');
}

function atb_btnItalic(element) {
    let v = element.checked;
    set_style('btnItalic', v?'italic':'normal');
}

function atb_btnfsize(element) {
    let v = element.value;
    set_style('btnFsize', v);
}

function atb_btnShadow(element) {
    let v = element.checked;
    set_style('btnShadow', v?'1':'0');
}

function atb_btnbg(element) {
    let v = element.value;
    set_style('btnBg', v);
}

function atb_btnfg(element) {
    let v = element.value;
    set_style('btnFg', v);
}

function atb_btnbghi(element) {
    let v = element.value;
    set_style('btnBgHi', v);
}

function atb_btnfghi(element) {
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

