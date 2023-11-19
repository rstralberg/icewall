
function on_mark() {

    if( is_valid(document.querySelector('#theme-mark-form') )) return;

    server('themes/mark', {
        theme: get_style('theme'),
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

function close_mark() {
    server('themes/mark_upd', {
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


function on_markBold(element) {
    let v = element.checked;
    set_style('markBold', v?'bold':'italic');
}

function on_markItalic(element) {
    let v = element.checked;
    set_style('markItalic', v?'italic':'normal');
}

function on_markFsize(element) {
    let v = element.value;
    set_style('markFsize', v );
}

function on_markShadow(element) {
    let v = element.checked;
    set_style('markShadow', v?'1':'0');
}

function on_markBg(element) {
    let v = element.value;
    set_style('markBg', v);
}

function on_markFg(element) {
    let v = element.value;
    set_style('markFg', v);
}

function on_markBorderColor(element) {
    let border = split_border(get_style('markBorder'));
    border.color = element.value;
    set_style('markBorder', build_border(border));
}

function on_markBorderWidth(element) {
    let border = split_border(get_style('markBorder'));
    border.width = parseInt(element.value);
    set_style('markBorder', build_border(border));
}

