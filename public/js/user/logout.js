//  =====================================
//  Support for user/html/logout.html form
//  =====================================


function evLogout() {
    webForm('logout', { username: Session.user.username });
}

function closeLogout() {
    closeForm('logout');
}

function evLogoutSelect() {
    closeLogout();

    Session.user = null;
    Cookie.username = '';

    getNavbar();
    getPageTitle(Session.page.id);
}

