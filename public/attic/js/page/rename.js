const RENAME_PAGE_TITLE = 'renamepage-title';

function evRenamePage() {
    webForm('renamePage', { pageId: Session.page.id});
}

function evNewTitle(e) { 
    if( e.value.length > 0 ) 
        enable('rp-save');
    else 
        disable('rp-save');
}

function evSaveNewPageTitle(pageId) {
    updatePageTitle(pageId, getElemValue('rp-new'));
    closeRenamePage();
}

function closeRenamePage() {
    closeForm('renamePage');
}