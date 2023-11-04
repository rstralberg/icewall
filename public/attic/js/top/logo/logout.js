//  =====================================
//  Support for user/html/logout.html form
//  =====================================
function evLogout() {
    webForm('logout', [
        { key: 'username', value: Session.user.username }
    ]);
}
function closeLogout() {
    closeForm('logout');
}
function evLogoutSelect() {
    closeLogout();
    Session.user.username = '';
    Cookie.username = '';
    getTop();
    getSub(Session.page.id);
}
