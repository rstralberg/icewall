
function sys_users() {
    
    server('sys/sys_users_form', {}).then(
        (resolve) => {
            add_form('edit-users-form', resolve);
        },
        (reject) => {
            error(reject);
        }
    );
}

function sys_users_form_user_selected() {

    let selection = document.getElementById('sys-users-form-users').value;
    if( selection === 'none') return;
    if( selection === 'add' ) {
        document.getElementById('sys-users-form-image').innerHTML = '';
        document.getElementById('sys-users-form-username').value = '?';
        document.getElementById('sys-users-form-fullname').value = '?';
        document.getElementById('sys-users-form-email').value = '?';
        document.getElementById('sys-users-form-user-image').value = 'avatar.png';
        enable_element('sys-users-form-file', true);
        enable_element('sys-users-form-username', true);
        enable_element('sys-users-form-fullname', true);
        enable_element('sys-users-form-email', true);
        enable_element('sys-users-form-save-new', false);
        enable_element('sys-users-form-save', false);
        enable_element('sys-users-form-password', true);
        enable_element('sys-users-form-delete', false);

        return;
    }

    server('get_user', {
        username: document.getElementById('sys-users-form-users').value
    }).then(
        (resolve) => {
            let user = JSON.parse(resolve);
            document.getElementById('sys-users-form-image').innerHTML = picture_code(user.picture, 'users', 128);
            document.getElementById('sys-users-form-username').value = user.username;
            document.getElementById('sys-users-form-fullname').value = user.fullname;
            document.getElementById('sys-users-form-email').value = user.email;
            document.getElementById('sys-users-form-user-image').value = user.picture;

            enable_element('sys-users-form-file', true);
            enable_element('sys-users-form-username', true);
            enable_element('sys-users-form-fullname', true);
            enable_element('sys-users-form-email', true);
            enable_element('sys-users-form-save-new', false);
            enable_element('sys-users-form-save', true);
            enable_element('sys-users-form-password', true);
            enable_element('sys-users-form-delete', user.username !== 'admin');

        },
        (reject) => {
            error(reject);
        }
    );

}

function sys_users_form_image_selected() {

    const imageInput = document.getElementById('sys-users-form-file');
    if (imageInput.files.length > 0) {
        const selectedImage = imageInput.files[0];

        upload_image(selectedImage, MAX_IMAGE_SIZE, 'users').then(
            (resolve) => {
                if (resolve.ok) {
                    document.getElementById('sys-users-form-image').innerHTML = picture_code(resolve.content, 'users', 128, document.getElementById('sys-users-form-fullname').value);
                    document.getElementById('sys-users-form-user-image').value = resolve.content;
                }
            },
            (reject) => { 
                error(reject); 
            }
        );
    }
}


function sys_users_form_password() {
    password('sys_users_form_password_save');
}

function sys_users_form_password_save(pwd_id) {
    document.getElementById('sys-users-form-user-password').value = document.getElementById(pwd_id).value;
    close_password();
    enable_element('sys-users-form-save-new',true);
    
}

function pw_close() {
    remove_form('password-form');
}

function sys_users_form_save() {

    server('update_user', {
        username: document.getElementById('sys-users-form-username').value,
        fullname: document.getElementById('sys-users-form-fullname').value,
        email: document.getElementById('sys-users-form-email').value,
        picture: document.getElementById('sys-users-form-user-image').value,
        password: document.getElementById('sys-users-form-user-password').value.length>0? document.getElementById('sys-users-form-user-password').value.length : ''
    }).then( 
        () => {
            enable_element('sys-users-form-save-new',false);
            enable_element('sys-users-form-save',true);
            get_top_menu();
        },
        (reject)=> {
            error(reject);
        }
    )

}

function sys_users_form_save_new() {

    server('add_user', {
        username: document.getElementById('sys-users-form-username').value,
        fullname: document.getElementById('sys-users-form-fullname').value,
        email: document.getElementById('sys-users-form-email').value,
        picture: document.getElementById('sys-users-form-user-image').value,
        password: document.getElementById('sys-users-form-user-password').value
    }).then( 
        () => {
            enable_element('sys-users-form-save-new',false);
            enable_element('sys-users-form-save',true);
        },
        (reject)=> {
            error(reject);
        }
        );
    }
    
    function yes_delete_user() {
        close_yesno();
        let username = document.getElementById('sys-users-form-username').value;  
        server('delete_user', {
        username: username
    }).then( 
        () => {
            let select = document.getElementById('sys-users-form-users');
            for( let i=0; i<select.childElementCount; i++) {
                let opt = select.children[i];
                if( opt.value === username ) {
                    select.remove(i);
                    break;
                }
            }
            select.selectedIndex = 0;
            document.getElementById('sys-users-form-image').innerHTML = '';
            document.getElementById('sys-users-form-username').value = '?';
            document.getElementById('sys-users-form-fullname').value = '?';
            document.getElementById('sys-users-form-email').value = '?';
            document.getElementById('sys-users-form-user-image').value = 'avatar.png';
            enable_element('sys-users-form-file', false);
            enable_element('sys-users-form-username', false);
            enable_element('sys-users-form-fullname', false);
            enable_element('sys-users-form-email', false);
            enable_element('sys-users-form-save-new', false);
            enable_element('sys-users-form-save', false);
            enable_element('sys-users-form-password', false);
            enable_element('sys-users-form-delete', false);
    
        }
    )
}

function no_delete_user() {
    close_yesno();
}

function sys_users_form_delete() {
    let fullname = document.getElementById('sys-users-form-fullname').value;  
    yesno('Radera', 'Är du säker på att du vill radera "' + fullname +'"?', 'yes_delete_user', 'no_delete_user');
}

function sys_users_form_close() {
    remove_form('edit-users-form');
}


