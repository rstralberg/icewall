//  =====================================
//  Support for user/html/login.html form
//  =====================================

function closeLogin() {
    closeForm('login');
}

function evLoginUsername(passwordId) {
    document.getElementById(passwordId).removeAttribute('disabled');
}

function evLoginPassword(loginId) {
    document.getElementById(loginId).removeAttribute('disabled');
}

function login(usernameId, passwordId) {

    let request = new Request('verifyUser', {
            username: document.getElementById(usernameId).value,
            password: document.getElementById(passwordId).value
    });
    request.send().then(
    (result) => {
        closeLogin();
        if (result.ok) {
            
            let user = JSON.parse(result.content);

            Session.user = user;
            Cookie.username = Session.user.username;

            getNavbar();
            getPageTitle(Session.page.id);

            document.querySelector('.left').style.display = 
                Session.user.isAdmin || 
                Session.user.username === Session.page.author ?
                'block' : 'none';

            document.querySelector('.right').style.display = 
                Session.user.isAdmin ?
                'block' : 'none';
        }
        else {
            popup('Login', result.content );
        }
    },
    () => {
        closeLogin();
    });
}

