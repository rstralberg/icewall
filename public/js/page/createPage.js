const CREATE_PAGE_TITLE = 'createpage-title';
const CREATE_PAGE_PLACEMENT = 'createpage-placement';
const CREATE_PAGE_SHOW = 'createpage-show';

var createPageForm = '';

function onCreatePage() {
    if( createPageForm.length > 0 ) return;
    webForm('createPage'). 
    then( (formname) => { createPageForm = formname; } );
}

function onCreatePageApply() {
    let title = document.getElementById(CREATE_PAGE_TITLE).value;
    let ePlacement = document.getElementById(CREATE_PAGE_PLACEMENT);
    let placement = ePlacement.options[ePlacement.selectedIndex].value;
    let showTitle = document.getElementById(CREATE_PAGE_SHOW).checked;

    if (placement === 'none') {
        alert('Du måste välja placering!');
        return;
    }

    var isParent = false;
    var parentId = 0;
    if (placement === 'top') {
        isParent = false;
        parentId = 0;
    }
    else if (placement === 'parent') {
        isParent = true;
        parentId = 0;
    }
    else {
        isParent = false;
        parentId = parseInt(placement);
    }

    saveNewPage(parentId, isParent, title, showTitle );
    closeForm(createPageForm);
    createPageForm='';
}

function onCreatePageClose() {
    closeForm(createPageForm);
    createPageForm='';
} 