
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


