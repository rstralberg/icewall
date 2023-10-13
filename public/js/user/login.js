
const LOGIN_USERNAME = 'login-username';
const LOGIN_PASSWORD = 'login-password';

function onLogin() {
    webForm('login');
}

function loginSelected() {

    verifyLogin(
        document.getElementById(LOGIN_USERNAME).value,
        document.getElementById(LOGIN_PASSWORD).value
    ).then(
        (resolve) => {
            closeLogin();
            let user = JSON.parse(resolve);

            Session.user = user;
            let page = Session.page;
            Cookie.username = user.username;

            getNavbar(user.username);
            getPageTitle(page.id, user.username);

            document.querySelector('.left').style.display = canEdit('content') ? 'block' : 'none';
        document.querySelector('.right').style.display = canEdit('page')  ? 'block' : 'none';
        },
        (reject) => {
            closeLogin();
            popup('FEL', reject);
        }
    )
}

function closeLogin() {
    closeForm('login');
}


