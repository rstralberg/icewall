
function onLogout() {
    webForm('logout',{
        username: Session.user.username
    });
}

function closeLogout() {
    closeForm('logout');
}

function logoutSelected() {
    closeLogout();
    Session.user = null;
    let page = Session.page;
    Cookie.username = '';
    getNavbar('');
    getPageTitle(page.id, '');
}

