
function index(pageId, sitekey, sitefolder, sitedb, siteName) {

    Session.key = sitekey;
    Cookie.key(sitekey);

    Session.site = {
        key: sitekey,
        folder: sitefolder,
        db: sitedb,
        name: siteName
    };

    // Load any user logged in
    let left = document.querySelector('.left');
    let right = document.querySelector('.right');
    let user = Session.user;
    if (user.username === '') {
        let username = Cookie.username;
        if (username && username.length > 0) {
            getUser(username).then((reply) => {
                Session.user = reply;
                left.style.display = Session.user.permContent ? 'block' : 'none';
                right.style.display = Session.user.permSettings ? 'block' : 'none';
            });
        }
    }
    else {
        left.style.display = user.permContent ? 'block' : 'none';
        right.style.display = user.permSettings ? 'block' : 'none';
    }

    // Load current page and then draw everyting
    getPage(pageId).then(
        (page) => {
            Session.page = page;
            loadPageTheme(Session.page.id);
            getNavbar(user.username);
            getPageTitle(Session.page.id, user.username);
            getContents(Session.page.id);
            getFooter();

            let rtPublic = document.getElementById('rt-public');
            if (isValid(rtPublic)) {
                rtPublic.innerText = Session.page.public === '0' ? 'Intern' : 'Publik';
            }

        },
        (error) => {
            popup('FEL', error);
        });

}

function bavClick(e) {
    e.preventDefault();

}