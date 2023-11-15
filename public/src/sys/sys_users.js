
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

    let selection = query_value('sys-users-form-users');
    if( selection === 'none') return;
    if( selection === 'add' ) {
        query_id('sys-users-form-image').innerHTML = '';
        query_id('sys-users-form-username').value = '?';
        query_id('sys-users-form-fullname').value = '?';
        query_id('sys-users-form-email').value = '?';
        query_id('sys-users-form-user-image').value = 'avatar.png';
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
        username: query_value('sys-users-form-users')
    }).then(
        (resolve) => {
            let user = JSON.parse(resolve);
            query_id('sys-users-form-image').innerHTML = picture_code(user.picture, 'users', 128);
            query_id('sys-users-form-username').value = user.username;
            query_id('sys-users-form-fullname').value = user.fullname;
            query_id('sys-users-form-email').value = user.email;
            query_id('sys-users-form-user-image').value = user.picture;

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

    const imageInput = query_id('sys-users-form-file');
    if (imageInput.files.length > 0) {
        const selectedImage = imageInput.files[0];

        upload_image(selectedImage, MAX_IMAGE_SIZE, 'users').then(
            (resolve) => {
                if (resolve.ok) {
                    query_id('sys-users-form-image').innerHTML = picture_code(resolve.content, 'users', 128, query_value('sys-users-form-fullname'));
                    query_id('sys-users-form-user-image').value = resolve.content;
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
    query_id('sys-users-form-user-password').value = query_value(pwd_id);
    close_password();
    enable_element('sys-users-form-save-new',true);
    
}

function pw_close() {
    remove_form('password-form');
}

function sys_users_form_save() {

    server('update_user', {
        username: query_value('sys-users-form-username'),
        fullname: query_value('sys-users-form-fullname'),
        email: query_value('sys-users-form-email'),
        picture: query_value('sys-users-form-user-image'),
        password: query_value('sys-users-form-user-password').length>0? query_value('sys-users-form-user-password').length : ''
    }).then( 
        () => {
            enable_element('sys-users-form-save-new',false);
            enable_element('sys-users-form-save',true);
            update_navbar();
        },
        (reject)=> {
            error(reject);
        }
    )

}

function sys_users_form_save_new() {

    server('add_user', {
        username: query_value('sys-users-form-username'),
        fullname: query_value('sys-users-form-fullname'),
        email: query_value('sys-users-form-email'),
        picture: query_value('sys-users-form-user-image'),
        password: query_value('sys-users-form-user-password')
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
        let username = query_value('sys-users-form-username');  
        server('delete_user', {
        username: username
    }).then( 
        () => {
            let select = query_id('sys-users-form-users');
            for( let i=0; i<select.childElementCount; i++) {
                let opt = select.children[i];
                if( opt.value === username ) {
                    select.remove(i);
                    break;
                }
            }
            select.selectedIndex = 0;
            query_id('sys-users-form-image').innerHTML = '';
            query_id('sys-users-form-username').value = '?';
            query_id('sys-users-form-fullname').value = '?';
            query_id('sys-users-form-email').value = '?';
            query_id('sys-users-form-user-image').value = 'avatar.png';
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
    let fullname = query_value('sys-users-form-fullname');  
    yesno('Radera', 'Är du säker på att du vill radera "' + fullname +'"?', 'yes_delete_user', 'no_delete_user');
}

function sys_users_form_close() {
    remove_form('edit-users-form');
}


