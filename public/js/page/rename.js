const RENAME_PAGE_TITLE = 'renamepage-title';

function onRenamePage() {
    webForm('renamePage',{
        pageId: Session.page.id
    });
}

function renamePage(pageId, titleId) {

    let title = document.getElementById(titleId).value;
    updatePageTitle(pageId, title);
    closeRenamePage();
}

function closeRenamePage() {
    closeForm('renamePage');
}