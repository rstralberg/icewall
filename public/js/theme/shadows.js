
function onEditShadows() {
    webForm('th_shadows', {
        shNavbar: get_style('shNavbar'),
        shTitle: get_style('shTitle'),
        shContent: get_style('shContent'),
        shFooter: get_style('shFooter'),
        shForm: get_style('shForm'),
        shButton: get_style('shButton'),
        shInput: get_style('shInput'),
        shTools: get_style('shTools')
    });
}

function onShNavbar(e) { set_style('shNavbar', e.checked ? 1: 0);}
function onShTitle(e) { set_style('shTitle', e.checked ? 1: 0);}
function onShContent(e) { set_style('shContent', e.checked ? 1: 0);}
function onShFooter(e) { set_style('shFooter', e.checked ? 1: 0);}
function onShForm(e) { set_style('shForm', e.checked ? 1: 0);}
function onShButton(e) { set_style('shButton', e.checked ? 1: 0);}
function onShInput(e) { set_style('shInput', e.checked ? 1: 0);}
function onShTools(e) { set_style('shTools', e.checked ? 1: 0);}

function closeShadows() {
    closeForm('th_shadows');
}
