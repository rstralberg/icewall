
function on_content() {
    if( is_valid(document.querySelector('#theme-content-form') )) return;

    server('themes/content', {
        theme: get_style('theme'),
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

function close_content() {
    server('themes/content_upd', {
        theme: get_style('theme'),
        contBg: get_style('contBg'),
        contFg: get_style('contFg'),
        contBorder: get_style('contBorder'),
        contShadow: get_style('contShadow')
    });
    remove_form('theme-content-form');
}

function on_contentBorderWidth(element) {
    let border = split_border(get_style('contBorder'));
    border.width = parseInt(element.value);
    set_style('contBorder', build_border(border));
}

function on_contentBorderColor(element) {
    let border = split_border(get_style('contBorder'));
    border.color = element.value;
    set_style('contBorder', build_border(border));
}

function on_contentBg(element) {
    set_style('contBg', element.value);
}
function on_contentFg(element) {
    set_style('contFg', element.value);
}

function on_contentShadow(element) {
    set_style('contShadow', element.checked? '1': '0');
}

