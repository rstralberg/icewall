
const LOGIN_USERNAME = 'login-username';
const LOGIN_PASSWORD = 'login-password';

var loginForm = '';
function onLogin() {
    if( loginForm.length > 0 ) return;
    webForm('login').then( (formname) => {loginForm=formname;});
}

function onLoginApply() {

    verifyLogin(
        document.getElementById(LOGIN_USERNAME).value,
        document.getElementById(LOGIN_PASSWORD).value
    ).then(
        (resolve) => {
            closeForm(loginForm);
            let user = JSON.parse(resolve);

            Cookie.username = user.username;
            Cookie.isAdmin = user.isAdmin;
            Cookie.logo = user.picture;
            Cookie.permPages = user.permPages;
            Cookie.permBlocks = user.permBlocks;
            Cookie.permUsers = user.permUsers;
            Cookie.permThemes = user.permThemes;
            Cookie.permSettings = user.permSettings;
            
            getNavbar(Cookie.username);
            getPageTitle(Cookie.pageId, Cookie.username);
        },
        (reject) => {
            closeForm(loginForm);
            loginForm = '';
            popup('FEL', reject);
        }
    )
}

function onLoginClose() {
    closeForm(loginForm);
    loginForm = '';
}


