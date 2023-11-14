
function adt_theme_bars() {

    server('adt_theme_bars', {
        barsBg: get_style('barsBg'),
        barsFg: get_style('barsFg'),
        barsBorder: get_style('barsBorder'),
        barsShadow: get_style('barsShadow')
    }).then(
        (resolve) => {
            add_form('theme-bars-form', resolve);
        }
    )
}

function adt_theme_bars_bg(element) {
    set_style('barsBg', element.value);
}

function adt_theme_bars_fg(element) {
    set_style('barsFg', element.value);
}

function adt_theme_border_color(element) {
    let border = split_border(get_style('barsBorder'));
    border.color = element.value;
    set_style('barsBorder',build_border(border));
}

function adt_theme_borders_width(element) {
    let border = split_border(get_style('barsBorder'));
    border.width = parseInt(element.value);
    set_style('barsBorder',build_border(border));
}

function adt_theme_bars_shadow(element) {
    set_style('barsShadow', element.checked ? '1' : '0');
}

function adt_theme_bars_close() {
    server('update_theme_bars', {
        theme: get_style('theme'),
        barsBg: get_style('barsBg'),
        barsFg: get_style('barsFg'),
        barsBorder: get_style('barsBorder'),
        barsShadow: get_style('barsShadow')
    });
    remove_form('theme-bars-form');
}