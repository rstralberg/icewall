
function saveNewPage(parentId, isParent, title, showTitle, pub = false) {
    let request = new Request('saveNewPage', {
        parentId: parentId,
        isParent: isParent,
        title: title,
        author: Cookie.username,
        pos: 0,
        showTitle: showTitle,
        public: pub
    });
    request.send().then(
        (resolve) => {
            if (resolve.status === 'ok') {
                getNavbar(Cookie.username);
                getPageTitle(
                    Cookie.pageId,
                    Cookie.canedit,
                    Cookie.username,
                    Cookie.isAdmin);
            }
            else {
                alert(resolve.content);
            }
        },
        (reject) => { },
    );
}