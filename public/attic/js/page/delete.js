
function evDeletePage() {
    webForm('delPage', {
        isAdmin: Session.user.isAdmin,
        username: Session.user.username
    });
}

function evDeletePageSelected(e) {
    if( e.selectedIndex > 0 ) {
        enable('dp-delete');
    }
}

function evPageDelete() {
    let pageId = parseInt(getElemValue('dp-pages'));
    removePage(pageId);
    evCloseDeletePage();
}

function evCloseDeletePage() {
    closeForm('delPage');
}


