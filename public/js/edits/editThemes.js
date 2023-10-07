const EDIT_THEME_CUR_PART = 'cur-part';
const EDIT_THEMES_THEME = 'editthemes-theme';
const EDIT_THEMES_PART = 'editthemes-part';
const EDIT_THEMES_BG = 'editthemes-bg';
const EDIT_THEMES_FG = 'editthemes-fg';
const EDIT_THEMES_ACT_BG = 'editthemes-act-bg';
const EDIT_THEMES_ACT_FG = 'editthemes-act-fg';
const EDIT_THEMES_BORDER_COLOR = 'editthemes-border-color';
const EDIT_THEMES_BORDER_SIZE = 'editthemes-border-size';
const EDIT_THEMES_FONTSIZE = 'editthemes-fontsize';
const EDIT_THEMES_APPWIDTH = 'editthemes-appwidth';
const EDIT_THEMES_ROUNDNESS = 'editthemes-roundness';
const EDIT_THEMES_FONT = 'editthemes-font';
const EDIT_THEMES_ICONSCOLOR = 'editthemes-iconscolor';
const EDIT_THEMES_SHADOW = 'editthemes-shadow';

var edThemeForm = '';
function onEditThemes() {
    if( edThemeForm.length > 0 ) return;
    webForm('editthemes'). 
    then( (formname) => { edThemeForm = formname; })
}

function editThemesEnable(items) {
    for (let i = 0; i < items.length; i++) {
        let element = document.getElementById(items[i]);
        element.removeAttribute('disabled');
    }
}

function editThemesDisable(items) {
    for (let i = 0; i < items.length; i++) {
        let element = document.getElementById(items[i]);
        element.setAttribute('disabled', '');
        if (element.getAttribute('type') === 'color') {
            element.value = '#202020';
            element.removeEventListener('input', (e) => { });
        }

    }
}

function editThemeApp(content) {

    //  Bg  Fg    Font    Fsize   Width   Radius  Folder
    editThemesEnable(
        [
            EDIT_THEMES_BG,
            EDIT_THEMES_FG,
            EDIT_THEMES_FONT,
            EDIT_THEMES_FONTSIZE,
            EDIT_THEMES_APPWIDTH,
            EDIT_THEMES_ROUNDNESS,
            EDIT_THEMES_ICONSCOLOR
        ]);

    editThemesDisable(
        [
            EDIT_THEMES_ACT_BG,
            EDIT_THEMES_ACT_FG,
            EDIT_THEMES_BORDER_COLOR,
            EDIT_THEMES_BORDER_SIZE,
            EDIT_THEMES_SHADOW
        ]);

    const part = 'app';
    document.getElementById(EDIT_THEMES_BG).value = get_style(part + 'Bg');
    document.getElementById(EDIT_THEMES_FG).value = get_style(part + 'Fg');
    selectOption(document.getElementById(EDIT_THEMES_FONT), get_style(part + 'Font'));
    document.getElementById(EDIT_THEMES_FONTSIZE).value = parseFloat(get_style(part + 'Fsize'));
    document.getElementById(EDIT_THEMES_APPWIDTH).value = parseInt(get_style(part + 'Width'));
    document.getElementById(EDIT_THEMES_ROUNDNESS).value = parseInt(get_style(part + 'Radius'));

    if (get_style(part + 'Folder') === 'icons/black')
        selectOption(document.getElementById(EDIT_THEMES_ICONSCOLOR),
            get_style(part + 'Folder') === 'icons/black' ? 'black' : 'white');

}

function editThemeEdit(content) {
    //  Bg  Fg  ActBg   ActFg   BdFg    BdW 
    editThemesEnable(
        [
            EDIT_THEMES_BG,
            EDIT_THEMES_FG,
            EDIT_THEMES_ACT_BG,
            EDIT_THEMES_ACT_FG,
            EDIT_THEMES_BORDER_COLOR,
            EDIT_THEMES_BORDER_SIZE
        ]);

    editThemesDisable(
        [
            EDIT_THEMES_FONTSIZE,
            EDIT_THEMES_APPWIDTH,
            EDIT_THEMES_ROUNDNESS,
            EDIT_THEMES_FONT,
            EDIT_THEMES_ICONSCOLOR,
            EDIT_THEMES_SHADOW
        ]);

    const part = 'edit';
    document.getElementById(EDIT_THEMES_BG).value = get_style(part + 'Bg');
    document.getElementById(EDIT_THEMES_FG).value = get_style(part + 'Fg');
    document.getElementById(EDIT_THEMES_ACT_BG).value = get_style(part + 'ActBg');
    document.getElementById(EDIT_THEMES_ACT_FG).value = get_style(part + 'ActFg');
    document.getElementById(EDIT_THEMES_BORDER_COLOR).value = get_style(part + 'BdFg');
    document.getElementById(EDIT_THEMES_BORDER_SIZE).value = get_style(part + 'BdW');
}

