function index(pageId, sitekey, siteName) {

    Session.edit = false;
    Session.key = sitekey;
    Cookie.key(sitekey);
    Session.site = {
        key: sitekey,
        name: siteName
    };
    (_a = eGet('body')) === null || _a === void 0 ? void 0 : _a.addEventListener('keydown', (e) => {
        if (!Session.edit)
            e.preventDefault();
    });
    // Load any user logged in
    let left = eGet('.left');
    let right = eGet('.right');
    if (Session.user.username === '') {
        let username = Cookie.username;
        if (username && username.length > 0) {
            getUser(username).then((reply) => {
                Session.user = reply;
                left.style.display = Session.user.isAdmin || Session.user.username === Session.page.author ? 'block' : 'none';
                right.style.display = Session.user.isAdmin ? 'block' : 'none';
            });
        }
    }
    else {
        left.style.display = Session.user.isAdmin || Session.user.username === Session.page.author ? 'block' : 'none';
        right.style.display = Session.user.isAdmin ? 'block' : 'none';
    }
    // Load current page and then draw everyting
    getPage(pageId).then((page) => {
        Session.page = page;
        loadPageTheme(pageId);
        getTop();
        getSub(pageId);
        getContents(pageId);
        bottom();
        let rtPublic = document.getElementById('rt-public');
        if (isValid(rtPublic)) {
            rtPublic.innerText = Session.page.publ ? 'Intern' : 'Publik';
        }
    }, (err) => {
        error(err);
    });
}
function bavClick(e) {
    e.preventDefault();
}
