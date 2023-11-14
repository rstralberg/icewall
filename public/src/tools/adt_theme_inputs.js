
function adt_theme_inputs() {

    server('adt_theme_inputs', {
        inpH: get_style('inpH'),
        inpBg: get_style('inpBg'),
        inpFg: get_style('inpFg'),
        inpBgHi: get_style('inpBgHi'),
        inpFgHi: get_style('inpFgHi'),
        inpBgDis: get_style('inpBgDis'),
        inpFgDis: get_style('inpFgDis'),
        inpBold: get_style('inpBold'),
        inpItalic: get_style('inpItalic'),
        inpFsize: get_style('inpFsize'),
        inpShadow: get_style('inpShadow'),
        inpBorder: get_style('inpBorder')
    }).then(
        (resolve) => {
            add_form('theme-inputs-form', resolve);
        }
    )
}

function ati_close() {
    server('update_theme_inputs', {
        theme: get_style('theme'),
        inpH: get_style('inpH'),
        inpBg: get_style('inpBg'),
        inpFg: get_style('inpFg'),
        inpBgHi: get_style('inpBgHi'),
        inpFgHi: get_style('inpFgHi'),
        inpBgDis: get_style('inpBgDis'),
        inpFgDis: get_style('inpFgDis'),
        inpBold: get_style('inpBold'),
        inpItalic: get_style('inpItalic'),
        inpFsize: get_style('inpFsize'),
        inpShadow: get_style('inpShadow'),
        inpBorder: get_style('inpBorder')
    });
    remove_form('theme-inputs-form');
}

function ati_inph(element) {
    let v = parseInt(element.value);
    set_style('inpH', v + 'em');
}

function ati_inpBold(element) {
    let v = element.checked;
    set_style('inpBold', v ? 'bold' : 'italic');
}

function ati_inpItalic(element) {
    let v = element.checked;
    set_style('inpItalic', v ? 'italic' : 'normal');
}

function ati_inpfsize(element) {
    let v = element.value;
    set_style('inpFSize', v);
}

function ati_inpShadow(element) {
    let v = element.checked;
    set_style('inpShadow', v ? '1' : '0');
}

function ati_inpbg(element) {
    let v = element.value;
    set_style('inpBg', v);
}

function ati_inpfg(element) {
    let v = element.value;
    set_style('inpFg', v);
}

function ati_inpbghi(element) {
    let v = element.value;
    set_style('inpBgHi', v);
}

function ati_inpfghi(element) {
    let v = element.value;
    set_style('inpFgHi', v);
}

function ati_inpbgdis(element) {
    let v = element.value;
    set_style('inpBgDis', v);
}

function ati_inpfgdis(element) {
    let v = element.value;
    set_style('inpFgDis', v);
}

function ati_bordercolor(element) {
    let border = split_border(get_style('inpBorder'));
    border.color = element.value;
    set_style('inpBorder', build_border(border));
}

function ati_borderwidth(element) {
    let border = split_border(get_style('inpBorder'));
    border.width = parseInt(element.value);
    set_style('inpBorder', build_border(border));
}

