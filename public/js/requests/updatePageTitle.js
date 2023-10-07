
function updatePageTitle(pageId, title) {
    
    return new Promise((resolve, reject) => {
        let request = new Request('updatePageTitle', {
            pageId: pageId,
            title: title
        });
        request.send().then(
            (result) => {
                if( result.status === 'ok' ) {
                    getNavbar(Cookie.username);
                    getPageTitle(Cookie.pageId,Cookie.username);
                    resolve();
                }
            },
            (error) => { 
                popup('FEL', error);
                reject();
            }
        );
    });
}