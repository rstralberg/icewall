
function th_general() {

    if( is_valid(document.querySelector('#theme-general-form') )) return;

    server('th/th_general', {
        font: get_style('font'), 
        left: get_style('left'), 
        width: get_style('width'), 
        vGap: get_style('vGap'), 
        radius: get_style('radius'), 
        linkFg: get_style('linkFg'), 
        appBg: get_style('appBg'),
    }).then(
        (resolve) => {
            add_form('theme-general-form', resolve);
        }
    )
}

function atg_close() {
    server('update_theme_general', {
        theme: get_style('theme'),
        font: get_style('font'), 
        left: get_style('left'), 
        width: get_style('width'), 
        vGap: get_style('vGap'), 
        radius: get_style('radius'), 
        linkFg: get_style('linkFg'), 
        appBg: get_style('appBg'),
    });
    remove_form('theme-general-form');
}

function atg_left(element) {
    let left = parseInt(element.value);
    set_style('left', left + 'vw');
}

function atg_width(element) {
    let width = parseInt(element.value);
    set_style('width', width + 'vw');
}

function atg_vgap(element) {
    let vgap = parseInt(element.value);
    set_style('vGap', vgap + 'vh');
}

function atg_radius(element) {
    let radius = parseInt(element.value);
    set_style('radius', radius + 'px');
}

function atg_linkfg(element) {
    set_style('linkFg', element.value);
}

function atg_appbg(element) {
    set_style('appBg', element.value);
}

