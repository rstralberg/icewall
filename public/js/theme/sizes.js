

function onEditSizes() {
    webForm('th_sizes', {
        wLeft: parseFloat(get_style( 'wLeft' )),
        wCenter: parseFloat(get_style( 'wCenter')),
        wRight: parseFloat(get_style( 'wRight')),
        hApp: parseInt(get_style( 'hApp' )),
        hNavbar: parseFloat(get_style( 'hNavbar' )),
        hFooter: parseFloat(get_style( 'hFooter' )),
        vGap: parseInt(get_style( 'vGap' )),
        hGap: parseInt(get_style( 'hGap' )),
        dContent: parseInt(get_style( 'dContent' )),
        wContent: parseInt(get_style( 'wContent' )),
    });
}

function closeSizes() {
    closeForm('th_sizes');
}

function onWLeft(e) { set_style('wLeft', e.value + 'fr');}
function onWCenter(e) { set_style('wCenter', e.value + 'fr' );}
function onWRight(e) { set_style('wRight', e.value + 'fr' );}
function onHApp(e) { set_style('hApp', e.value  + 'vh');}
function onHNavbar(e) { set_style('hNavbar', e.value + 'fr' );}
function onHFooter(e) { set_style('hFooter', e.value  + 'fr');}
function onVGap(e) { set_style('vGap', e.value  + 'px');}
function onGGap(e) { set_style('gGap', e.value  + 'px');}
function onDContent(e) { set_style('dContent', e.value + 'vh' );}
function onWContent(e) { set_style('wContent', e.value + '%' );}