function editThemeTool(content) {
    // Bg  Fg  ActBg   ActFg   BdFg    BdW Shadow  
    editThemesEnable(
        [
            EDIT_THEMES_BG,
            EDIT_THEMES_FG,
            EDIT_THEMES_ACT_BG,
            EDIT_THEMES_ACT_FG,
            EDIT_THEMES_BORDER_COLOR,
            EDIT_THEMES_BORDER_SIZE,
            EDIT_THEMES_SHADOW
        ]);

    editThemesDisable(
        [
            EDIT_THEMES_FONTSIZE,
            EDIT_THEMES_APPWIDTH,
            EDIT_THEMES_ROUNDNESS,
            EDIT_THEMES_FONT,
            EDIT_THEMES_ICONSCOLOR
        ]);
    const part = 'tool';
    document.getElementById(EDIT_THEMES_BG).value = get_style(part + 'Bg');
    document.getElementById(EDIT_THEMES_FG).value = get_style(part + 'Fg');
    document.getElementById(EDIT_THEMES_ACT_BG).value = get_style(part + 'ActBg');
    document.getElementById(EDIT_THEMES_ACT_FG).value = get_style(part + 'ActFg');
    document.getElementById(EDIT_THEMES_BORDER_COLOR).value = get_style(part + 'BdFg');
    document.getElementById(EDIT_THEMES_BORDER_SIZE).value = get_style(part + 'BdW');
    document.getElementById(EDIT_THEMES_SHADOW).checked = get_style(part + 'Shadow') === '1';
}

function editThemeTitle(content) {
    //          Bg  Fg                  BdW Shadow  
    editThemesEnable(
        [
            EDIT_THEMES_BG,
            EDIT_THEMES_FG,
            EDIT_THEMES_BORDER_COLOR,
            EDIT_THEMES_BORDER_SIZE,
            EDIT_THEMES_SHADOW
        ]);

    editThemesDisable(
        [
            EDIT_THEMES_ACT_BG,
            EDIT_THEMES_ACT_FG,
            EDIT_THEMES_FONTSIZE,
            EDIT_THEMES_APPWIDTH,
            EDIT_THEMES_ROUNDNESS,
            EDIT_THEMES_FONT,
            EDIT_THEMES_ICONSCOLOR
        ]);
    const part = 'title';
    document.getElementById(EDIT_THEMES_BG).value = get_style(part + 'Bg');
    document.getElementById(EDIT_THEMES_FG).value = get_style(part + 'Fg');
    document.getElementById(EDIT_THEMES_BORDER_COLOR).value = get_style(part + 'BdFg');
    document.getElementById(EDIT_THEMES_BORDER_SIZE).value = get_style(part + 'BdW');
    document.getElementById(EDIT_THEMES_SHADOW).checked = get_style(part + 'Shadow') === '1';

}

function editThemeBar(content) {
    //          Bg  Fg  ActBg   ActFg   BdFg    BdW Shadow 
    editThemesEnable(
        [
            EDIT_THEMES_BG,
            EDIT_THEMES_FG,
            EDIT_THEMES_ACT_BG,
            EDIT_THEMES_ACT_FG,
            EDIT_THEMES_BORDER_COLOR,
            EDIT_THEMES_BORDER_SIZE,
            EDIT_THEMES_SHADOW
        ]);

    editThemesDisable(
        [
            EDIT_THEMES_FONTSIZE,
            EDIT_THEMES_APPWIDTH,
            EDIT_THEMES_ROUNDNESS,
            EDIT_THEMES_FONT,
            EDIT_THEMES_ICONSCOLOR
        ]);

    const part = 'bar';
    document.getElementById(EDIT_THEMES_BG).value = get_style(part + 'Bg');
    document.getElementById(EDIT_THEMES_FG).value = get_style(part + 'Fg');
    document.getElementById(EDIT_THEMES_ACT_BG).value = get_style(part + 'ActBg');
    document.getElementById(EDIT_THEMES_ACT_FG).value = get_style(part + 'ActFg');
    document.getElementById(EDIT_THEMES_BORDER_COLOR).value = get_style(part + 'BdFg');
    document.getElementById(EDIT_THEMES_BORDER_SIZE).value = get_style(part + 'BdW');
    document.getElementById(EDIT_THEMES_SHADOW).checked = get_style(part + 'Shadow') === '1';
}

