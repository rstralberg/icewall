
function on_inputs() {

    if( is_valid(document.querySelector('#theme-inputs-form') )) return;

    server('themes/inputs', {
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
    }).then(
        (resolve) => {
            add_form('theme-inputs-form', resolve);
        }
    )
}

function close_inputs() {
    server('themes/inputs_upd', {
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

function on_inpH(element) {
    let v = parseInt(element.value);
    set_style('inpH', v + 'em');
}

function on_inpBold(element) {
    let v = element.checked;
    set_style('inpBold', v ? 'bold' : 'italic');
}

function on_inpItalic(element) {
    let v = element.checked;
    set_style('inpItalic', v ? 'italic' : 'normal');
}

function on_inpFsize(element) {
    let v = element.value;
    set_style('inpFSize', v);
}

function on_inpShadow(element) {
    let v = element.checked;
    set_style('inpShadow', v ? '1' : '0');
}

function on_inpBbg(element) {
    let v = element.value;
    set_style('inpBg', v);
}

function on_inpFg(element) {
    let v = element.value;
    set_style('inpFg', v);
}

function on_inpBgHi(element) {
    let v = element.value;
    set_style('inpBgHi', v);
}

function on_inpFgHi(element) {
    let v = element.value;
    set_style('inpFgHi', v);
}

function on_inpBgDis(element) {
    let v = element.value;
    set_style('inpBgDis', v);
}

function on_inpFgDis(element) {
    let v = element.value;
    set_style('inpFgDis', v);
}

function on_inpBorderColor(element) {
    let border = split_border(get_style('inpBorder'));
    border.color = element.value;
    set_style('inpBorder', build_border(border));
}

function on_inpBorderWidth(element) {
    let border = split_border(get_style('inpBorder'));
    border.width = parseInt(element.value);
    set_style('inpBorder', build_border(border));
}

