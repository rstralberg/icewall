
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

function adt_theme_bars_close() {
    remove_form('theme-bars-form');
}