//  ===================================================
//  Supports /php/framework/right/html/pages.html
//  ===================================================
//  ---------------------------------------------------
//  Delete a page
//  ---------------------------------------------------
function deletePage() {
    webForm('deletePage', [
        { key: 'isAdmin', value: Session.user.isAdmin },
        { key: 'username', value: Session.user.username }
    ]);
}
function pageDeleteSelected(e) {
    if (e.selectedIndex > 0) {
        eEnable('#dp-delete');
    }
}
function pageDelete() {
    let pageId = parseInt(eGetValue('#dp-pages'));
    let request = new SrvReq('removePage', [
        { key: 'pageId', value: pageId }
    ]);
    request.send().then((resolve) => {
        pageId = parseInt(resolve);
        if (pageId !== Session.page.id) {
            getPage(pageId).then((page) => {
                Session.page = page;
                getTop();
                getSub(Session.page.id);
            });
        }
        closeDeletePage();
    }, (reject) => {
        error(reject);
        closeDeletePage();
    });
}
function closeDeletePage() {
    closeForm('deletePage');
}
