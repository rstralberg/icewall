
function theme_selected(themename) {

    let cur_theme = get_style('theme');
    if (themename !== cur_theme) {
        server('themes/get_theme', {
            theme: themename
        }).then(
            (resolve) => {
                let theme = JSON.parse(resolve);
                theme_to_styles(theme);
                server('set_site_theme', {
                    theme: themename
                }).then(
                    () => { 
                        get_top_menu(); 
                    },
                    (reject) => {
                        error(reject);
                    }
                );
            },
            (reject) => {
                error(reject);
            }
        );
    }
}


function styles_to_theme() {

    return {
        name: get_style('theme'),
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
        appBg: get_style('appBg'),

        barsBg: get_style('barsBg'),
        barsFg: get_style('barsFg'),
        barsBorder: get_style('barsBorder'),
        barsShadow: get_style('barsShadow'),

        tbarBold: get_style('tbarBold'),
        tbarItalic: get_style('tbarItalic'),
        tbarFsize: get_style('tbarFsize'),

        nbarBold: get_style('nbarBold'),
        nbarItalic: get_style('nbarItalic'),
        nbarFsize: get_style('nbarFsize'),
        nbarBgHi: get_style('nbarBgHi'),
        nbarFgHi: get_style('nbarFgHi'),

        fbarBold: get_style('fbarBold'),
        fbarItalic: get_style('fbarItalic'),
        fbarFsize: get_style('fbarFsize'),

        contBg: get_style('contBg'),
        contFg: get_style('contFg'),
        contBorder: get_style('contBorder'),
        contShadow: get_style('contShadow'),

        formBg: get_style('formBg'),
        formFg: get_style('formFg'),
        formBorder: get_style('formBorder'),
        formShadow: get_style('formShadow'),

        btnH: get_style('btnH'),
        btnBg: get_style('btnBg'),
        btnFg: get_style('btnFg'),
        btnBgHi: get_style('btnBgHi'),
        btnFgHi: get_style('btnFgHi'),
        btnBgDis: get_style('btnBgDis'),
        btnFgDis: get_style('btnFgDis'),
        btnBold: get_style('btnBold'),
        btnItalic: get_style('btnItalic'),
        btnFsize: get_style('btnFsize'),
        btnShadow: get_style('btnShadow'),
        btnBorder: get_style('btnBorder'),

        inpH: get_style('inpH'),
        inpBg: get_style('inpBg'),
        inpFg: get_style('inpFg'),
        inpBgHi: get_style('inpBgHi'),
        inpFgHi: get_style('inpFgHi'),
        inpBgDis: get_style('inpBgDis'),
        inpFgDis: get_style('inpFgDis'),
        inpBold: get_style('inpBold'),
        inpItalic: get_style('inpItalic'),
        inpFsize: get_style('inpFsize'),
        inpShadow: get_style('inpShadow'),
        inpBorder: get_style('inpBorder'),

        markBg: get_style('markBg'),
        markFg: get_style('markFg'),
        markBorder: get_style('markBorder'),
        markShadow: get_style('markShadow'),
        markFsize: get_style('markFsize'),
        markBold: get_style('markBold'),
        markItalic: get_style('markItalic')

    };
}


function theme_to_styles(theme) {

    set_style('theme', theme.name);
    set_style('font', theme.font);

    set_style('headerT', theme.headerT);
    set_style('headerH', theme.headerH);
    set_style('footerB', theme.footerB);
    set_style('footerH', theme.footerH);
    set_style('titleH', theme.titleH);
    set_style('menuW', theme.menuW);
    set_style('infoW', theme.infoW);
    set_style('titleW', theme.titleW);
    set_style('contentW', theme.contentW);
    set_style('contentD', theme.contentD);

    set_style('radius', theme.radius);
    set_style('linkFg', theme.linkFg);
    set_style('appBg', theme.appBg);

    set_style('barsBg', theme.barsBg);
    set_style('barsFg', theme.barsFg);
    set_style('barsBorder', theme.barsBorder);
    set_style('barsShadow', theme.barsShadow);

    set_style('tbarBold', theme.tbarBold);
    set_style('tbarItalic', theme.tbarItalic);
    set_style('tbarFsize', theme.tbarFsize);

    set_style('nbarBold', theme.nbarBold);
    set_style('nbarItalic', theme.nbarItalic);
    set_style('nbarFsize', theme.nbarFsize);
    set_style('nbarBgHi', theme.nbarBgHi);
    set_style('nbarFgHi', theme.nbarFgHi);

    set_style('fbarBold', theme.fbarBold);
    set_style('fbarItalic', theme.fbarItalic);
    set_style('fbarFsize', theme.fbarFsize);

    set_style('contBg', theme.contBg);
    set_style('contFg', theme.contFg);
    set_style('contBorder', theme.contBorder);
    set_style('contShadow', theme.contShadow);

    set_style('formBg', theme.formBg);
    set_style('formFg', theme.formFg);
    set_style('formBorder', theme.formBorder);
    set_style('formShadow', theme.formShadow);

    set_style('btnH', theme.btnH);
    set_style('btnBg', theme.btnBg);
    set_style('btnFg', theme.btnFg);
    set_style('btnBgHi', theme.btnBgHi);
    set_style('btnFgHi', theme.btnFgHi);
    set_style('btnBgDis', theme.btnBgDis);
    set_style('btnFgDis', theme.btnFgDis);
    set_style('btnBold', theme.btnBold);
    set_style('btnItalic', theme.btnItalic);
    set_style('btnFsize', theme.btnFsize);
    set_style('btnShadow', theme.btnShadow);
    set_style('btnBorder', theme.btnBorder);

    set_style('inpH', theme.inpH);
    set_style('inpBg', theme.inpBg);
    set_style('inpFg', theme.inpFg);
    set_style('inpBgHi', theme.inpBgHi);
    set_style('inpFgHi', theme.inpFgHi);
    set_style('inpBgDis', theme.inpBgDis);
    set_style('inpFgDis', theme.inpFgDis);
    set_style('inpBold', theme.inpBold);
    set_style('inpItalic', theme.inpItalic);
    set_style('inpFsize', theme.inpFsize);
    set_style('inpShadow', theme.inpShadow);
    set_style('inpBorder', theme.inpBorder);

    set_style('markBg', theme.markBg);
    set_style('markFg', theme.markFg);
    set_style('markBorder', theme.markBorder);
    set_style('markShadow', theme.markShadow);
    set_style('markFsize', theme.markFsize);
    set_style('markBold', theme.markBold);
    set_style('markItalic', theme.markItali);

}