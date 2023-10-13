
function index(pageId) {

    // Load any user logged in
    let user = Session.user;
    if( user.username === '' ) {
        let username = Cookie.username;
        if( username && username.length > 0 ) {
            getUser(username).then( (reply) => { 
                Session.user = reply; 
            });
        }
    }

    // Open up tools for valid users
    user = Session.user;
    document.querySelector('.left').style.display = user.permContent ? 'block' : 'none';
    document.querySelector('.right').style.display = user.permSettings ? 'block' : 'none';
    
    // Load current page and then draw everyting
    getPage(pageId).then(
        (page) => {
            Session.page = page;
            getNavbar(user.username);
            getPageTitle(pageId,user.username);
            getContents(pageId);
            getFooter();

            let rtPublic = document.getElementById('rt-public');
            if( isValid( rtPublic ) ) {
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