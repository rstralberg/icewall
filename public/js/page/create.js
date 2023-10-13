const CREATE_PAGE_TITLE = 'createpage-title';
const CREATE_PAGE_PLACEMENT = 'createpage-placement';
const CREATE_PAGE_SHOW = 'createpage-show';

function onCreatePage() {
    webForm('createNewPage');
}

function createPage() {
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
    closeCreatePage();
}

function closeCreatePage() {
    closeForm('createNewPage');
} 


function saveNewPage(parentId, isParent, title, showTitle, pub = false) {
    let request = new Request('saveNewPage', {
        parentId: parentId,
        isParent: isParent,
        title: title,
        author: Session.user.username,
        pos: 0,
        showTitle: showTitle,
        public: pub,
        style: 'Standard'
    });
    request.send().then(
        (resolve) => {
            if (resolve.status === 'ok') {
                getNavbar(Session.user.username);
                getPageTitle(
                    Session.page.id,
                    canEdit('page'),
                    Session.user.username,
                    canEdit('settings'));
            }
            else {
                alert(resolve.content);
            }
        },
        (reject) => { },
    );
}