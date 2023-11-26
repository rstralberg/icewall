
function on_general() {

    if( is_valid(document.getElementById('theme-general-form') )) return;

    server('themes/general', {
        theme: get_style('theme'),
        font: get_style('font'),
        headerT: get_style('headerT'),
        headerH: get_style('headerH'),
        footerB: get_style('footerB'),
        footerH: get_style('footerH'),
        titleH: get_style('titleH'),
        menuW: get_style('menuW'),
        infoW: get_style('infoW'),
        titleW: get_style('titleW'),
        contentW: get_style('contentW'),
        contentD: get_style('contentD'),
        radius: get_style('radius'),
        linkFg: get_style('linkFg'),
        appBg: get_style('appBg')
    }).then(
        (resolve) => {
            add_form('theme-general-form', resolve);
        }
    )
}

function close_general() {
    server('themes/general_upd', {
        theme: get_style('theme'),
        font: get_style('font'),
        headerT: get_style('headerT'),
        headerH: get_style('headerH'),
        footerB: get_style('footerB'),
        footerH: get_style('footerH'),
        titleH: get_style('titleH'),
        menuW: get_style('menuW'),
        infoW: get_style('infoW'),
        titleW: get_style('titleW'),
        contentW: get_style('contentW'),
        contentD: get_style('contentD'),
        radius: get_style('radius'),
        linkFg: get_style('linkFg'),
        appBg: get_style('appBg')
    }).then(
        () => {},
        (reject) => { error(reject); }
    );
    remove_form('theme-general-form');
}

function on_headerT(element) {
    let value = element.value;
    set_style('headerT', value + 'vh');
}

function on_headerH(element) {
    let value = element.value;
    set_style('headerH', value + 'vh');
}

function on_footerB(element) {
    let value = element.value;
    set_style('footerB', value + 'vh');
}

function on_footerH(element) {
    let value = element.value;
    set_style('footerH', value + 'vh');
}

function on_titleH(element) {
    let value = element.value;
    set_style('titleH', value + 'vh');
}

function on_titleW(element) {
    let value = element.value;
    set_style('titleW', value + 'vw');
}

function on_menuW(element) {
    let value = element.value;
    set_style('menuW', value + 'vw');
}

function on_infoW(element) {
    let value = element.value;
    set_style('infoW', value + 'vw');
}

function on_contentW(element) {
    let value = element.value;
    set_style('contentW', value + 'vw');
}

function on_contentD(element) {
    let value = element.value;
    set_style('contentD', value + 'vh');
}

function on_radius(element) {
    let value = element.value;
    set_style('radius', value + 'px');
}

function on_linkFg(element) {
    let value = element.value;
    set_style('linkFg', value );
}

function on_appBg(element) {
    let value = element.value;
    set_style('appBg', value );
}
