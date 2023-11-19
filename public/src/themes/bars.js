
function on_bars() {

    if( is_valid(document.getElementById('theme-bars-form') )) return;

    server('themes/bars', {
        theme: get_style('theme'),
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

function on_barsBg(element) {
    set_style('barsBg', element.value);
}

function on_barsFg(element) {
    set_style('barsFg', element.value);
}

function on_barsBorderColor(element) {
    let border = split_border(get_style('barsBorder'));
    border.color = element.value;
    set_style('barsBorder',build_border(border));
}

function on_barsBorderWidth(element) {
    let border = split_border(get_style('barsBorder'));
    border.width = parseInt(element.value);
    set_style('barsBorder',build_border(border));
}

function on_barsShadow(element) {
    set_style('barsShadow', element.checked ? '1' : '0');
}

function close_bars() {
    server('themes/bars_upd', {
        theme: get_style('theme'),
        barsBg: get_style('barsBg'),
        barsFg: get_style('barsFg'),
        barsBorder: get_style('barsBorder'),
        barsShadow: get_style('barsShadow')
    });
    remove_form('theme-bars-form');
}