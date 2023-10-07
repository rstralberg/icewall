
var logoutForm = '';
function onLogout() {
    if( logoutForm.length > 0 ) return;
    webForm('logout',{
        username: Cookie.username
    }). 
    then( (formname) => { logoutForm = formname;})
}


function onLogoutApply() {
    closeForm(logoutForm);
    Cookie.username = null;
    Cookie.isAdmin = false;
    Cookie.logo = '/icons/grafitgubben-512x512.png';
            
    getNavbar('');
    getPageTitle(Cookie.pageId, '');
}

function onLogoutClose() {
    closeForm(logoutForm);
    logoutForm = '';
}

