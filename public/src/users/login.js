function login() {
    server('show_login', {}).then(
        (resolve) => {
            add_form('login-form', resolve);
        },
        (reject) => { alert(reject); });
}


function on_login_username() {
    enable_element('li-password', document.getElementById('li-username').value.length>0);
}

function on_login_password() {
    enable_element('li-login', document.getElementById('li-password').value.length>0);
}

function on_login() {

    server( 'login', {
        username: document.getElementById('li-username').value,
        password: document.getElementById('li-password').value
    }).then( 
        (resolve) => {
            let user = JSON.parse(resolve);
            set_session_user(user);
            document.getElementById('navbar-logo').src = user.picture;
            get_top_menu();
            remove_form('login-form');
            usr_menu();
            adm_menu();
            
        },
        (reject) => {
            alert(reject);
            remove_form('login-form');
        }
    );

}

function on_close_login() {
    remove_form('login-form');
}

