//  =====================================
//  Support for user/html/login.html form
//  =====================================
function closeLogin() {
    closeForm('login');
}
function loginNameChange() {
    var _a, _b;
    (_a = eGet('#li-password')) === null || _a === void 0 ? void 0 : _a.removeAttribute('disabled');
    (_b = eGet('#li-password')) === null || _b === void 0 ? void 0 : _b.focus();
}
function loginPasswordChange() {
    var _a, _b;
    (_a = eGet('#li-login')) === null || _a === void 0 ? void 0 : _a.removeAttribute('disabled');
    (_b = eGet('#li-login')) === null || _b === void 0 ? void 0 : _b.focus();
}
function loginExeute() {
    let request = new SrvReq('verifyUser', [
        { key: 'username', value: eGetValue('#li-username') },
        { key: 'password', value: eGetValue('#li-password') }
    ]);
    request.send().then((result) => {
        closeLogin();
        let user = JSON.parse(result);
        Session.user = user;
        Cookie.username = Session.user.username;
        getTop();
        getSub(Session.page.id);
        let left = eGet('.left');
        if (left)
            left.style.display =
                Session.user.isAdmin ||
                    Session.user.username === Session.page.author ?
                    'block' : 'none';
        let right = eGet('.right');
        if (right)
            right.style.display =
                Session.user.isAdmin ?
                    'block' : 'none';
    }, (err) => {
        popup(err);
        closeLogin();
    });
}
