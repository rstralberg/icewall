function getPageTitle(pageId, username) {
    let request = new Request('pagetitle', {
        pageId: pageId,
        username: username,
        showColor: get_style('titleActBg'),
        hideColor: get_style('titleBg')
    });
    request.send().then(
        (reply) => { 
            updateHtml('#pagetitle', reply.content); 
            Cookie.canEdit = document.getElementById('pagetitle-content').dataset.author === Cookie.username || Cookie.permBlocks ;
            if( !Cookie.canEdit) {
                document.getElementById('tools').style.display = 'none';
            }
            if( document.getElementById('pagetitle-content').style.display !== 'none' ) {
                document.querySelector('main').style.marginTop = '10vh';
            }
            else {
                document.querySelector('main').style.marginTop = '2vh';
            }
        
        },
        (reject) => { alert(reject); });
}
