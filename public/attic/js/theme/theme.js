

function loadTheme(themeName) {

    getTheme(themeName).then((resolve) => {
        if (resolve.ok) {
            let theme = resolve.content;

            set_style('name', theme['name'] + '');
            set_style('wLeft', theme['wLeft'] + 'fr');
            set_style('wCenter', theme['wCenter'] + 'fr');
            set_style('wRight', theme['wRight'] + 'fr');
            set_style('wContent', theme['wContent'] + '%');
            set_style('vGap', theme['vGap'] + 'px');
            set_style('hGap', theme['hGap'] + 'px');
            set_style('hApp', theme['hApp'] + 'vh');
            set_style('hNavbar', theme['hNavbar'] + 'fr');
            set_style('hTitle', theme['hTitle'] + 'fr');
            set_style('hFooter', theme['hFooter'] + 'fr');
            set_style('dContent', theme['dContent'] + 'vh');
            set_style('rNavbar', theme['rNavbar'] + 'px');
            set_style('rTitle', theme['rTitle'] + 'px');
            set_style('rContent', theme['rContent'] + 'px');
            set_style('rFooter', theme['rFooter'] + 'px');
            set_style('rForm', theme['rForm'] + 'px');
            set_style('rInput', theme['rInput'] + 'px');
            set_style('rTools', theme['rTools'] + 'px');
            set_style('rButton', theme['rButton'] + 'px');
            set_style('shNavbar', theme['shNavbar']);
            set_style('shTitle', theme['shTitle']);
            set_style('shContent', theme['shContent']);
            set_style('shFooter', theme['shFooter']);
            set_style('shForm', theme['shForm']);
            set_style('shButton', theme['shButton']);
            set_style('shInput', theme['shInput']);
            set_style('shTools', theme['shTools']);
            set_style('bdColNavbar', theme['bdColNavbar']);
            set_style('bdColTitle', theme['bdColTitle']);
            set_style('bdColContent', theme['bdColContent']);
            set_style('bdColFooter', theme['bdColFooter']);
            set_style('bdColForm', theme['bdColForm']);
            set_style('bdColButton', theme['bdColButton']);
            set_style('bdColInput', theme['bdColInput']);
            set_style('bdColTools', theme['bdColTools']);
            set_style('bdSizeNavbar', theme['bdSizeNavbar'] + 'px');
            set_style('bdSizeTitle', theme['bdSizeTitle'] + 'px');
            set_style('bdSizeContent', theme['bdSizeContent'] + 'px');
            set_style('bdSizeFooter', theme['bdSizeFooter'] + 'px');
            set_style('bdSizeForm', theme['bdSizeForm'] + 'px');
            set_style('bdSizeButton', theme['bdSizeButton'] + 'px');
            set_style('bdSizeInput', theme['bdSizeInput'] + 'px');
            set_style('bdSizeTools', theme['bdSizeTools'] + 'px');
            set_style('bgApp', theme['bgApp'] + '');
            set_style('bgNavbar', theme['bgNavbar'] + '');
            set_style('bgTitle', theme['bgTitle'] + '');
            set_style('bgContent', theme['bgContent'] + '');
            set_style('bgFooter', theme['bgFooter'] + '');
            set_style('bgForm', theme['bgForm'] + '');
            set_style('bgButton', theme['bgButton'] + '');
            set_style('bgInput', theme['bgInput'] + '');
            set_style('bgHover', theme['bgHover'] + '');
            set_style('bgTools', theme['bgTools'] + '');
            set_style('fgApp', theme['fgApp'] + '');
            set_style('fgNavbar', theme['fgNavbar'] + '');
            set_style('fgTitle', theme['fgTitle'] + '');
            set_style('fgContent', theme['fgContent'] + '');
            set_style('fgFooter', theme['fgFooter'] + '');
            set_style('fgForm', theme['fgForm'] + '');
            set_style('fgButton', theme['fgButton'] + '');
            set_style('fgInput', theme['fgInput'] + '');
            set_style('fgHover', theme['fgHover'] + '');
            set_style('fgTools', theme['fgTools'] + '');
            set_style('fzNavbar', theme['fzNavbar'] + 'em');
            set_style('fzTitle', theme['fzTitle'] + 'em');
            set_style('fzContent', theme['fzContent'] + 'em');
            set_style('fzFooter', theme['fzFooter'] + 'em');
            set_style('fzForm', theme['fzForm'] + 'em');
            set_style('fzButton', theme['fzButton'] + 'em');
            set_style('fzInput', theme['fzInput'] + 'em');
            set_style('fzTools', theme['fzTools'] + 'em');
            set_style('fwNavbar', theme['fwNavbar']);
            set_style('fwTitle', theme['fwTitle']);
            set_style('fwContent', theme['fwContent']);
            set_style('fwFooter', theme['fwFooter']);
            set_style('fwForm', theme['fwForm']);
            set_style('fwButton', theme['fwButton']);
            set_style('fwInput', theme['fwInput']);
            set_style('fwTools', theme['fwTools']);
            set_style('fsNavbar', theme['fsNavbar']);
            set_style('fsTitle', theme['fsTitle']);
            set_style('fsContent', theme['fsContent']);
            set_style('fsFooter', theme['fsFooter']);
            set_style('fsForm', theme['fsForm']);
            set_style('fsButton', theme['fsButton']);
            set_style('fsInput', theme['fsInput']);
            set_style('fsTools', theme['fsTools']);
            set_style('font', theme['font']);
            set_style('fontsize', theme['fontsize'] + 'em');
            set_style('iconsfolder', theme['iconsfolder']);
        }
    },
        (error) => { }
    );
}


