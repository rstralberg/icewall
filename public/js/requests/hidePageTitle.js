
function hideTitle() {
    let request = new Request('hidePageTitle', {
        pageId: Cookie.pageId
    });
    request.send().then( 
        (resolve) => {
            getPageTitle(Cookie.pageId,Cookie.username);
        },
        (reject) => {alert(reject);}
    );

}