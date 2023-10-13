
const DELETE_PAGE_SELECT = 'deletepage-pages';

function onDeletePage() {
    webForm('delPage', {
        username: Session.user.username,
        isAdmin: canEdit('settings')
    });
}

function deletePage() {
    let select = document.getElementById(DELETE_PAGE_SELECT);
    let value = select.options[select.selectedIndex].value;
    let pageId = parseInt(value);

    removePage(pageId);
    closeDeletePage();
}

function closeDeletePage() {
    closeForm('delPage');
}


function removePage(pageId) {
    let request = new Request('removePage', {
        pageId: pageId
    });
    request.send().then(
        (resolve) => {
            if (resolve.status === 'ok') {
                let firstPageId = parseInt(resolve.content);
                if (pageId === Session.page.id) {
                    getPage(firstPageId).then(
                        (page) => { Session.page = page; }
                    );
                }
                getNavbar(Session.user.username);
                getPageTitle(
                    Session.page.id,
                    Session.user.username);
            }
            else {
                popup('FEL', resolve.content);
            }
        },
        (reject) => { }
    );
}
