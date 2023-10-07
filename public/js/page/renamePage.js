const RENAME_PAGE_TITLE = 'renamepage-title';

var pageTitleForm = '';

function onPageTitle() {
    if( pageTitleForm.length > 0 ) return;
    webForm('renamePage',{
        pageId: Cookie.pageId
    }).
    then( (formname) => { pageTitleForm = formname;} );
}

function onRenamePage() {
    onPageTitle();
}

function onRenamePageApply(id) {

    let title = document.getElementById(RENAME_PAGE_TITLE).value;
    updatePageTitle(id, title);
    closeForm(pageTitleForm);
    pageTitleForm = '';
}

function onRenamePageClose() {
    closeForm(pageTitleForm);
    pageTitleForm = '';
}