
function adt_theme_footer() {

    server('adt_theme_footer', {
        fbarH: get_style('fbarH'),
        fbarBold: get_style('fbarBold'),
        fbarItalic: get_style('fbarItalic'),
        fbarFsize: get_style('fbarFsize')
    }).then(
        (resolve) => {
            add_form('theme-footer-form', resolve);
        }
    )
}

function atf_close() {
    server('update_theme_footer', {
        theme: get_style('theme'),
        fbarH: get_style('fbarH'),
        fbarBold: get_style('fbarBold'),
        fbarItalic: get_style('fbarItalic'),
        fbarFsize: get_style('fbarFsize')
    });
    remove_form('theme-footer-form');
}

function atf_fbarh(element) {
    let h = parseInt(element.value);
    set_style('fbarH', h + 'vh');
}

function atf_fbarBold(element) {
    let bold = element.checked;
    set_style('fbarBold', bold?'bold':'normal');
}

function atf_fbarItalic(element) {
    let italic = element.checked;
    set_style('fbarItalic', italic?'italic':'normal');
}

function atf_fbarfsize(element) {
    set_style('fbarFsize', element.value);
}