function editThemeBlock(content) {
    //          Bg  Fg  ActBg   ActFg   BdFg    BdW Shad);ow  
    editThemesEnable(
        [
            EDIT_THEMES_BG,
            EDIT_THEMES_FG,
            EDIT_THEMES_ACT_BG,
            EDIT_THEMES_ACT_FG,
            EDIT_THEMES_BORDER_COLOR,
            EDIT_THEMES_BORDER_SIZE,
            EDIT_THEMES_SHADOW
        ]);

    editThemesDisable(
        [
            EDIT_THEMES_FONTSIZE,
            EDIT_THEMES_APPWIDTH,
            EDIT_THEMES_ROUNDNESS,
            EDIT_THEMES_FONT,
            EDIT_THEMES_ICONSCOLOR
        ]);

    const part = 'block';
    document.getElementById(EDIT_THEMES_BG).value = get_style(part + 'Bg');
    document.getElementById(EDIT_THEMES_FG).value = get_style(part + 'Fg');
    document.getElementById(EDIT_THEMES_ACT_BG).value = get_style(part + 'ActBg');
    document.getElementById(EDIT_THEMES_ACT_FG).value = get_style(part + 'ActFg');
    document.getElementById(EDIT_THEMES_BORDER_COLOR).value = get_style(part + 'BdFg');
    document.getElementById(EDIT_THEMES_BORDER_SIZE).value = get_style(part + 'BdW');
    document.getElementById(EDIT_THEMES_SHADOW).checked = get_style(part + 'Shadow') === '1';

}

function editThemeForm(content) {
    //          Bg  Fg  BdFg    BdW Shadow  
    editThemesEnable(
        [
            EDIT_THEMES_BG,
            EDIT_THEMES_FG,
            EDIT_THEMES_BORDER_COLOR,
            EDIT_THEMES_BORDER_SIZE,
            EDIT_THEMES_SHADOW
        ]);

    editThemesDisable(
        [
            EDIT_THEMES_ACT_BG,
            EDIT_THEMES_ACT_FG,
            EDIT_THEMES_FONTSIZE,
            EDIT_THEMES_APPWIDTH,
            EDIT_THEMES_ROUNDNESS,
            EDIT_THEMES_FONT,
            EDIT_THEMES_ICONSCOLOR
        ]);


    const part = 'form';
    document.getElementById(EDIT_THEMES_BG).value = get_style(part + 'Bg');
    document.getElementById(EDIT_THEMES_FG).value = get_style(part + 'Fg');
    document.getElementById(EDIT_THEMES_BORDER_COLOR).value = get_style(part + 'BdFg');
    document.getElementById(EDIT_THEMES_BORDER_SIZE).value = get_style(part + 'BdW');
    document.getElementById(EDIT_THEMES_SHADOW).checked = get_style(part + 'Shadow') === '1';

}

function editThemeBtn(content) {
    //          Bg  Fg  ActBg   ActFg   BdFg    BdW Shadow  
    editThemesEnable(
        [
            EDIT_THEMES_BG,
            EDIT_THEMES_FG,
            EDIT_THEMES_ACT_BG,
            EDIT_THEMES_ACT_FG,
            EDIT_THEMES_BORDER_COLOR,
            EDIT_THEMES_BORDER_SIZE,
            EDIT_THEMES_SHADOW
        ]);

    editThemesDisable(
        [
            EDIT_THEMES_FONTSIZE,
            EDIT_THEMES_APPWIDTH,
            EDIT_THEMES_ROUNDNESS,
            EDIT_THEMES_FONT,
            EDIT_THEMES_ICONSCOLOR
        ]);


    const part = 'btn';
    document.getElementById(EDIT_THEMES_BG).value = get_style(part + 'Bg');
    document.getElementById(EDIT_THEMES_FG).value = get_style(part + 'Fg');
    document.getElementById(EDIT_THEMES_ACT_BG).value = get_style(part + 'ActBg');
    document.getElementById(EDIT_THEMES_ACT_FG).value = get_style(part + 'ActFg');
    document.getElementById(EDIT_THEMES_BORDER_COLOR).value = get_style(part + 'BdFg');
    document.getElementById(EDIT_THEMES_BORDER_SIZE).value = get_style(part + 'BdW');
    document.getElementById(EDIT_THEMES_SHADOW).checked = get_style(part + 'Shadow') === '1';

}

