function login() {
    server('users/login_form', {}).then(
        (resolve) => {
            add_form('login-form', resolve);
        },
        (reject) => { alert(reject); });
}


function on_login() {

    server( 'users/login', {
        username: document.getElementById('li-username').value,
        password: document.getElementById('li-password').value
    }).then( 
        (resolve) => {
            let user = JSON.parse(resolve);
            set_session_user(user);
            get_avatar();
            on_close_login();
        },
        (reject) => {
            on_close_login();
        }
    );

}

function on_close_login() {
    remove_form('login-form');
}

