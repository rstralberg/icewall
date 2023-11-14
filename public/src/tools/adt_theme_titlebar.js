
function adt_theme_titlebar() {

    server('adt_theme_titlebar', {
        tbarH: get_style('tbarH'),
        tbarBold: get_style('tbarBold'),
        tbarItalic: get_style('tbarItalic'),
        tbarFsize: get_style('tbarFsize')
    }).then(
        (resolve) => {
            add_form('theme-titlebar-form', resolve);
        }
    )
}

function att_close() {
    server('update_theme_titlebar', {
        theme: get_style('theme'),
        tbarH: get_style('tbarH'),
        tbarBold: get_style('tbarBold'),
        tbarItalic: get_style('tbarItalic'),
        tbarFsize: get_style('tbarFsize')
    });
    remove_form('theme-titlebar-form');
}

function att_tbarh(element) {
    let h = element.value;
    set_style('tbarH', h + 'vh');
}

function att_tbarBold(element) {
    let bold = element.checked;
    set_style('tbarBold', bold?'bold':'normal');
}

function att_tbarItalic(element) {
    let bold = element.checked;
    set_style('tbarItalic', bold?'italic':'normal');
}

function att_tbarfsize(element) {
    let size = element.value;
    set_style('tbarFsize', size );

}
