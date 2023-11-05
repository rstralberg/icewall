function on_user_logout() {
    server('show_logout', {
        username: get_session_user().username
    }).then(
        (resolve) => {
            add_form('logout-form', resolve);
        },
        (reject) => { alert(reject); });
}


function on_logout() {
    set_session_user(null);
    query_id('navbar-logo').src = get_session_site().logo;
}

function on_edit_account() {

}

function on_change_password() {

}

function on_delete_account() {

}

function on_close_logout() {

}