function object2Styles(obj)  {
    
        set_style('name', '"' + obj.name + '"');
        set_style('wLeft',obj.wLeft + 'fr');
        set_style('wCenter',obj.wCenter + 'fr');
        set_style('wRight',obj.wRight + 'fr');
        set_style('wContent',obj.wContent + '%');
        set_style('vGap',obj.vGap +'px');
        set_style('hGap',obj.hGap +'px');
        set_style('hApp',obj.hApp +'vh');
        set_style('hNavbar',obj.hNavbar + 'fr');
        set_style('hTitle',obj.hTitle + 'fr');
        set_style('hFooter',obj.hFooter + 'fr');
        set_style('dContent',obj.dContent + 'vh');
        set_style('rNavbar',obj.rNavbar + 'px');
        set_style('rTitle',obj.rTitle + 'px');
        set_style('rContent',obj.rContent + 'px');
        set_style('rFooter',obj.rFooter + 'px');
        set_style('rForm',obj.rForm + 'px');
        set_style('rInput',obj.rInput + 'px');
        set_style('rTools',obj.rTools + 'px');
        set_style('rButton',obj.rButton + 'px');
        set_style('shNavbar',obj.shNavbar);
        set_style('shTitle',obj.shTitle);
        set_style('shContent',obj.shContent);
        set_style('shFooter',obj.shFooter);
        set_style('shForm',obj.shForm);
        set_style('shButton',obj.shButton);
        set_style('shInput',obj.shInput);
        set_style('shTools',obj.shTools);
        set_style('bdColNavbar',obj.bdColNavbar);
        set_style('bdColTitle',obj.bdColTitle);
        set_style('bdColContent',obj.bdColContent);
        set_style('bdColFooter',obj.bdColFooter);
        set_style('bdColForm',obj.bdColForm);
        set_style('bdColButton',obj.bdColButton);
        set_style('bdColInput',obj.bdColInput);
        set_style('bdColTools',obj.bdColTools);
        set_style('bdSizeNavbar',obj.bdSizeNavbar);
        set_style('bdSizeTitle',obj.bdSizeTitle + 'px');
        set_style('bdSizeContent',obj.bdSizeContent + 'px');
        set_style('bdSizeFooter',obj.bdSizeFooter + 'px');
        set_style('bdSizeForm',obj.bdSizeForm + 'px');
        set_style('bdSizeButton',obj.bdSizeButton + 'px');
        set_style('bdSizeInput',obj.bdSizeInput + 'px');
        set_style('bdSizeTools',obj.bdSizeTools + 'px');
        set_style('bgApp',obj.bgApp);
        set_style('bgNavbar',obj.bgNavbar);
        set_style('bgTitle',obj.bgTitle);
        set_style('bgContent',obj.bgContent);
        set_style('bgFooter',obj.bgFooter);
        set_style('bgForm',obj.bgForm);
        set_style('bgButton',obj.bgButton);
        set_style('bgInput',obj.bgInput);
        set_style('bgHover',obj.bgHover);
        set_style('bgTools',obj.bgTools);
        set_style('fgApp',obj.fgApp);
        set_style('fgNavbar',obj.fgNavbar);
        set_style('fgTitle',obj.fgTitle);
        set_style('fgContent',obj.fgContent);
        set_style('fgFooter',obj.fgFooter);
        set_style('fgForm',obj.fgForm);
        set_style('fgButton',obj.fgButton);
        set_style('fgInput',obj.fgInput);
        set_style('fgHover',obj.fgHover);
        set_style('fgTools',obj.fgTools);
        set_style('fzNavbar',obj.fzNavbar + 'em');
        set_style('fzTitle',obj.fzTitle + 'em');
        set_style('fzContent',obj.fzContent + 'em');
        set_style('fzFooter',obj.fzFooter + 'em');
        set_style('fzForm',obj.fzForm + 'em');
        set_style('fzButton',obj.fzButton + 'em');
        set_style('fzInput',obj.fzInput + 'em');
        set_style('fzTools',obj.fzTools + 'em');
        set_style('fwNavbar',obj.fwNavbar);
        set_style('fwTitle',obj.fwTitle);
        set_style('fwContent',obj.fwContent);
        set_style('fwFooter',obj.fwFooter);
        set_style('fwForm',obj.fwForm);
        set_style('fwButton',obj.fwButton);
        set_style('fwInput',obj.fwInput);
        set_style('fwTools',obj.fwTools);
        set_style('fsNavbar',obj.fsNavbar);
        set_style('fsTitle',obj.fsTitle);
        set_style('fsContent',obj.fsContent);
        set_style('fsFooter',obj.fsFooter);
        set_style('fsForm',obj.fsForm);
        set_style('fsButton',obj.fsButton);
        set_style('fsInput',obj.fsInput);
        set_style('fsTools',obj.fsTools);
        set_style('font', '"' + obj.font + '"');
        set_style('fontsize',obj.fontsize + 'em');
        set_style('iconsfolder','"' + obj.iconsfolder + '"');
}

