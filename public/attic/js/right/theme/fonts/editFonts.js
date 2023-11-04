function editFonts() {
    webForm('editFonts', []);
}
function closeFonts() {
    closeForm('editFonts');
}
function onFontSelected(e) {
    setStyle('font', e.options[e.selectedIndex].value);
}
function onFontSize(e) { setStyle('fontsize', e.value + 'em'); }
function onFzNavbar(e) { setStyle('fzTop', e.value + 'em'); }
function onFwNavbar(e) { setStyle('fwTop', e.checked ? 'bold' : 'normal'); }
function onFsNavbar(e) { setStyle('fsTop', e.checked ? 'italic' : 'normal'); }
function onFzTitle(e) { setStyle('fzSub', e.value + 'em'); }
function onFwTitle(e) { setStyle('fwSub', e.checked ? 'bold' : 'normal'); }
function onFsTitle(e) { setStyle('fsSub', e.checked ? 'italic' : 'normal'); }
function onFzContent(e) { setStyle('fzCenter', e.value + 'em'); }
function onFwContent(e) { setStyle('fwCenter', e.checked ? 'bold' : 'normal'); }
function onFsContent(e) { setStyle('fsCenter', e.checked ? 'italic' : 'normal'); }
function onFzFooter(e) { setStyle('fzBottom', e.value + 'em'); }
function onFwFooter(e) { setStyle('fwBottom', e.checked ? 'bold' : 'normal'); }
function onFsFooter(e) { setStyle('fsBottom', e.checked ? 'italic' : 'normal'); }
function onFzForm(e) { setStyle('fzForm', e.value + 'em'); }
function onFwForm(e) { setStyle('fwForm', e.checked ? 'bold' : 'normal'); }
function onFsForm(e) { setStyle('fsForm', e.checked ? 'italic' : 'normal'); }
function onFzButton(e) { setStyle('fzButton', e.value + 'em'); }
function onFwButton(e) { setStyle('fwButton', e.checked ? 'bold' : 'normal'); }
function onFsButton(e) { setStyle('fsButton', e.checked ? 'italic' : 'normal'); }
function onFzInput(e) { setStyle('fzInput', e.value + 'em'); }
function onFwInput(e) { setStyle('fwInput', e.checked ? 'bold' : 'normal'); }
function onFsInput(e) { setStyle('fsInput', e.checked ? 'italic' : 'normal'); }
function onFzTools(e) { setStyle('fzTools', e.value + 'em'); }
function onFwTools(e) { setStyle('fwTools', e.checked ? 'bold' : 'normal'); }
function onFsTools(e) { setStyle('fsTools', e.checked ? 'italic' : 'normal'); }
