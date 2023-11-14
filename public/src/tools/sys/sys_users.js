
function sys_users() {
    
    server('sys/sys_users', {}).then(
        (resolve) => {
            add_form('edit-users-form', resolve);
        },
        (reject) => {
            error(reject);
        }
    );
}

function eu_user_selected() {

    let selection = query_value('eu-users');
    if( selection === 'none') return;
    if( selection === 'add' ) {
        query_id('eu-image').innerHTML = '';
        query_id('eu-username').value = '?';
        query_id('eu-fullname').value = '?';
        query_id('eu-email').value = '?';
        query_id('eu-user-image').value = 'avatar.png';
        enable_element('eu-file', true);
        enable_element('eu-username', true);
        enable_element('eu-fullname', true);
        enable_element('eu-email', true);
        enable_element('eu-save-new', false);
        enable_element('eu-save', false);
        enable_element('eu-password', true);
        enable_element('eu-delete', false);

        return;
    }

    server('get_user', {
        username: query_value('eu-users')
    }).then(
        (resolve) => {
            let user = JSON.parse(resolve);
            query_id('eu-image').innerHTML = picture_code(user.picture, 'users', 128);
            query_id('eu-username').value = user.username;
            query_id('eu-fullname').value = user.fullname;
            query_id('eu-email').value = user.email;
            query_id('eu-user-image').value = user.picture;

            enable_element('eu-file', true);
            enable_element('eu-username', true);
            enable_element('eu-fullname', true);
            enable_element('eu-email', true);
            enable_element('eu-save-new', false);
            enable_element('eu-save', true);
            enable_element('eu-password', true);
            enable_element('eu-delete', true);

        },
        (reject) => {
            error(reject);
        }
    );

}

function eu_image_selected() {

    const imageInput = query_id('eu-file');
    if (imageInput.files.length > 0) {
        const selectedImage = imageInput.files[0];

        upload_image(selectedImage, MAX_IMAGE_SIZE, 'users').then(
            (resolve) => {
                if (resolve.ok) {
                    query_id('eu-image').innerHTML = picture_code(resolve.content, 'users', 128, query_value('eu-fullname'));
                    query_id('eu-user-image').value = resolve.content;
                }
            },
            (reject) => { 
                error(reject); 
            }
        );
    }
}


function eu_password() {
    password('eu_password_save');
}

function eu_password_save(pwd_id) {
    query_id('eu-user-password').value = query_value(pwd_id);
    close_password();
    enable_element('eu-save-new',true);
    
}

function pw_close() {
    remove_form('password-form');
}

function eu_save() {

    server('update_user', {
        username: query_value('eu-username'),
        fullname: query_value('eu-fullname'),
        email: query_value('eu-email'),
        picture: query_value('eu-user-image'),
        password: query_value('eu-user-password').length>0? query_value('eu-user-password').length : ''
    }).then( 
        () => {
            enable_element('eu-save-new',false);
            enable_element('eu-save',true);
            update_navbar();
        },
        (reject)=> {
            error(reject);
        }
    )

}

function eu_save_new() {

    server('add_user', {
        username: query_value('eu-username'),
        fullname: query_value('eu-fullname'),
        email: query_value('eu-email'),
        picture: query_value('eu-user-image'),
        password: query_value('eu-user-password')
    }).then( 
        () => {
            enable_element('eu-save-new',false);
            enable_element('eu-save',true);
        },
        (reject)=> {
            error(reject);
        }
    );
}

function eu_delete() {

    let username = query_value('eu-username');  
    server('delete_user', {
        username: username
    }).then( 
        () => {
            let select = query_id('eu-users');
            for( let i=0; i<select.childElementCount; i++) {
                let opt = select.children[i];
                if( opt.value === username ) {
                    select.remove(i);
                    break;
                }
            }
            select.selectedIndex = 0;
            query_id('eu-image').innerHTML = '';
            query_id('eu-username').value = '?';
            query_id('eu-fullname').value = '?';
            query_id('eu-email').value = '?';
            query_id('eu-user-image').value = 'avatar.png';
            enable_element('eu-file', false);
            enable_element('eu-username', false);
            enable_element('eu-fullname', false);
            enable_element('eu-email', false);
            enable_element('eu-save-new', false);
            enable_element('eu-save', false);
            enable_element('eu-password', false);
            enable_element('eu-delete', false);
    
        }
    )
}

function eu_close() {
    remove_form('edit-users-form');
}