function styles2Object()  {
    return {
        name: get_style('name'),
        wLeft: parseFloat(get_style('wLeft')),
        wCenter: parseFloat(get_style('wCenter')),
        wRight: parseFloat(get_style('wRight')),
        wContent: parseInt(get_style('wContent')),
        vGap: parseInt(get_style('vGap')),
        hGap: parseInt(get_style('hGap')),
        hApp: parseInt(get_style('hApp')),
        hNavbar: parseFloat(get_style('hNavbar')),
        hTitle: parseFloat(get_style('hTitle')),
        hFooter: parseFloat(get_style('hFooter')),
        dContent: parseInt(get_style('dContent')),
        rNavbar: parseInt(get_style('rNavbar')),
        rTitle: parseInt(get_style('rTitle')),
        rContent: parseInt(get_style('rContent')),
        rFooter: parseInt(get_style('rFooter')),
        rForm: parseInt(get_style('rForm')),
        rInput: parseInt(get_style('rInput')),
        rTools: parseInt(get_style('rTools')),
        rButton: parseInt(get_style('rButton')),
        shNavbar: parseInt(get_style('shNavbar')),
        shTitle: parseInt(get_style('shTitle')),
        shContent: parseInt(get_style('shContent')),
        shFooter: parseInt(get_style('shFooter')),
        shForm: parseInt(get_style('shForm')),
        shButton: parseInt(get_style('shButton')),
        shInput: parseInt(get_style('shInput')),
        shTools: parseInt(get_style('shTools')),
        bdColNavbar: get_style('bdColNavbar'),
        bdColTitle: get_style('bdColTitle'),
        bdColContent: get_style('bdColContent'),
        bdColFooter: get_style('bdColFooter'),
        bdColForm: get_style('bdColForm'),
        bdColButton: get_style('bdColButton'),
        bdColInput: get_style('bdColInput'),
        bdColTools: get_style('bdColTools'),
        bdSizeNavbar: parseInt(get_style('bdSizeNavbar')),
        bdSizeTitle: parseInt(get_style('bdSizeTitle')),
        bdSizeContent: parseInt(get_style('bdSizeContent')),
        bdSizeFooter: parseInt(get_style('bdSizeFooter')),
        bdSizeForm: parseInt(get_style('bdSizeForm')),
        bdSizeButton: parseInt(get_style('bdSizeButton')),
        bdSizeInput: parseInt(get_style('bdSizeInput')),
        bdSizeTools: parseInt(get_style('bdSizeTools')),
        bgApp: get_style('bgApp'),
        bgNavbar: get_style('bgNavbar'),
        bgTitle: get_style('bgTitle'),
        bgContent: get_style('bgContent'),
        bgFooter: get_style('bgFooter'),
        bgForm: get_style('bgForm'),
        bgButton: get_style('bgButton'),
        bgInput: get_style('bgInput'),
        bgHover: get_style('bgHover'),
        bgTools: get_style('bgTools'),
        fgApp: get_style('fgApp'),
        fgNavbar: get_style('fgNavbar'),
        fgTitle: get_style('fgTitle'),
        fgContent: get_style('fgContent'),
        fgFooter: get_style('fgFooter'),
        fgForm: get_style('fgForm'),
        fgButton: get_style('fgButton'),
        fgInput: get_style('fgInput'),
        fgHover: get_style('fgHover'),
        fgTools: get_style('fgTools'),
        fzNavbar: parseFloat(get_style('fzNavbar')),
        fzTitle: parseFloat(get_style('fzTitle')),
        fzContent: parseFloat(get_style('fzContent')),
        fzFooter: parseFloat(get_style('fzFooter')),
        fzForm: parseFloat(get_style('fzForm')),
        fzButton: parseFloat(get_style('fzButton')),
        fzInput: parseFloat(get_style('fzInput')),
        fzTools: parseFloat(get_style('fzTools')),
        fwNavbar: get_style('fwNavbar'),
        fwTitle: get_style('fwTitle'),
        fwContent: get_style('fwContent'),
        fwFooter: get_style('fwFooter'),
        fwForm: get_style('fwForm'),
        fwButton: get_style('fwButton'),
        fwInput: get_style('fwInput'),
        fwTools: get_style('fwTools'),
        fsNavbar: get_style('fsNavbar'),
        fsTitle: get_style('fsTitle'),
        fsContent: get_style('fsContent'),
        fsFooter: get_style('fsFooter'),
        fsForm: get_style('fsForm'),
        fsButton: get_style('fsButton'),
        fsInput: get_style('fsInput'),
        fsTools: get_style('fsTools'),
        font: get_style('font'),
        fontsize: parseFloat(get_style('fontsize')),
        iconsfolder: get_style('iconsfolder')
    };
}

