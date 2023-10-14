
function saveTheme() {

    let theme = {
        name: get_style('name'),
        appBg: get_style('appBg'),
        appFg: get_style('appFg'),
        appFont: get_style('appFont'),
        appFsize: get_style('appFsize'),
        appWidth: get_style('appWidth'),
        appRadius: get_style('appRadius'),
        appFolder: get_style('appFolder'),
        editBg: get_style('editBg'),
        editFg: get_style('editFg'),
        editActBg: get_style('editActBg'),
        editActFg: get_style('editActFg'),
        editBdFg: get_style('editBdFg'),
        editBdW: get_style('editBdW'),
        toolBg: get_style('toolBg'),
        toolFg: get_style('toolFg'),
        toolActBg: get_style('toolActBg'),
        toolActFg: get_style('toolActFg'),
        toolBdFg: get_style('toolBdFg'),
        toolBdW: get_style('toolBdW'),
        toolShadow: get_style('toolShadow'),
        titleBg: get_style('titleBg'),
        titleFg: get_style('titleFg'),
        titleBdFg: get_style('titleBdFg'),
        titleBdW: get_style('titleBdW'),
        titleShadow: get_style('titleShadow'),
        barBg: get_style('barBg'),
        barFg: get_style('barFg'),
        barActBg: get_style('barActBg'),
        barActFg: get_style('barActFg'),
        barBdFg: get_style('barBdFg'),
        barBdW: get_style('barBdW'),
        barShadow: get_style('barShadow'),
        contentBg: get_style('contentBg'),
        contentFg: get_style('contentFg'),
        contentActBg: get_style('contentActBg'),
        contentActFg: get_style('contentActFg'),
        contentBdFg: get_style('contentBdFg'),
        contentBdW: get_style('contentBdW'),
        contentShadow: get_style('contentShadow'),
        formBg: get_style('formBg'),
        formFg: get_style('formFg'),
        formBdFg: get_style('formBdFg'),
        formBdW: get_style('formBdW'),
        formShadow: get_style('formShadow'),
        btnBg: get_style('btnBg'),
        btnFg: get_style('btnFg'),
        btnActBg: get_style('btnActBg'),
        btnActFg: get_style('btnActFg'),
        btnBdFg: get_style('btnBdFg'),
        btnBdW: get_style('btnBdW'),
        btnShadow: get_style('btnShadow'),
        inpBg: get_style('inpBg'),
        inpFg: get_style('inpFg'),
        inpActBg: get_style('inpActBg'),
        inpActFg: get_style('inpActFg'),
        inpBdFg: get_style('inpBdFg'),
        inpBdW: get_style('inpBdW'),
        inpShadow: get_style('inpShadow'),
        linkBg: get_style('linkBg'),
        linkFg: get_style('linkFg'),
        linkActBg: get_style('linkActBg'),
        linkActFg: get_style('linkActFg'),
    };
    saveTheme( theme);

}

function loadTheme(themeName) {

    getTheme(themeName).then( (resolve) => 
    {
        set_style('appBg', resolve.appBg);
        set_style('appFg', resolve.appFg);
        set_style('appFont', resolve.appFont);
        set_style('appFsize', resolve.appFsize);
        set_style('appWidth', resolve.appWidth);
        set_style('appRadius', resolve.appRadius);
        set_style('appFolder', resolve.appFolder);
        set_style('editBg', resolve.editBg);
        set_style('editFg', resolve.editFg);
        set_style('editActBg', resolve.editActBg);
        set_style('editActFg', resolve.editActFg);
        set_style('editBdFg', resolve.editBdFg);
        set_style('editBdW', resolve.editBdW);
        set_style('toolBg', resolve.toolBg);
        set_style('toolFg', resolve.toolFg);
        set_style('toolActBg', resolve.toolActBg);
        set_style('toolActFg', resolve.toolActFg);
        set_style('toolBdFg', resolve.toolBdFg);
        set_style('toolBdW', resolve.toolBdW);
        set_style('toolShadow', resolve.toolShadow);
        set_style('titleBg', resolve.titleBg);
        set_style('titleFg', resolve.titleFg);
        set_style('titleBdFg', resolve.titleBdFg);
        set_style('titleBdW', resolve.titleBdW);
        set_style('titleShadow', resolve.titleShadow);
        set_style('barBg', resolve.barBg);
        set_style('barFg', resolve.barFg);
        set_style('barActBg', resolve.barActBg);
        set_style('barActFg', resolve.barActFg);
        set_style('barBdFg', resolve.barBdFg);
        set_style('barBdW', resolve.barBdW);
        set_style('barShadow', resolve.barShadow);
        set_style('contentBg', resolve.contentBg);
        set_style('contentFg', resolve.contentFg);
        set_style('contentActBg', resolve.contentActBg);
        set_style('contentActFg', resolve.contentActFg);
        set_style('contentBdFg', resolve.contentBdFg);
        set_style('contentBdW', resolve.contentBdW);
        set_style('contentShadow', resolve.contentShadow);
        set_style('formBg', resolve.formBg);
        set_style('formFg', resolve.formFg);
        set_style('formBdFg', resolve.formBdFg);
        set_style('formBdW', resolve.formBdW);
        set_style('formShadow', resolve.formShadow);
        set_style('btnBg', resolve.btnBg);
        set_style('btnFg', resolve.btnFg);
        set_style('btnActBg', resolve.btnActBg);
        set_style('btnActFg', resolve.btnActFg);
        set_style('btnBdFg', resolve.btnBdFg);
        set_style('btnBdW', resolve.btnBdW);
        set_style('btnShadow', resolve.btnShadow);
        set_style('inpBg', resolve.inpBg);
        set_style('inpFg', resolve.inpFg);
        set_style('inpActBg', resolve.inpActBg);
        set_style('inpActFg', resolve.inpActFg);
        set_style('inpBdFg', resolve.inpBdFg);
        set_style('inpBdW', resolve.inpBdW);
        set_style('inpShadow', resolve.inpShadow);
        set_style('linkBg', resolve.linkBg);
        set_style('linkFg', resolve.linkFg);
        set_style('linkActBg', resolve.linkActBg);
        set_style('linkActFg', resolve.linkActFg);
    },
    (error) => {}
    )
}

