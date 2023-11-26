
function on_forms() {

    if( is_valid(document.querySelector('#theme-form-form') )) return;

    server('themes/forms', {
        theme: get_style('theme'),
        formBg: get_style('formBg'),
        formFg: get_style('formFg'),
        formBorder: get_style('formBorder'),
        formShadow: get_style('formShadow')
    }).then(
        (resolve) => {
            add_form('theme-form-form', resolve);
        }
    )
}

function close_forms() {
    server('themes/forms_upd', {
        theme: get_style('theme'),
        formBg: get_style('formBg'),
        formFg: get_style('formFg'),
        formBorder: get_style('formBorder'),
        formShadow: get_style('formShadow')
    });
    remove_form('theme-form-form');
}

function on_formBorderWidth(element) {
    let border = split_border(get_style('formBorder'));
    border.width = parseInt(element.value);
    set_style('formBorder', build_border(border));
}

function on_borderBorderColor(element) {
    let border = split_border(get_style('formBorder'));
    border.color = element.value;
    set_style('formBorder', build_border(border));
}

function on_formBg(element) {
    set_style('formBg', element.value);
}
function on_formFg(element) {
    set_style('formFg', element.value);
}

function on_formShadow(element) {
    set_style('formShadow', element.checked? '1': '0');
}

