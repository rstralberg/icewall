function on_user_login() {
    server('show_login', {}).then(
        (resolve) => {
            add_form('login-form', resolve);
        },
        (reject) => { alert(reject); });
}


function on_login_username() {
    enable_element('li-password', query_value('li-username').length>0);
}

function on_login_password() {
    enable_element('li-login', query_value('li-password').length>0);
}

function on_login() {

    server( 'login', {
        username: query_value('li-username'),
        password: query_value('li-password')
    }).then( 
        (resolve) => {
            let user = JSON.parse(resolve);
            set_session_user(user);
            query_id('navbar-logo').src = user.picture;
            update_navbar();
            remove_form('login-form');
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

