function onEditBorders() {
    webForm('editBorders', []);
}
function onBdColNavbar(e) { setStyle('bdColTop', e.value); }
function onBdSizeNavbar(e) { setStyle('bdSizeTop', e.value + 'px'); }
function onRNavbar(e) { setStyle('rTop', e.value + 'px'); }
function onBdColTitle(e) { setStyle('borderColor', e.value); }
function onBdSizeTitle(e) { setStyle('borderWidth', e.value + 'px'); }
function onRTitle(e) { setStyle('rRoundness', e.value + 'px'); }
// function onBdColContent(e) { setStyle('borderColor', e.value); }
function onBdSizeContent(e) { setStyle('borderWidth', e.value + 'px'); }
function onRContent(e) { setStyle('rRoundness', e.value + 'px'); }
function onBdColFooter(e) { setStyle('borderColor', e.value); }
function onBdSizeFooter(e) { setStyle('borderWidth', e.value + 'px'); }
function onRFooter(e) { setStyle('rRoundness', e.value + 'px'); }
function onBdColForm(e) { setStyle('borderColor', e.value); }
function onBdSizeForm(e) { setStyle('borderWidth', e.value + 'px'); }
function onRForm(e) { setStyle('rForm', e.value + 'px'); }
function onBdColButton(e) { setStyle('borderColor', e.value); }
function onBdSizeButton(e) { setStyle('borderWidth', e.value + 'px'); }
function onRButton(e) { setStyle('rRoundness', e.value + 'px'); }
function onBdColInput(e) { setStyle('bdColInput', e.value); }
function onBdSizeInput(e) { setStyle('bdSizeInput', e.value + 'px'); }
function onRInput(e) { setStyle('rInput', e.value + 'px'); }
function onBdColTools(e) { setStyle('bdColTools', e.value); }
function onBdSizeTools(e) { setStyle('bdSizeTools', e.value + 'px'); }
function onRTools(e) { setStyle('rTools', e.value + 'px'); }
function closeBorders() {
    closeForm('editBorders');
}
