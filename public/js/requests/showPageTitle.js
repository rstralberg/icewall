
function showTitle() {
    let request = new Request('showPageTitle', {
        pageId: Cookie.pageId 
    });
    request.send().then( 
        (resolve) => {
            getPageTitle(Cookie.pageId,Cookie.username);
        },
        (reject) => {alert(reject);}
    );

}