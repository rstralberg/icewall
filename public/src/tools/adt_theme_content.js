
function adt_theme_content() {

    server('adt_theme_content', {
        contBg: get_style('contBg'),
        contFg: get_style('contFg'),
        contBorder: get_style('contBorder'),
        contShadow: get_style('contShadow')
    }).then(
        (resolve) => {
            add_form('theme-content-form', resolve);
        }
    )
}

function atc_close() {
    server('update_theme_content', {
        theme: get_style('theme'),
        contBg: get_style('contBg'),
        contFg: get_style('contFg'),
        contBorder: get_style('contBorder'),
        contShadow: get_style('contShadow')
    });
    remove_form('theme-content-form');
}

function atc_borderwidth(element) {
    let border = split_border(get_style('contBorder'));
    border.width = parseInt(element.value);
    set_style('contBorder', build_border(border));
}

function atc_bordercolor(element) {
    let border = split_border(get_style('contBorder'));
    border.color = element.value;
    set_style('contBorder', build_border(border));
}

function atc_bg(element) {
    set_style('contBg', element.value);
}
function atc_fg(element) {
    set_style('contFg', element.value);
}

function atc_shadow(element) {
    set_style('contShadow', element.checked? '1': '0');
}

