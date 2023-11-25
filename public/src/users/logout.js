function logout() {

    server('users/logout_form', {
        username: get_session_user().username
    }).then(
        (resolve) => {
            add_form('logout-form', resolve, 30 );
        }
    );
}


function on_logout() {
    remove_form('logout-form');
    set_session_user(null);
    get_avatar();
}

function logout_close() {
    remove_form('logout-form');
}
