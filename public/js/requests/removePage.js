
function removePage(pageId) {
    let request = new Request('removePage', {
        pageId: pageId
    });
    request.send().then(
        (resolve) => {
            if (resolve.status === 'ok') {
                let firstPageId = parseInt(resolve.content);
                if (pageId === Cookie.pageId) {
                    Cookie.pageId = firstPageId;
                }
                getNavbar(Cookie.username);
                getPageTitle(
                    Cookie.pageId,
                    Cookie.username);
            }
            else {
                popup('FEL', resolve.content);
            }
        },
        (reject) => { }
    );
}
