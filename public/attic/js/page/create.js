const CREATE_PAGE_TITLE = 'createpage-title';
const CREATE_PAGE_PLACEMENT = 'createpage-placement';
const CREATE_PAGE_SHOW = 'createpage-show';

function evCreatePage() {
    webForm('createNewPage');
}

function createPage() {
    let title = getElemValue('cp-title');
    let placement = getElemValue('cp-placement');
    let showTitle = getElement('cp-showtitle').checked;
    let author = getElemValue('cp-author');

    if (placement === 'none') {
        alert('Du måste välja placering!');
        return;
    }

    let isParent = false;
    let parentId = 0;
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

    saveNewPage(parentId, isParent, title, showTitle, author);
    closeCreatePage();
}

function closeCreatePage() {
    closeForm('createNewPage');
} 


function saveNewPage(parentId, isParent, title, showTitle, author, pub = false) {
    let request = new Request('saveNewPage', {
        parentId: parentId,
        isParent: isParent,
        title: title,
        author: author,
        pos: document.querySelector('.links').childElementCount,
        showTitle: showTitle,
        public: pub
    });
    request.send().then(
        (resolve) => {
            if (resolve.ok) {
                getNavbar();
                getPageTitle(resolve.content);
            }
            else {
                alert(resolve.content);
            }
        },
        (reject) => { },
    );
}