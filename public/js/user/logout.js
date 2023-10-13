
function onLogout() {
    webForm('logout',{
        username: Session.user.username
    });
}


function logoutSelected() {
    closeLogout();
    Session.user = null;
    let page = Session.page;
    Cookie.username = '';
    getNavbar('');
    getPageTitle(page.id, '');
}

function closeLogout() {
    closeForm('logout');
}

