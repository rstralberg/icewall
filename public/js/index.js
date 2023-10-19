
function index(pageId, sitekey, siteName) {

    Session.key = sitekey;
    Cookie.key(sitekey);

    Session.site = {
        key: sitekey,
        name: siteName
    };

    // Load any user logged in
    let left = document.querySelector('.left');
    let right = document.querySelector('.right');
    let user = Session.user;
    if (user === null) {
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
    getPage(pageId).then(
        (page) => {
            Session.page = page;
            loadPageTheme(pageId);
            getNavbar();
            getPageTitle(pageId);
            getContents(pageId);
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