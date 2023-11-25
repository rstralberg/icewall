
function edit_account() {

    let user = get_session_user();
    
    server('users/edit_account', {
        username: user.username,
        fullname: user.fullname,
        email: user.email,
        picture: user.picture
    }).then(
        (resolve) => {
            add_form('edit-account-form', resolve, 35);
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
                    document.getElementById('ea-image').src = 
                        'sites/'+
                        get_session_key() + '/' +
                        'users/200/' +
                        resolve.content;
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

function ea_save() {

    server('users/update_user', {
        username: document.getElementById('ea-username').value,
        fullname: document.getElementById('ea-fullname').value,
        email: document.getElementById('ea-email').value,
        picture: document.getElementById('ea-user-image').value,
        password: document.getElementById('ea-user-password').value.length > 0 ? document.getElementById('ea-user-password').value.length : ''
    }).then(
        (resolve) => {
            set_session_user( JSON.parse(resolve));
            get_top_menu();
            get_avatar();
            ea_close();
        },
        (reject) => {
            error(reject);
            ea_close();
        }
    )

}

function ea_close() {
    remove_form('edit-account-form');
}

