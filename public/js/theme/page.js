
function getPageTheme(pageId) {
    let request = new Request('getPageTheme', {
        pageId: pageId
    });
    request.send().then(
        (resolve) => { 
            if( resolve.status === 'ok')
                updatePageTheme( JSON.parse(resolve.content)); 
            else 
                alert(resolve.content);
            },

        (reject) => { alert(reject); });
}


function updatePageTheme(theme) {

    set_style('wContent', theme.wContent+'%');
    set_style('rContent', theme.rContent+'px');
    set_style('shContent', theme.shContent);
    set_style('bdColContent', theme.bdColContent);
    set_style('bdSizeContent', theme.bdSizeContent);
    set_style('bgContent', theme.bgContent);
    set_style('fgContent', theme.fgContent);
    set_style('fzContent', theme.fzContent+'em');
    set_style('fwContent', theme.fwContent);
    set_style('fsContent', theme.fsContent);
    set_style('fontContent', theme.fontContent);

}

