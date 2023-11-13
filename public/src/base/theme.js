
function on_theme_selected(themename) {
    alert("navbar_theme_selected");
}


function styles_to_theme() {

    return {
        theme: get_style('theme'),
        font: get_style('font'),
        left: get_style('left'),
        width: get_style('width'),
        vGap: get_style('vGap'),
        radius: get_style('radius'),
        linkFg: get_style('linkFg'),
        appBg: get_style('appBg'),
        barsBg: get_style('barsBg'),
        barsFg: get_style('barsFg'),
        barsBorder: get_style('barsBorder'),
        barsShadow: get_style('barsShadow'),
        tbarH: get_style('tbarH'),
        tbarBold: get_style('tbarBold'),
        tbarItalic: get_style('tbarItalic'),
        tbarFsize: get_style('tbarFsize'),
        nbarH: get_style('nbarH'),
        nbarBold: get_style('nbarBold'),
        nbarItalic: get_style('nbarItalic'),
        nbarFsize: get_style('nbarFsize'),
        nbarBgHi: get_style('nbarBgHi'),
        nbarFgHi: get_style('nbarFgHi'),
        fbarH: get_style('fbarH'),
        fbarBold: get_style('fbarBold'),
        fbarItalic: get_style('fbarItalic'),
        fbarFsize: get_style('fbarFsize'),
        contBg: get_style('contBg'),
        contFg: get_style('contFg'),
        contW: get_style('contW'),
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
    };
}


function theme_to_styles(theme) {

    set_style('theme', theme.theme);
    set_style('font', theme.font);
    set_style('left', theme.left);
    set_style('width', theme.width);
    set_style('vGap', theme.vGap);
    set_style('radius', theme.radius);
    set_style('linkFg', theme.linkFg);
    set_style('appBg', theme.appBg);
    set_style('barsBg', theme.barsBg);
    set_style('barsFg', theme.barsFg);
    set_style('barsBorder', theme.barsBorder);
    set_style('barsShadow', theme.barsShadow);
    set_style('tbarH', theme.tbarH);
    set_style('tbarBold', theme.tbarBold);
    set_style('tbarItalic', theme.tbarItalic);
    set_style('tbarFsize', theme.tbarFsize);
    set_style('nbarH', theme.nbarH);
    set_style('nbarBold', theme.nbarBold);
    set_style('nbarItalic', theme.nbarItalic);
    set_style('nbarFsize', theme.nbarFsize);
    set_style('nbarBgHi', theme.nbarBgHi);
    set_style('nbarFgHi', theme.nbarFgHi);
    set_style('fbarH', theme.fbarH);
    set_style('fbarBold', theme.fbarBold);
    set_style('fbarItalic', theme.fbarItalic);
    set_style('fbarFsize', theme.fbarFsize);
    set_style('contBg', theme.contBg);
    set_style('contFg', theme.contFg);
    set_style('contW', theme.contW);
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

}