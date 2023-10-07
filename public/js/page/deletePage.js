const DELETE_PAGE_REQUEST = 'deletePage';
const DELETE_PAGE_FORM = 'deletePageForm';
const DELETE_PAGE_SELECT = 'deletepage-pages';

var deletePageForm = '';

function onDeletePage() {
    if( deletePageForm.length > 0 ) return;
    webForm('deletePage', {
        username: Cookie.username,
        isAdmin: Cookie.isAdmin
    }).then( 
        (formName) => { deletePageForm = formName; } );
}

function onDeletePageApply() {
    let select = document.getElementById(DELETE_PAGE_SELECT);
    let value = select.options[select.selectedIndex].value;
    let pageId = parseInt(value);

    removePage(pageId);
    closeForm(deletePageForm);
    deletePageForm = '';
}

function onDeletePageClose() {
    closeForm(deletePageForm);
    deletePageForm = '';
}