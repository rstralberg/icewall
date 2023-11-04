
function onEditColors() {
    webForm('th_colors', { 
        theme: get_style('name'),
        bgApp: get_style('bgApp'),
        fgApp: get_style('fgApp'),
        bgNavbar: get_style('bgNavbar'),
        fgNavbar: get_style('fgNavbar'),
        bgHover: get_style('bgHover'),
        fgHover: get_style('fgHover'),
        bgTitle: get_style('bgTitle'),
        fgTitle: get_style('fgTitle'),
        bgContent: get_style('bgContent'),
        fgContent: get_style('fgContent'),
        bgFooter: get_style('bgFooter'),
        fgFooter: get_style('fgFooter'),
        bgForm: get_style('bgForm'),
        fgForm: get_style('fgForm'),
        bgButton: get_style('bgButton'),
        fgButton: get_style('fgButton'),
        bgInput: get_style('bgInput'),
        fgInput: get_style('fgInput'),
        bgTools: get_style('bgTools'),
        fgTools: get_style('fgTools')
     });

}

function closeColors() {
    closeForm('th_colors');
}

function onBgApp(e) { set_style('bgApp', e.value ); }
function onFgApp(e) { set_style('fgApp', e.value ); }
function onBgNavbar(e) { set_style('bgNavbar', e.value ); }
function onFgNavbar(e) { set_style('fgNavbar', e.value ); }
function onBgHover(e) { set_style('bgHover', e.value ); }
function onFgHover(e) { set_style('fgHover', e.value ); }
function onBgTitle(e) { set_style('bgTitle', e.value ); }
function onFgTitle(e) { set_style('fgTitle', e.value ); }
function onBgContent(e) { set_style('bgContent', e.value ); }
function onFgContent(e) { set_style('fgContent', e.value ); }
function onBgFooter(e) { set_style('bgFooter', e.value ); }
function onFgFooter(e) { set_style('fgFooter', e.value ); }
function onBgForm(e) { set_style('bgForm', e.value ); }
function onFgForm(e) { set_style('fgForm', e.value ); }
function onBgButton(e) { set_style('bgButton', e.value ); }
function onFgButton(e) { set_style('fgButton', e.value ); }
function onBgInput(e) { set_style('bgInput', e.value ); }
function onFgInput(e) { set_style('fgInput', e.value ); }
function onBgTools(e) { set_style('bgTools', e.value ); }
function onFgTools(e) { set_style('fgTools', e.value ); }

