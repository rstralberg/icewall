function object2Styles(obj) {
    setStyle('name', '"' + obj.name + '"');
    setStyle('wCenter', obj.wCenter + '%');
    setStyle('vGap', obj.vGap + 'px');
    setStyle('hGap', obj.hGap + 'px');
    setStyle('hTop', obj.hTop + 'fr');
    setStyle('hSub', obj.hSub + 'fr');
    setStyle('hBottom', obj.hBottom + 'fr');
    setStyle('bg', obj.bg);
    setStyle('fg', obj.fg);
    setStyle('bgBars', obj.bgBars);
    setStyle('fgBars', obj.fgBars);
    setStyle('bgMenuHover', obj.bgMenuHover);
    setStyle('fgMenuHover', obj.fgMenuHover);
    setStyle('bgTitle', obj.bgTitle);
    setStyle('fgTitle', obj.fgTitle);
    setStyle('bgButton', obj.bgButton);
    setStyle('fgButton', obj.fgButton);
    setStyle('bgButtonHover', obj.bgButtonHover);
    setStyle('fgButtonHover', obj.fgButtonHover);
    setStyle('bgButtonDisabled', obj.bgButtonDisabled);
    setStyle('fgButtonDisabled', obj.fgButtonDisabled);
    setStyle('fgLink', obj.fgLink);
    setStyle('bgInput', obj.bgInput);
    setStyle('fgInput', obj.fgInput);
    setStyle('bgInputHover', obj.bgInputHover);
    setStyle('fgInputHover', obj.fgInputHover);
    setStyle('bgInputDisabled', obj.bgInputDisabled);
    setStyle('fgInputDisabled', obj.fgInputDisabled);
    setStyle('fzTop', obj.fzTop + 'em');
    setStyle('fzSub', obj.fzSub + 'em');
    setStyle('fzBottom', obj.fzBottom + 'em');
    setStyle('fzButton', obj.fzButton + 'em');
    setStyle('fzInput', obj.fzInput + 'em');
    setStyle('fwBottom', obj.fwBottom);
    setStyle('fwSub', obj.fwSub);
    setStyle('fwBottom', obj.fwBottom);
    setStyle('fwButton', obj.fwButton);
    setStyle('fwInput', obj.fwInput);
    setStyle('fwButton', obj.fwButton);
    setStyle('fsBottom', obj.fsBottom);
    setStyle('font', '"' + obj.font + '"');
    setStyle('wContent', obj.wContent + '%');
    setStyle('dCenter', obj.dCenter + 'vh');
    setStyle('rRoundness', obj.rRoundness + 'px');
    setStyle('shadows', obj.shadows);
    setStyle('imgShadows', obj.imgShadows);
    setStyle('borderColor', obj.borderColor);
    setStyle('borderWidth', obj.borderWidth + 'px');
    setStyle('bgCenter', obj.bgCenter);
    setStyle('bgCenterActive', obj.bgCenterActive);
    setStyle('fgCenter', obj.fgCenter);
    setStyle('fzCenter', obj.fzCenter);
}
function styles2Object() {
    return {
        name: getStyle('name'),
        wCenter: parseInt(getStyle('wCenter')),
        vGap: parseInt(getStyle('vGap')),
        hGap: parseInt(getStyle('hGap')),
        hTop: parseFloat(getStyle('hTop')),
        hSub: parseFloat(getStyle('hSub')),
        hBottom: parseFloat(getStyle('hBottom')),
        bg: getStyle('bg'),
        fg: getStyle('fg'),
        bgBars: getStyle('bgBars'),
        fgBars: getStyle('fgBars'),
        bgMenuHover: getStyle('bgMenuHover'),
        fgMenuHover: getStyle('fgMenuHover'),
        bgTitle: getStyle('bgTitle'),
        fgTitle: getStyle('fgTitle'),
        bgButton: getStyle('bgButton'),
        fgButton: getStyle('fgButton'),
        bgButtonHover: getStyle('bgButtonHover'),
        fgButtonHover: getStyle('fgButtonHover'),
        bgButtonDisabled: getStyle('bgButtonDisabled'),
        fgButtonDisabled: getStyle('fgButtonDisabled'),
        fgLink: getStyle('fgLink'),
        bgInput: getStyle('bgInput'),
        fgInput: getStyle('fgInput'),
        bgInputHover: getStyle('bgInputHover'),
        fgInputHover: getStyle('fgInputHover'),
        bgInputDisabled: getStyle('bgInputDisabled'),
        fgInputDisabled: getStyle('fgInputDisabled'),
        fzTop: parseInt(getStyle('fzTop')),
        fzSub: parseInt(getStyle('fzSub')),
        fzBottom: parseInt(getStyle('fzBottom')),
        fzButton: parseInt(getStyle('fzButton')),
        fzInput: parseInt(getStyle('fzInput')),
        fwBottom: getStyle('fwBottom'),
        fwSub: getStyle('fwSub'),
        // fwBottom: getStyle('fwBottom'),
        fwButton: getStyle('fwButton'),
        fwInput: getStyle('fwInput'),
        // fwButton: getStyle('fwButton'),
        fsBottom: getStyle('fsBottom'),
        font: getStyle('font'),
        wContent: parseInt(getStyle('wContent')),
        dCenter: parseInt(getStyle('dCenter')),
        rRoundness: parseInt(getStyle('rRoundness')),
        shadows: parseInt(getStyle('shadows')),
        imgShadows: parseInt(getStyle('imgShadows')),
        borderColor: getStyle('borderColor'),
        borderWidth: parseInt(getStyle('borderWidth')),
        bgCenter: getStyle('bgCenter'),
        bgCenterActive: getStyle('bgCenterActive'),
        fgCenter: getStyle('fgCenter'),
        fzCenter: parseInt(getStyle('fzCenter'))
    };
}
function styles2ValueArray() {
    return new Array(sqlString(getStyle('name')), parseInt(getStyle('wCenter')), parseInt(getStyle('vGap')), parseInt(getStyle('hGap')), parseFloat(getStyle('hTop')), parseFloat(getStyle('hSub')), parseFloat(getStyle('hBottom')), sqlString(getStyle('bg')), sqlString(getStyle('fg')), sqlString(getStyle('bgBars')), sqlString(getStyle('fgBars')), sqlString(getStyle('bgMenuHover')), sqlString(getStyle('fgMenuHover')), sqlString(getStyle('bgTitle')), sqlString(getStyle('fgTitle')), sqlString(getStyle('bgButton')), sqlString(getStyle('fgButton')), sqlString(getStyle('bgButtonHover')), sqlString(getStyle('fgButtonHover')), sqlString(getStyle('bgButtonDisabled')), sqlString(getStyle('fgButtonDisabled')), sqlString(getStyle('fgLink')), sqlString(getStyle('bgInput')), sqlString(getStyle('fgInput')), sqlString(getStyle('bgInputHover')), sqlString(getStyle('fgInputHover')), sqlString(getStyle('bgInputDisabled')), sqlString(getStyle('fgInputDisabled')), parseInt(getStyle('fzTop')), parseInt(getStyle('fzSub')), parseInt(getStyle('fzBottom')), parseInt(getStyle('fzButton')), parseInt(getStyle('fzInput')), sqlString(getStyle('fwBottom')), sqlString(getStyle('fwSub')), sqlString(getStyle('fwBottom')), sqlString(getStyle('fwButton')), sqlString(getStyle('fwInput')), sqlString(getStyle('fwButton')), sqlString(getStyle('fsBottom')), sqlString(getStyle('font')), parseInt(getStyle('wContent')), parseInt(getStyle('dCenter')), parseInt(getStyle('rRoundness')), parseInt(getStyle('shadows')), parseInt(getStyle('imgShadows')), sqlString(getStyle('borderColor')), parseInt(getStyle('borderWidth')), sqlString(getStyle('bgCenter')), sqlString(getStyle('bgCenterActive')), sqlString(getStyle('fgCenter')), parseInt(getStyle('fzCenter')));
}
