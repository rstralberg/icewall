
function th_mark() {

    if( is_valid(document.querySelector('#theme-mark-form') )) return;

    server('th/th_mark', {
        markH: get_style('markH'),
        markBg: get_style('markBg'),
        markFg: get_style('markFg'),
        markBold: get_style('markBold'),
        markItalic: get_style('markItalic'),
        markFsize: get_style('markFsize'),
        markShadow: get_style('markShadow'),
        markBorder: get_style('markBorder')
    }).then(
        (resolve) => {
            add_form('theme-mark-form', resolve);
        }
    )
}

function th_mark_close() {
    server('update_theme_mark', {
        theme: get_style('theme'),
        markH: get_style('markH'),
        markBg: get_style('markBg'),
        markFg: get_style('markFg'),
        markBold: get_style('markBold'),
        markItalic: get_style('markItalic'),
        markFsize: get_style('markFsize'),
        markShadow: get_style('markShadow'),
        markBorder: get_style('markBorder')
    });
    remove_form('theme-mark-form');
}


function th_mark_bold(element) {
    let v = element.checked;
    set_style('markBold', v?'bold':'italic');
}

function th_mark_italic(element) {
    let v = element.checked;
    set_style('markItalic', v?'italic':'normal');
}

function th_mark_fontsize(element) {
    let v = element.value;
    set_style('markFsize', v );
}

function th_mark_shadow(element) {
    let v = element.checked;
    set_style('markShadow', v?'1':'0');
}

function th_mark_bg(element) {
    let v = element.value;
    set_style('markBg', v);
}

function th_mark_fg(element) {
    let v = element.value;
    set_style('markFg', v);
}

function th_mark_border_color(element) {
    let border = split_border(get_style('markBorder'));
    border.color = element.value;
    set_style('markBorder', build_border(border));
}

function th_mark_border_width(element) {
    let border = split_border(get_style('markBorder'));
    border.width = parseInt(element.value);
    set_style('markBorder', build_border(border));
}

