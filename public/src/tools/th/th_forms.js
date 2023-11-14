
function th_forms() {

    if( is_valid(document.querySelector('#theme-form-form') )) return;

    server('th/th_forms', {
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

function ato_close() {
    server('update_theme_forms', {
        theme: get_style('theme'),
        formBg: get_style('formBg'),
        formFg: get_style('formFg'),
        formBorder: get_style('formBorder'),
        formShadow: get_style('formShadow')
    });
    remove_form('theme-form-form');
}

function ato_borderwidth(element) {
    let border = split_border(get_style('formBorder'));
    border.width = parseInt(element.value);
    set_style('formBorder', build_border(border));
}

function ato_bordercolor(element) {
    let border = split_border(get_style('formBorder'));
    border.color = element.value;
    set_style('formBorder', build_border(border));
}

function ato_bg(element) {
    set_style('formBg', element.value);
}
function ato_fg(element) {
    set_style('formFg', element.value);
}

function ato_shadow(element) {
    set_style('formShadow', element.checked? '1': '0');
}

