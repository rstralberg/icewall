const RENAME_PAGE_TITLE = 'renamepage-title';

function onPageTitle() {
    webForm('renamePage',{
        pageId: Session.page.id
    });
}

function onRenamePage() {
    onPageTitle();
}

function renamePage(id) {

    let title = document.getElementById(RENAME_PAGE_TITLE).value;
    updatePageTitle(id, title);
    closeRenamePage();
}

function closeRenamePage() {
    closeForm('renamePage');
}