function editThemeInp(content) {
    //          Bg  Fg  ActBg   ActFg   BdFg    BdW Shadow  
    editThemesEnable(
        [
            EDIT_THEMES_BG,
            EDIT_THEMES_FG,
            EDIT_THEMES_ACT_BG,
            EDIT_THEMES_ACT_FG,
            EDIT_THEMES_BORDER_COLOR,
            EDIT_THEMES_BORDER_SIZE,
            EDIT_THEMES_SHADOW
        ]);

    editThemesDisable(
        [
            EDIT_THEMES_FONTSIZE,
            EDIT_THEMES_APPWIDTH,
            EDIT_THEMES_ROUNDNESS,
            EDIT_THEMES_FONT,
            EDIT_THEMES_ICONSCOLOR
        ]);



    const part = 'inp';
    document.getElementById(EDIT_THEMES_BG).value = get_style(part + 'Bg');
    document.getElementById(EDIT_THEMES_FG).value = get_style(part + 'Fg');
    document.getElementById(EDIT_THEMES_ACT_BG).value = get_style(part + 'ActBg');
    document.getElementById(EDIT_THEMES_ACT_FG).value = get_style(part + 'ActFg');
    document.getElementById(EDIT_THEMES_BORDER_COLOR).value = get_style(part + 'BdFg');
    document.getElementById(EDIT_THEMES_BORDER_SIZE).value = get_style(part + 'BdW');
    document.getElementById(EDIT_THEMES_SHADOW).checked = get_style(part + 'Shadow') === '1';

}

function editThemeLink(content) {
    //          Bg  Fg  ActBg   ActFg   
    editThemesEnable(
        [
            EDIT_THEMES_BG,
            EDIT_THEMES_FG,
            EDIT_THEMES_ACT_BG,
            EDIT_THEMES_ACT_FG
        ]);

    editThemesDisable(
        [
            EDIT_THEMES_BORDER_COLOR,
            EDIT_THEMES_BORDER_SIZE,
            EDIT_THEMES_FONTSIZE,
            EDIT_THEMES_APPWIDTH,
            EDIT_THEMES_ROUNDNESS,
            EDIT_THEMES_FONT,
            EDIT_THEMES_ICONSCOLOR,
            EDIT_THEMES_SHADOW
        ]);



    const part = 'link';
    document.getElementById(EDIT_THEMES_BG).value = get_style(part + 'Bg');
    document.getElementById(EDIT_THEMES_FG).value = get_style(part + 'Fg');
    document.getElementById(EDIT_THEMES_ACT_BG).value = get_style(part + 'ActBg');
    document.getElementById(EDIT_THEMES_ACT_FG).value = get_style(part + 'ActFg');

}

function onEditThemesThemeSelected() {
    let select = document.getElementById(EDIT_THEMES_THEME);
    let theme = select[select.selectedIndex].value;
    if( theme === 'none' ) {
        editThemesDisable( [
            EDIT_THEMES_THEME,
            EDIT_THEMES_PART,
            EDIT_THEMES_BG,
            EDIT_THEMES_FG,
            EDIT_THEMES_ACT_BG,
            EDIT_THEMES_ACT_FG,
            EDIT_THEMES_BORDER_COLOR,
            EDIT_THEMES_BORDER_SIZE,
            EDIT_THEMES_FONTSIZE,
            EDIT_THEMES_APPWIDTH,
            EDIT_THEMES_ROUNDNESS,
            EDIT_THEMES_FONT,
            EDIT_THEMES_ICONSCOLOR,
            EDIT_THEMES_SHADOW] );
        document.getElementById(EDIT_THEMES_PART).selectedIndex = 0;
    }
    else if ( theme === 'add') {
        getValue('Nytt Tema', 'Temats namn', 'text', '', 'onThemeName');
    }
    else {
        loadTheme(theme);
    }
}

function onThemeName() {
    let eValue = document.getElementById(GETVALUE_VALUE);
    if( eValue ) {
        let option = document.createElement('option');
        option.classList.add('theme-option');
        option.value=eValue.value;
        option.innerText=eValue.value;
        let select = document.getElementById(EDIT_THEMES_THEME);
        select.appendChild(option);
        selectOption(select,eValue.value);
        createDefaultTheme(eValue.value);
        loadTheme(eValue);
    }
}

