function editPageTheme() {
    webForm('editPageTheme', [
        { key: 'pageId', value: Session.page.id }
    ]);
}
function pageStyles2ValueArray() {
    return new Array(parseInt(getStyle('wContent')), parseInt(getStyle('rRoundness')), parseInt(getStyle('shadows')), sqlString(getStyle('borderColor')), parseInt(getStyle('borderWidth')), sqlString(getStyle('bgCenter')), sqlString(getStyle('fgCenter')), parseFloat(getStyle('fzCenter')), parseInt(getStyle('dCenter')));
}
function object2PageStyle(obj) {
    setStyle('wContent', obj.wContent + '%');
    setStyle('dCenter', obj.dCenter + 'vh');
    setStyle('rRoundness', obj.rRoundness + 'px');
    setStyle('shadows', obj.shadows);
    setStyle('borderColor', obj.borderColor);
    setStyle('borderWidth', obj.borderWidth + 'px');
    setStyle('bgCenter', obj.bgCenter);
    setStyle('fgCenter', obj.fgCenter);
    setStyle('fzCenter', obj.fzCenter + 'em');
}
function savePageTheme() {
    let theme = pageStyles2ValueArray();
    updatePageTheme(theme);
}
function closePageTheme() {
    closeForm('editPageTheme');
}
// function onWContent(e) { setStyle('WContent', e.value); }
// function onRContent(e) { setStyle('RContent', e.value); }
function onBdColContent(e) { setStyle('BdColContent', e.value); }
// function onBdSizeContent(e) { setStyle('BdSizeContent', e.value); }
// function onShContent(e) { setStyle('ShContent', e.value); }
function onBgContent(e) { setStyle('BgContent', e.value); }
function onFgContent(e) { setStyle('FgContent', e.value); }
// function onFzContent(e) { setStyle('FzContent', e.value); }
// function onDContent(e) { setStyle('DContent', e.value); }