function styles2ValueArray()  {
    return new Array(
        sqlString(get_style('name')),
        parseFloat(get_style('wLeft')),
        parseFloat(get_style('wCenter')),
        parseFloat(get_style('wRight')),
        parseInt(get_style('wContent')),
        parseInt(get_style('vGap')),
        parseInt(get_style('hGap')),
        parseInt(get_style('hApp')),
        parseFloat(get_style('hNavbar')),
        parseFloat(get_style('hTitle')),
        parseFloat(get_style('hFooter')),
        parseInt(get_style('dContent')),
        parseInt(get_style('rNavbar')),
        parseInt(get_style('rTitle')),
        parseInt(get_style('rContent')),
        parseInt(get_style('rFooter')),
        parseInt(get_style('rForm')),
        parseInt(get_style('rInput')),
        parseInt(get_style('rTools')),
        parseInt(get_style('rButton')),
        parseInt(get_style('shNavbar')),
        parseInt(get_style('shTitle')),
        parseInt(get_style('shContent')),
        parseInt(get_style('shFooter')),
        parseInt(get_style('shForm')),
        parseInt(get_style('shButton')),
        parseInt(get_style('shInput')),
        parseInt(get_style('shTools')),
        sqlString(get_style('bdColNavbar')),
        sqlString(get_style('bdColTitle')),
        sqlString(get_style('bdColContent')),
        sqlString(get_style('bdColFooter')),
        sqlString(get_style('bdColForm')),
        sqlString(get_style('bdColButton')),
        sqlString(get_style('bdColInput')),
        sqlString(get_style('bdColTools')),
        parseInt(get_style('bdSizeNavbar')),
        parseInt(get_style('bdSizeTitle')),
        parseInt(get_style('bdSizeContent')),
        parseInt(get_style('bdSizeFooter')),
        parseInt(get_style('bdSizeForm')),
        parseInt(get_style('bdSizeButton')),
        parseInt(get_style('bdSizeInput')),
        parseInt(get_style('bdSizeTools')),
        sqlString(get_style('bgApp')),
        sqlString(get_style('bgNavbar')),
        sqlString(get_style('bgTitle')),
        sqlString(get_style('bgContent')),
        sqlString(get_style('bgFooter')),
        sqlString(get_style('bgForm')),
        sqlString(get_style('bgButton')),
        sqlString(get_style('bgInput')),
        sqlString(get_style('bgHover')),
        sqlString(get_style('bgTools')),
        sqlString(get_style('fgApp')),
        sqlString(get_style('fgNavbar')),
        sqlString(get_style('fgTitle')),
        sqlString(get_style('fgContent')),
        sqlString(get_style('fgFooter')),
        sqlString(get_style('fgForm')),
        sqlString(get_style('fgButton')),
        sqlString(get_style('fgInput')),
        sqlString(get_style('fgHover')),
        sqlString(get_style('fgTools')),
        parseFloat(get_style('fzNavbar')),
        parseFloat(get_style('fzTitle')),
        parseFloat(get_style('fzContent')),
        parseFloat(get_style('fzFooter')),
        parseFloat(get_style('fzForm')),
        parseFloat(get_style('fzButton')),
        parseFloat(get_style('fzInput')),
        parseFloat(get_style('fzTools')),
        sqlString(get_style('fwNavbar')),
        sqlString(get_style('fwTitle')),
        sqlString(get_style('fwContent')),
        sqlString(get_style('fwFooter')),
        sqlString(get_style('fwForm')),
        sqlString(get_style('fwButton')),
        sqlString(get_style('fwInput')),
        sqlString(get_style('fwTools')),
        sqlString(get_style('fsNavbar')),
        sqlString(get_style('fsTitle')),
        sqlString(get_style('fsContent')),
        sqlString(get_style('fsFooter')),
        sqlString(get_style('fsForm')),
        sqlString(get_style('fsButton')),
        sqlString(get_style('fsInput')),
        sqlString(get_style('fsTools')),
        sqlString(get_style('font')),
        parseFloat(get_style('fontsize')),
        sqlString(get_style('iconsfolder'))
    );

}

