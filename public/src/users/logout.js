function logout() {
    
    server('users/logout_form', {
        username: get_session_user().username
    }).then(
        (resolve) => {
            add_form('the-logout-form', resolve);
        },
        (reject) => { alert(reject); }
        );
}


function logout_close() {
    remove_form('the-logout-form');
}


//  =================================
//  LOGUT
//  =================================
function logout_selected() {
    remove_form('the-logout-form');
    set_session_user(null);
    document.getElementById('navbar-logo').src = get_session_site().logo;
    get_top_menu();
    usr_menu();
    adm_menu();

}



//  =================================
//  EDIT ACCOUNT
//  =================================
function edit_account_selected() {
    
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

    const imageInput = document.getElementById('ea-file');
    if (imageInput.files.length > 0) {
        const selectedImage = imageInput.files[0];

        upload_image(selectedImage, MAX_IMAGE_SIZE, 'users').then(
            (resolve) => {
                if (resolve.ok) {
                    document.getElementById('ea-image').innerHTML = picture_code(resolve.content, 'users', 128, document.getElementById('ea-fullname').value);
                    document.getElementById('ea-user-image').value = resolve.content;
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
    document.getElementById('ea-user-password').value = document.getElementById(pwd_id).value;
    close_password();
}

function au_save() {

    server('update_user', {
        username: document.getElementById('ea-username').value,
        fullname: document.getElementById('ea-fullname').value,
        email: document.getElementById('ea-email').value,
        picture: document.getElementById('eauser-image').value,
        password: document.getElementById('ea-user-password').value.length>0? document.getElementById('ea-user-password').value.length : ''
    }).then( 
        () => {
            get_top_menu();
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
function delete_account_selected() {

    yesno('Radera kontot', 'Är du säker?', 'on_delete_account_yes', 'on_delete_account_yes' );
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

