function editColors(name) {
    getColors(name).then((colors) => {
        webForm('colorEditor', [
            { key: 'name', value: name },
            { key: 'bg', value: colors.bg },
            { key: 'fg', value: colors.fg },
            { key: 'bgHi', value: colors.bgHi },
            { key: 'fgHi', value: colors.fgHi },
        ]);
    }, (err) => { error(err); });
}
function closeColors() {
    closeForm('editColors');
}
function onBgApp(e) { setStyle('bgApp', e.value); }
function onFgApp(e) { setStyle('fgApp', e.value); }
function onBgNavbar(e) { setStyle('bgTop', e.value); }
function onFgNavbar(e) { setStyle('fgTop', e.value); }
function onBgHover(e) { setStyle('bgInputHover', e.value); }
function onFgHover(e) { setStyle('fgInputHover', e.value); }
function onBgTitle(e) { setStyle('bgSub', e.value); }
function onFgTitle(e) { setStyle('fgSub', e.value); }
// function onBgContent(e) { setStyle('bgCenter', e.value ); }
// function onFgContent(e) { setStyle('fgCenter', e.value ); }
function onBgFooter(e) { setStyle('bgBars', e.value); }
function onFgFooter(e) { setStyle('fgBars', e.value); }
function onBgForm(e) { setStyle('bg', e.value); }
function onFgForm(e) { setStyle('fg', e.value); }
function onBgButton(e) { setStyle('bgButton', e.value); }
function onFgButton(e) { setStyle('fgButton', e.value); }
function onBgInput(e) { setStyle('bgInput', e.value); }
function onFgInput(e) { setStyle('fgInput', e.value); }
function onBgTools(e) { setStyle('bgTools', e.value); }
function onFgTools(e) { setStyle('fgTools', e.value); }
