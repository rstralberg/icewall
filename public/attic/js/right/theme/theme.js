function loadTheme(themeName) {
    getTheme(themeName).then((resolve) => {
        let theme = resolve;
        setStyle('name', theme['name'] + '');
        setStyle('wLeft', theme['wLeft'] + 'fr');
        setStyle('wCenter', theme['wCenter'] + 'fr');
        setStyle('wRight', theme['wRight'] + 'fr');
        setStyle('wContent', theme['wContent'] + '%');
        setStyle('vGap', theme['vGap'] + 'px');
        setStyle('hGap', theme['hGap'] + 'px');
        setStyle('hApp', theme['hApp'] + 'vh');
        setStyle('hTop', theme['hTop'] + 'fr');
        setStyle('hSub', theme['hSub'] + 'fr');
        setStyle('hBottom', theme['hBottom'] + 'fr');
        setStyle('dCenter', theme['dCenter'] + 'vh');
        setStyle('rTop', theme['rTop'] + 'px');
        setStyle('rRoundness', theme['rRoundness'] + 'px');
        setStyle('rRoundness', theme['rRoundness'] + 'px');
        setStyle('rRoundness', theme['rRoundness'] + 'px');
        setStyle('rForm', theme['rForm'] + 'px');
        setStyle('rInput', theme['rInput'] + 'px');
        setStyle('rTools', theme['rTools'] + 'px');
        setStyle('rRoundness', theme['rRoundness'] + 'px');
        setStyle('shTop', theme['shTop']);
        setStyle('shadows', theme['shadows']);
        setStyle('shadows', theme['shadows']);
        setStyle('shadows', theme['shadows']);
        setStyle('shForm', theme['shForm']);
        setStyle('shadows', theme['shadows']);
        setStyle('shInput', theme['shInput']);
        setStyle('shTools', theme['shTools']);
        setStyle('bdColTop', theme['bdColTop']);
        setStyle('borderColor', theme['borderColor']);
        setStyle('borderColor', theme['borderColor']);
        setStyle('borderColor', theme['borderColor']);
        setStyle('borderColor', theme['borderColor']);
        setStyle('borderColor', theme['borderColor']);
        setStyle('bdColInput', theme['bdColInput']);
        setStyle('bdColTools', theme['bdColTools']);
        setStyle('bdSizeTop', theme['bdSizeTop'] + 'px');
        setStyle('borderWidth', theme['borderWidth'] + 'px');
        setStyle('borderWidth', theme['borderWidth'] + 'px');
        setStyle('borderWidth', theme['borderWidth'] + 'px');
        setStyle('borderWidth', theme['borderWidth'] + 'px');
        setStyle('borderWidth', theme['borderWidth'] + 'px');
        setStyle('bdSizeInput', theme['bdSizeInput'] + 'px');
        setStyle('bdSizeTools', theme['bdSizeTools'] + 'px');
        setStyle('bgTop', theme['bgTop'] + '');
        setStyle('bgSub', theme['bgSub'] + '');
        setStyle('bgCenter', theme['bgCenter'] + '');
        setStyle('bgBars', theme['bgBars'] + '');
        setStyle('bg', theme['bg'] + '');
        setStyle('bgButton', theme['bgButton'] + '');
        setStyle('bgInput', theme['bgInput'] + '');
        setStyle('bgInputHover', theme['bgInputHover'] + '');
        setStyle('bgTools', theme['bgTools'] + '');
        setStyle('fgApp', theme['fgApp'] + '');
        setStyle('fgTop', theme['fgTop'] + '');
        setStyle('fgSub', theme['fgSub'] + '');
        setStyle('fgCenter', theme['fgCenter'] + '');
        setStyle('fgBars', theme['fgBars'] + '');
        setStyle('fg', theme['fg'] + '');
        setStyle('fgButton', theme['fgButton'] + '');
        setStyle('fgInput', theme['fgInput'] + '');
        setStyle('fgInputHover', theme['fgInputHover'] + '');
        setStyle('fgTools', theme['fgTools'] + '');
        setStyle('fzTop', theme['fzTop'] + 'em');
        setStyle('fzSub', theme['fzSub'] + 'em');
        setStyle('fzCenter', theme['fzCenter'] + 'em');
        setStyle('fzBottom', theme['fzBottom'] + 'em');
        setStyle('fzForm', theme['fzForm'] + 'em');
        setStyle('fzButton', theme['fzButton'] + 'em');
        setStyle('fzInput', theme['fzInput'] + 'em');
        setStyle('fzTools', theme['fzTools'] + 'em');
        setStyle('fwTop', theme['fwTop']);
        setStyle('fwSub', theme['fwSub']);
        setStyle('fwCenter', theme['fwCenter']);
        setStyle('fwBottom', theme['fwBottom']);
        setStyle('fwForm', theme['fwForm']);
        setStyle('fwButton', theme['fwButton']);
        setStyle('fwInput', theme['fwInput']);
        setStyle('fwTools', theme['fwTools']);
        setStyle('fsTop', theme['fsTop']);
        setStyle('fsSub', theme['fsSub']);
        setStyle('fsCenter', theme['fsCenter']);
        setStyle('fsBottom', theme['fsBottom']);
        setStyle('fsForm', theme['fsForm']);
        setStyle('fsButton', theme['fsButton']);
        setStyle('fsInput', theme['fsInput']);
        setStyle('fsTools', theme['fsTools']);
        setStyle('font', theme['font']);
        setStyle('fontsize', theme['fontsize'] + 'em');
        setStyle('iconsfolder', theme['iconsfolder']);
    }, (err) => { error(err); });
}