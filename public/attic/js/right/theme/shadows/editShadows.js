function onEditShadows() {
    webForm('editShadows', [
        { key: 'shTop', value: getStyle('shTop') },
        { key: 'shadows', value: getStyle('shadows') },
        { key: 'shadows', value: getStyle('shadows') },
        { key: 'shadows', value: getStyle('shadows') },
        { key: 'shForm', value: getStyle('shForm') },
        { key: 'shadows', value: getStyle('shadows') },
        { key: 'shInput', value: getStyle('shInput') },
        { key: 'shTools', value: getStyle('shTools') }
    ]);
}
function onShNavbar(e) { setStyle('shTop', e.checked ? '1' : '0'); }
function onShTitle(e) { setStyle('shadows', e.checked ? '1' : '0'); }
function onShContent(e) { setStyle('shadows', e.checked ? '1' : '0'); }
function onShFooter(e) { setStyle('shadows', e.checked ? '1' : '0'); }
function onShForm(e) { setStyle('shForm', e.checked ? '1' : '0'); }
function onShButton(e) { setStyle('shadows', e.checked ? '1' : '0'); }
function onShInput(e) { setStyle('shInput', e.checked ? '1' : '0'); }
function onShTools(e) { setStyle('shTools', e.checked ? '1' : '0'); }
function closeShadows() {
    closeForm('editShadows');
}
