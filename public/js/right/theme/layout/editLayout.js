function editLayout() {
    webForm('editLayout', [
        { key: 'wLeft', value: parseFloat(getStyle('wLeft')) },
        { key: 'wCenter', value: parseFloat(getStyle('wCenter')) },
        { key: 'wRight', value: parseFloat(getStyle('wRight')) },
        { key: 'hApp', value: parseInt(getStyle('hApp')) },
        { key: 'hTop', value: parseFloat(getStyle('hTop')) },
        { key: 'hBottom', value: parseFloat(getStyle('hBottom')) },
        { key: 'vGap', value: parseInt(getStyle('vGap')) },
        { key: 'hGap', value: parseInt(getStyle('hGap')) },
        { key: 'dCenter', value: parseInt(getStyle('dCenter')) },
        { key: 'wContent', value: parseInt(getStyle('wContent')) }
    ]);
}
function closeSizes() {
    closeForm('editLayout');
}
function onWLeft(e) { setStyle('wLeft', e.value + 'fr'); }
function onWCenter(e) { setStyle('wCenter', e.value + 'fr'); }
function onWRight(e) { setStyle('wRight', e.value + 'fr'); }
function onHApp(e) { setStyle('hApp', e.value + 'vh'); }
function onHNavbar(e) { setStyle('hTop', e.value + 'fr'); }
function onHFooter(e) { setStyle('hBottom', e.value + 'fr'); }
function onVGap(e) { setStyle('vGap', e.value + 'px'); }
function onGGap(e) { setStyle('gGap', e.value + 'px'); }
function onDContent(e) { setStyle('dCenter', e.value + 'vh'); }
function onWContent(e) { setStyle('wContent', e.value + '%'); }
