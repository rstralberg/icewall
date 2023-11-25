//  =================================
//  DELETE ACCOUNT
//  =================================
function delete_account() {

    yesno('Radera kontot', 'Är du säker?', 'on_delete_account_yes', 'on_delete_account_yes');
}

function on_delete_account_yes() {
    close_yesno();

    server('delete_user', {
        username: document.getElementById('logout-username').value
    }).then(
        () => {
            set_session_user(null);
            get_top_menu();
        },
        (reject) => {
            error(reject);
        }
    );
}

function on_delete_account_no() {
    close_yesno();

}

