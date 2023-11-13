function on_user_logout() {
    server('show_logout', {
        username: get_session_user().username
    }).then(
        (resolve) => {
            add_form('logout-form', resolve);
        },
        (reject) => { alert(reject); });
}

function on_close_logout() {
    remove_form('logout-form');
}


//  =================================
//  LOGUT
//  =================================
function on_logout() {
    set_session_user(null);
    query_id('navbar-logo').src = get_session_site().logo;
}



//  =================================
//  EDIT ACCOUNT
//  =================================
function on_edit_account() {
    
    let user = get_session_user();
    server('edit_account', {
        username: user.username,
        fullname: user.fullname,
        email: user.email,
        picture: user.picture
    }).then(
        (resolve) => {
            add_form('edit-account-form', resolve);
        },
        (reject) => {
            error(reject);
        }
    );
}


function ea_image_selected() {

    const imageInput = query_id('ea-file');
    if (imageInput.files.length > 0) {
        const selectedImage = imageInput.files[0];

        upload_image(selectedImage, MAX_IMAGE_SIZE, 'users').then(
            (resolve) => {
                if (resolve.ok) {
                    query_id('ea-image').innerHTML = picture_code(resolve.content, 'users', 128, query_value('ea-fullname'));
                    query_id('ea-user-image').value = resolve.content;
                }
            },
            (reject) => { 
                error(reject); 
            }
        );
    }
}

function ea_password() {
    password('ea_save_password');
}

function ea_save_password(pwd_id) {
    query_id('ea-user-password').value = query_value(pwd_id);
    close_password();
}

function au_save() {

    server('update_user', {
        username: query_value('ea-username'),
        fullname: query_value('ea-fullname'),
        email: query_value('ea-email'),
        picture: query_value('eauser-image'),
        password: query_value('ea-user-password').length>0? query_value('ea-user-password').length : ''
    }).then( 
        () => {
            update_navbar();
        },
        (reject)=> {
            error(reject);
        }
    )

}

function ea_close() {
    remove_form('edit-account-form');
}

//  =================================
//  DELETE ACCOUNT
//  =================================
function on_delete_account() {

    yesno('Radera kontot', 'Är du säker?', 'on_delete_account_yes', 'on_delete_account_yes' );
}

function on_delete_account_yes() {
    close_yesno();

    server('delete_user', {
        username: query_value('logout-username')
    }).then(
        () => {
            set_session_user(null);
            update_navbar();
        },
        (reject) => {
            error(reject);
        }
    );
}

function on_delete_account_no() {
    close_yesno();
    
}

