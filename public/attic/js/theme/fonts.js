function onEditFonts() {
    webForm('th_fonts', {
        font: get_style('font'),
        fontsize: parseFloat(get_style('fontsize')),
        fzNavbar: parseFloat(get_style('fzNavbar')),
        fwNavbar: get_style('fwNavbar'),
        fsNavbar: get_style('fsNavbar'),
        fzTitle: parseFloat(get_style('fzTitle')),
        fwTitle: get_style('fwTitle'),
        fsTitle: get_style('fsTitle'),
        fzContent: parseFloat(get_style('fzContent')),
        fwContent: get_style('fwContent'),
        fsContent: get_style('fsContent'),
        fzFooter: parseFloat(get_style('fzFooter')),
        fwFooter: get_style('fwFooter'),
        fsFooter: get_style('fsFooter'),
        fzForm: parseFloat(get_style('fzForm')),
        fwForm: get_style('fwForm'),
        fsForm: get_style('fsForm'),
        fzButton: parseFloat(get_style('fzButton')),
        fwButton: get_style('fwButton'),
        fsButton: get_style('fsButton'),
        fzInput: parseFloat(get_style('fzInput')),
        fwInput: get_style('fwInput'),
        fsInput: get_style('fsInput'),
        fzTools: parseFloat(get_style('fzTools')),
        fwTools: get_style('fwTools'),
        fsTools: get_style('fsTools'),
    });
}

function closeFonts() {
    closeForm('th_fonts');
}

function onFontSelected(e) {
    set_style('font', e.options[e.selectedIndex].value);
}

function onFontSize(e) { set_style('fontsize', e.value + 'em' ); }

function onFzNavbar(e) { set_style('fzNavbar', e.value + 'em' ); }
function onFwNavbar(e) { set_style('fwNavbar', e.checked ? 'bold' : 'normal'); }
function onFsNavbar(e) { set_style('fsNavbar', e.checked ? 'italic' : 'normal'); }

function onFzTitle(e) { set_style('fzTitle', e.value + 'em' ); }
function onFwTitle(e) { set_style('fwTitle', e.checked ? 'bold' : 'normal'); }
function onFsTitle(e) { set_style('fsTitle', e.checked ? 'italic' : 'normal'); }

function onFzContent(e) { set_style('fzContent', e.value + 'em' ); }
function onFwContent(e) { set_style('fwContent', e.checked ? 'bold' : 'normal'); }
function onFsContent(e) { set_style('fsContent', e.checked ? 'italic' : 'normal'); }

function onFzFooter(e) { set_style('fzFooter', e.value + 'em' ); }
function onFwFooter(e) { set_style('fwFooter', e.checked ? 'bold' : 'normal'); }
function onFsFooter(e) { set_style('fsFooter', e.checked ? 'italic' : 'normal'); }

function onFzForm(e) { set_style('fzForm', e.value + 'em' ); }
function onFwForm(e) { set_style('fwForm', e.checked ? 'bold' : 'normal'); }
function onFsForm(e) { set_style('fsForm', e.checked ? 'italic' : 'normal'); }

function onFzButton(e) { set_style('fzButton', e.value + 'em' ); }
function onFwButton(e) { set_style('fwButton', e.checked ? 'bold' : 'normal'); }
function onFsButton(e) { set_style('fsButton', e.checked ? 'italic' : 'normal'); }

function onFzInput(e) { set_style('fzInput', e.value + 'em' ); }
function onFwInput(e) { set_style('fwInput', e.checked ? 'bold' : 'normal'); }
function onFsInput(e) { set_style('fsInput', e.checked ? 'italic' : 'normal'); }

function onFzTools(e) { set_style('fzTools', e.value + 'em' ); }
function onFwTools(e) { set_style('fwTools', e.checked ? 'bold' : 'normal'); }
function onFsTools(e) { set_style('fsTools', e.checked ? 'italic' : 'normal'); }