function onSaveTheme() {

    let theme = styles2ValueArray();
    let request = new Request('updTheme', theme);
    request.send().then(
        (resolve) => {
            if( resolve.ok) {
                popup(theme[0] + ' sparat!');
            }
            closeSaveAs();
        },
        (reject) => {
            closeSaveAs();
        }
    );
}

function onSaveThemeAs() {
    webForm('saveThemeAs');
}

function closeSaveAs() {
    closeForm('saveThemeAs');
}

function saveThemeAs(nameId) {
    let name = document.getElementById(nameId).value;

    let args = {
        theme: styles2ValueArray(),
        name: name
    }
    
    let request = new Request('insTheme', args);
    request.send().then(
        (resolve) => {
            if( resolve.ok) {
                popup(name + ' sparat!');
                getNavbar();
                closeDeleteTheme();
            }
        },
        (reject) => {
            closeDeleteTheme();
        }
    );

}

function onDeleteTheme() {
    webForm('delTheme', {
        theme: get_style('name')
    });
}

function closeDeleteTheme() {
    closeForm('delTheme');
}

function deleteTheme(selectId) {

    let select = document.getElementById(selectId);
    let themeName = select.options[select.selectedIndex].value;
    let request = new Request('themeDelete', 
    {
        name: themeName
    });
    request.send().then(
        (resolve) => {
            if( resolve.ok) {
                popup(themeName + ' raderat!');
                getNavbar();
            }
        },
        (reject) => {
        }
    );

}
