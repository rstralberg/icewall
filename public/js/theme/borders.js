function onEditBorders() {
    webForm('th_borders', { 
        bdColNavbar: get_style('bdColNavbar'),
        bdSizeNavbar: parseInt(get_style('bdSizeNavbar')),
        rNavbar: parseInt(get_style('rNavbar')),
        bdColTitle: get_style('bdColTitle'),
        bdSizeTitle: parseInt(get_style('bdSizeTitle')),
        rTitle: parseInt(get_style('rTitle')),
        bdColContent: get_style('bdColContent'),
        bdSizeContent: parseInt(get_style('bdSizeContent')),
        rContent: parseInt(get_style('rContent')),
        bdColFooter: get_style('bdColFooter'),
        bdSizeFooter: parseInt(get_style('bdSizeFooter')),
        rFooter: parseInt(get_style('rFooter')),
        bdColForm: get_style('bdColForm'),
        bdSizeForm: parseInt(get_style('bdSizeForm')),
        rForm: parseInt(get_style('rForm')),
        bdColButton: get_style('bdColButton'),
        bdSizeButton: parseInt(get_style('bdSizeButton')),
        rButton: parseInt(get_style('rButton')),
        bdColInput: get_style('bdColInput'),
        bdSizeInput: parseInt(get_style('bdSizeInput')),
        rInput: parseInt(get_style('rInput')),
        bdColTools: get_style('bdColTools'),
        bdSizeTools: parseInt(get_style('bdSizeTools')),
        rTools: parseInt(get_style('rTools')),
    });
}

function onBdColNavbar(e) { set_style('bdColNavbar', e.value); }
function onBdSizeNavbar(e) { set_style('bdSizeNavbar', e.value + 'px'); }
function onRNavbar(e) { set_style('rNavbar', e.value + 'px'); }

function onBdColTitle(e) { set_style('bdColTitle', e.value); }
function onBdSizeTitle(e) { set_style('bdSizeTitle', e.value + 'px'); }
function onRTitle(e) { set_style('rTitle', e.value + 'px'); }

function onBdColContent(e) { set_style('bdColContent', e.value); }
function onBdSizeContent(e) { set_style('bdSizeContent', e.value + 'px'); }
function onRContent(e) { set_style('rContent', e.value + 'px'); }

function onBdColFooter(e) { set_style('bdColFooter', e.value); }
function onBdSizeFooter(e) { set_style('bdSizeFooter', e.value + 'px'); }
function onRFooter(e) { set_style('rFooter', e.value + 'px'); }

function onBdColForm(e) { set_style('bdColForm', e.value); }
function onBdSizeForm(e) { set_style('bdSizeForm', e.value + 'px'); }
function onRForm(e) { set_style('rForm', e.value + 'px'); }

function onBdColButton(e) { set_style('bdColButton', e.value); }
function onBdSizeButton(e) { set_style('bdSizeButton', e.value + 'px'); }
function onRButton(e) { set_style('rButton', e.value + 'px'); }

function onBdColInput(e) { set_style('bdColInput', e.value); }
function onBdSizeInput(e) { set_style('bdSizeInput', e.value + 'px'); }
function onRInput(e) { set_style('rInput', e.value + 'px'); }

function onBdColTools(e) { set_style('bdColTools', e.value); }
function onBdSizeTools(e) { set_style('bdSizeTools', e.value + 'px'); }
function onRTools(e) { set_style('rTools', e.value + 'px'); }

function closeBorders() {
    closeForm('th_borders');
}

