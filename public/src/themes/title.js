
function on_titlebar() {

    if( is_valid(document.querySelector('#theme-titlebar-form') )) return;

    server('themes/title', {
        theme: get_style('theme'),
        tbarDisplay: get_style('tbarDisplay'),
        tbarBold: get_style('tbarBold'),
        tbarItalic: get_style('tbarItalic'),
        tbarFsize: get_style('tbarFsize')
    }).then(
        (resolve) => {
            add_form('theme-titlebar-form', resolve);
        }
    )
}

function close_tbar() {
    server('themes/title_upd', {
        theme: get_style('theme'),
        tbarDisplay: get_style('tbarDisplay'),
        tbarBold: get_style('tbarBold'),
        tbarItalic: get_style('tbarItalic'),
        tbarFsize: get_style('tbarFsize')
    });
    remove_form('theme-titlebar-form');
}

function on_tbarDisplay(element) {
    set_style('tbarDisplay', element.checked ? 'block': 'none');
}

function on_tbarBold(element) {
    let bold = element.checked;
    set_style('tbarBold', bold?'bold':'normal');
}

function on_tbarItalic(element) {
    let bold = element.checked;
    set_style('tbarItalic', bold?'italic':'normal');
}

function on_tbarFsize(element) {
    let size = element.value;
    set_style('tbarFsize', size );
}
