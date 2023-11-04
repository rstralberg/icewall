function index(pageId, sitekey, siteName) {

    
    Session.edit = false;
    Session.key = sitekey;
    Cookie.key(sitekey);
    Session.site = {
        key: sitekey,
        name: siteName
    };
    
    let body = eGet('body');
    body.addEventListener('keydown', (e) => {
        if (!Session.edit)
            e.preventDefault();
    });
    
    // Load any user logged in
    let left = eGet('.left');
    let right = eGet('.right');
    if (Session.user.username === '') {
        let username = Cookie.username;
        if (username && username.length > 0) {
            getUser(username).then((user) => {
                Session.user = user;
                left.style.display = Session.user.isAdmin || Session.user.username === Session.page.author ? 'block' : 'none';
                right.style.display = Session.user.isAdmin ? 'block' : 'none';
            });
        }
    }
    else {
        left.style.display = Session.user.isAdmin || Session.user.username === Session.page.author ? 'block' : 'none';
        right.style.display = Session.user.isAdmin ? 'block' : 'none';
    }

    // update navbar with available pages
    refreshNavbar();
    
    // Load current page and then draw everyting
    getpage(pageId);
        // Session.page = page;
        // loadPageTheme(pageId);
        // Navbar.refresh();
        // getSub(pageId);
        // getContents(pageId);
        // bottom();
        // let rtPublic = document.getElementById('rt-public');
        // if (isValid(rtPublic)) {
        //     rtPublic.innerText = Session.page.publ ? 'Intern' : 'Publik';
        // }
}
function bavClick(e) {
    e.preventDefault();
}