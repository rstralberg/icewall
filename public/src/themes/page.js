
function on_page_theme() {

    if( is_valid(document.querySelector('#theme-page-form') )) return;
    

    server('themes/page', {
        contentW: get_style('contentW'),
        contentD: get_style('contentD'),
        contBg: get_style('contBg'),
        contFg: get_style('contFg'),
        contBorder: get_style('contBorder'),
        contShadow: get_style('contShadow'),
        markBg: get_style('markBg'),
        markFg: get_style('markFg'),
        markBorder: get_style('markBorder'),
        markShadow: get_style('markShadow'),
        markFsize: get_style('markFsize'),
        markBold: get_style('markBold'),
        markItalic: get_style('markItali'),
    }).then(
        (resolve) => {
            add_form('theme-page-form', resolve);
        }
    )
}

function close_page_theme() {
    server('themes/page_upd', {
        pageid: get_session_page().id,
        contentW: get_style('contentW'),
        contentD: get_style('contentD'),
        contBg: get_style('contBg'),
        contFg: get_style('contFg'),
        contBorder: get_style('contBorder'),
        contShadow: get_style('contShadow'),
        markBg: get_style('markBg'),
        markFg: get_style('markFg'),
        markBorder: get_style('markBorder'),
        markShadow: get_style('markShadow'),
        markFsize: get_style('markFsize'),
        markBold: get_style('markBold'),
        markItalic: get_style('markItalic'),
    });
    remove_form('theme-page-form');
}

function on_contentW(element) {
    let v = element.value;
    set_style('contentW', parseInt(v) + 'vw');
}

function on_contentD(element) {
    let v = element.value;
    set_style('contentD', parseInt(v) + 'vh');
}

function on_contBg(element) {
    let v = element.value;
    set_style('contBg', v);
}

function on_contFg(element) {
    let v = element.value;
    set_style('contFg', v);
}

function on_page_border_color(element) {
    let border = split_border(get_style('contBorder'));
    border.color = element.value;
    set_style('contBorder', build_border(border));
}

function on_page_border_width(element) {
    let border = split_border(get_style('contBorder'));
    border.width = parseInt(element.value);
    set_style('contBorder', build_border(border));
}

function on_page_shadow(element) {
    let v = element.value;
    set_style('contShadow', v ? '1': '0');
}

function on_markBg(element) {
    let v = element.value;
    set_style('markBg', v);
}

function on_markFg(element) {
    let v = element.value;
    set_style('markFg', v);
}

function on_mark_border_color(element) {
    let border = split_border(get_style('markBorder'));
    border.color = element.value
    set_style('markBorder', build_border(border));
}

function on_mark_border_width(element) {
    let border = split_border(get_style('markBorder'));
    border.width = parseInt(element.value);
    set_style('markBorder', build_border(border));
}

function on_mark_shadow(element) {
    let v = element.value;
    set_style('markShadow', v ? '1' : '0');
}

function on_markFsize(element) {
    let v = element.value;
    set_style('markFsize', v);
}

function on_mark_bold(element) {
    let v = element.value;
    set_style('markBold', v ? 'bold' : 'normal');
}

function on_mark_italic(element) {
    let v = element.value;
    set_style('markItalic', v ? 'italic' : 'normal');
}

