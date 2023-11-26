
function on_footer() {

    if( is_valid(document.querySelector('#theme-footer-form') )) return;

    server('themes/footer', {
        theme: get_style('theme'),
        fbarBold: get_style('fbarBold'),
        fbarItalic: get_style('fbarItalic'),
        fbarFsize: get_style('fbarFsize')
    }).then(
        (resolve) => {
            add_form('theme-footer-form', resolve);
        }
    )
}

function close_footer() {
    server('themes/footer_upd', {
        theme: get_style('theme'),
        fbarBold: get_style('fbarBold'),
        fbarItalic: get_style('fbarItalic'),
        fbarFsize: get_style('fbarFsize')
    });
    remove_form('theme-footer-form');
}

function on_fbarBold(element) {
    let bold = element.checked;
    set_style('fbarBold', bold?'bold':'normal');
}

function on_fbarItalic(element) {
    let italic = element.checked;
    set_style('fbarItalic', italic?'italic':'normal');
}

function on_fbarFsize(element) {
    set_style('fbarFsize', element.value);
}