function onEditThemesPartSelected() {
    let eSelect = document.getElementById(EDIT_THEMES_THEME);
    let theme = eSelect.options[eSelect.selectedIndex].value;

    let ePart = document.getElementById(EDIT_THEMES_PART);
    let part = ePart.options[ePart.selectedIndex].value;

    getThemePart(theme, part).then(
        (resolve) => {
            if (resolve.status === 'ok') {
                document.getElementById(EDIT_THEME_CUR_PART).value = part;
                switch (part) {

                    case 'app': editThemeApp(resolve.content); break;
                    case 'edit': editThemeEdit(resolve.content); break;
                    case 'tool': editThemeTool(resolve.content); break;
                    case 'title': editThemeTitle(resolve.content); break;
                    case 'bar': editThemeBar(resolve.content); break;
                    case 'block': editThemeBlock(resolve.content); break;
                    case 'form': editThemeForm(resolve.content); break;
                    case 'btn': editThemeBtn(resolve.content); break;
                    case 'inp': editThemeInp(resolve.content); break;
                    case 'link': editThemeLink(resolve.content); break;
                }
            }
            else {
                popup('FEL', resolve.content);
            }
        },
        (reject) => { }
    );

}

function onEditThemesApply() {

    let select = document.getElementById(EDIT_THEMES_THEME);
    let themeName = select[select.selectedIndex].value;

    let theme = {
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
        blockBg: get_style('blockBg'),
        blockFg: get_style('blockFg'),
        blockActBg: get_style('blockActBg'),
        blockActFg: get_style('blockActFg'),
        blockBdFg: get_style('blockBdFg'),
        blockBdW: get_style('blockBdW'),
        blockShadow: get_style('blockShadow'),
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
    saveTheme(themeName, theme);

}

function onEditThemesClose() {
    closeForm(edThemeForm);
    edThemeForm = '';
}


function onEditThemesBg() {
    let part = document.getElementById(EDIT_THEME_CUR_PART).value;
    set_style( part + 'Bg', document.getElementById(EDIT_THEMES_BG).value);
}

function onEditThemesFg() {
    let part = document.getElementById(EDIT_THEME_CUR_PART).value;
    set_style( part + 'Fg', document.getElementById(EDIT_THEMES_FG).value);
}

function onEditThemesActBg() {
    let part = document.getElementById(EDIT_THEME_CUR_PART).value;
    set_style( part + 'ActBg', document.getElementById(EDIT_THEMES_ACT_BG).value);
}

function onEditThemesActFg() {
    let part = document.getElementById(EDIT_THEME_CUR_PART).value;
    set_style( part + 'ActFg', document.getElementById(EDIT_THEMES_ACT_FG).value);
}

function onEditThemesBorderColor() {
    let part = document.getElementById(EDIT_THEME_CUR_PART).value;
    let color = document.getElementById(EDIT_THEMES_BORDER_COLOR).value;
    set_style(part + 'BdFg', color);
}

function onEditThemesBorderSize() {
    let part = document.getElementById(EDIT_THEME_CUR_PART).value;
    let size = document.getElementById(EDIT_THEMES_BORDER_SIZE).value;
    set_style(part + 'BdW', parseInt(size) + 'px');
}

function onEditThemesFontSize() {
    let part = document.getElementById(EDIT_THEME_CUR_PART).value;
    let size = document.getElementById(EDIT_THEMES_FONTSIZE).value;
    set_style(part + 'Fsize', parseFloat(size) + 'em');
}

function onEditThemesAppWidth() {
    let part = document.getElementById(EDIT_THEME_CUR_PART).value;
    let width = document.getElementById(EDIT_THEMES_APPWIDTH).value;
    set_style(part+ 'Width', parseInt(width) + 'vw');
}

function onEditThemesRoundness() {
    let part = document.getElementById(EDIT_THEME_CUR_PART).value;
    let radius = document.getElementById(EDIT_THEMES_ROUNDNESS).value;
    set_style(part + 'Radius', parseInt(radius) + 'px');

}

function onEditThemesFont() {
    let part = document.getElementById(EDIT_THEME_CUR_PART).value;
    let select = document.getElementById(EDIT_THEMES_FONT);
    let option = select.options[select.selectedIndex];
    set_style( part + 'Font', option.value);

}

function onEditThemesIconColor() {
    let part = document.getElementById(EDIT_THEME_CUR_PART).value;
    let select = document.getElementById(EDIT_THEMES_ICONSCOLOR);
    let option = select.options[select.selectedIndex];
    set_style( part + 'Folder', 'icons/' + option.value);
}

function onEditThemesShadow() {
    let shadow = document.getElementById(EDIT_THEMES_SHADOW).checked;
    let part = document.getElementById(EDIT_THEME_CUR_PART).value;
    set_style(part + 'Shadow', shadow ? '1' : '0');
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
        set_style('blockBg', resolve.blockBg);
        set_style('blockFg', resolve.blockFg);
        set_style('blockActBg', resolve.blockActBg);
        set_style('blockActFg', resolve.blockActFg);
        set_style('blockBdFg', resolve.blockBdFg);
        set_style('blockBdW', resolve.blockBdW);
        set_style('blockShadow', resolve.blockShadow);
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