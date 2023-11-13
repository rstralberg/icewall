
function init_admintools() {
    let right = query_class('right');
    right.style.display = get_session_user().username === '' ? 'none' : 'block';
    init_admin_tools();
}

function init_admin_tools() {
    let state = get_session_page().id === 0 ? 'disabled' : 'normal';
    set_tool_state('adt-rename-page', state);
    set_tool_state('adt-show-title', state);
    set_tool_state('adt-add-content', state);
    set_tool_state('adt-public', state);

    state = get_session_user().username === 'admin' ? 'normal' : 'disabled';
    set_tool_state('adt-create-page', state);
    set_tool_state('adt-delete-pages', state);
    set_tool_state('adt-edit-pages', state);
    set_tool_state('adt-edit-users', state);
    set_tool_state('adt-edit-settings', state);
    set_tool_state('adt-edit-themes', state);
    set_tool_state('adt-theme-general', state);
    set_tool_state('adt-theme-bars', state);
    set_tool_state('adt-theme-titlebar', state);
    set_tool_state('adt-theme-menu', state);
    set_tool_state('adt-theme-footer', state);
    set_tool_state('adt-theme-content', state);
    set_tool_state('adt-theme-forms', state);
    set_tool_state('adt-theme-buttons', state);
    set_tool_state('adt-theme-inputs', state);
}

function release_admin_tools() {
    set_tool_state('adt-rename-page', 'disabled');
    set_tool_state('adt-show-title', 'disabled');
    set_tool_state('adt-add-content', 'disabled');
    set_tool_state('adt-public', 'disabled');
    set_tool_state('adt-create-page', 'disabled');
    set_tool_state('adt-delete-pages', 'disabled');
    set_tool_state('adt-edit-pages', 'disabled');
    set_tool_state('adt-edit-users', 'disabled');
    set_tool_state('adt-edit-settings', 'disabled');
    set_tool_state('adt-edit-themes', 'disabled');
    set_tool_state('adt-theme-general', 'disabled');
    set_tool_state('adt-theme-bars', 'disabled');
    set_tool_state('adt-theme-titlebar', 'disabled');
    set_tool_state('adt-theme-menu', 'disabled');
    set_tool_state('adt-theme-footer', 'disabled');
    set_tool_state('adt-theme-content', 'disabled');
    set_tool_state('adt-theme-forms', 'disabled');
    set_tool_state('adt-theme-buttons', 'disabled');
    set_tool_state('adt-theme-inputs', 'disabled');
}

//  =================================
//  RENAME
//  =================================
function adt_rename_page() {
    server('on_page_rename', {
        pageid: get_session_page().id
    }).then(
        (resolve) => {
            add_form('page-rename-form', resolve);
        }
    );
}
 
function on_rename_page(pageid) {

    server('rename_page', {
        pageid: pageid,
        title: query_value('rp-new')
    }).then( 
        () => {
            update_navbar();
            remove_form('page-rename-form');
        },
        (reject) => { alert(reject); }
    );
}

function on_close_rename_page() {
    remove_form('page-rename-form');
}

//  =================================
//  TITLE
//  =================================
function adt_show_title() {
    server('on_toggle_title', {
        pageid: get_session_page().id,
        curstate: query('header').style.display !== 'none'
    }).then(
        () => {
            update_titlebar();
        },
        (reject) => { alert(reject); }
    );

}

//  =================================
//  ADD CONTENT
//  =================================
function adt_add_content() {
    server('add_content', {
        pageid: get_session_page().id
    }).then(
        () => {
            get_content();
        }
    );

}

//  =================================
//  PUBLIC
//  =================================
function adt_public() {
    server('toggle_page_public', {
        pageid: get_session_page().id
    }).then(
        (resolve) => {
            set_tool_state('adt-public', resolve ? 'active' : 'normal');
            update_page( get_session_page().id, ['isPublic'], [resolve] );
        },
        (reject) => { error(reject); }
    );
}

//  =================================
//  CREATE PAGE
//  =================================
function adt_create_page() {
    let username = get_session_user().username;
    if (username === 'admin') { 
        server('on_page_create', {
            username: username
        }).then(
            (resolve) => {
                add_form('page_create_form', resolve);
            }
        );
    }
}
function on_create_page() {
 
    let placement = query_value('cp-placement');
    
    let isParent, parentid, pos;
    if( placement === 'top') {
        pos = query_id('navbar-top-links').childElementCount;
        parentid = 0;
        isParent = false;
    }
    else if( placement === 'parent') {
        pos = query_id('navbar-top-links').childElementCount;
        parentid = 0;
        isParent = true;
    }
    else {
        pos = 0;
        parentid = parseInt(placement);
        isParent = false;
    }

    server('register_new_page', {
        title: query_value('cp-title'),
        author: query_value('cp-author'),
        isParent: isParent,
        parentId: parentid,
        pos: pos,
        showtitle: query_id('cp-showtitle').checked
    }).then(
        () => {
            remove_form('page_create_form');
            update_navbar();
        },
        (reject) => { 
            remove_form('page_create_form');
            alert(reject); 
        }
    );
}

function on_close_pagecreate() {
    remove_form('page_create_form');
}

//  =================================
//  DELETE PAGES
//  =================================
function adt_delete_pages() {

    server('on_page_delete', {
        pageid: get_session_page().id
    }).then(
        (resolve) => {
            add_form('page_delete_form', resolve);
        }
    );
}

function do_delete_page() {
    remove_form('yesno');
    server('unregister_page', {
        pageid: query_value('dp-pages')
    }).then(
        () => {
            remove_form('page_delete_form');
            update_navbar();
        },
        (reject) => { 
            remove_form('page_delete_form');
            popup('Radeing av sida', reject);
        }
    );
}

function skip_delete_page() {
    remove_form('yesno');
    remove_form('page_delete_form');
}

function on_delete_page() {
    yesno('Radera sida', 'Är du säker', 'do_delete_page', 'skip_delete_page');
}

function on_close_delete_page() {
    remove_form('page_delete_form');
}

//  =================================
//  EDIT PAGES
//  =================================
function adt_edit_pages() {

    server('edit_pages', {}).then(
        (resolve) => {
            add_form('edit-pages-form', resolve);
        }
    )
}

function ep_page_selected() {

    let pageid = query_value('ep-pages');
    let pagelist = query_id('ep-pagelist');
    query_id('ep-selected').value = 'p'+pageid;
    pagelist.innerHTML = '';

    server('getpages', {
        where: '`parentId`=0'
    }).then(
        (resolve) => {
            let pages = JSON.parse(resolve);
            pages.forEach(page => {
                let li = document.createElement('li');
                li.value = page.id;
                li.id = 'p'+page.id;
                li.innerText = page.title;
                if( page.id  === pageid ) {
                    query_id('ep-selected-name').value = page.title;
                    li.classList.add('selected-listitem');
                }
                pagelist.appendChild(li);
            });
            enable_element('ep-delete', true);
            enable_element('ep-rename', true);
        },
        (reject) => {
            error(reject);
        }
    );
}

function ep_new_name() {
    enable_element('ep-rename-button', query_value('ep-rename').length > 0);
}

function ep_rename() {
    server('rename_page', {
        pageid: query_value('ep-selected').substring(1),
        title: query_value('ep-rename')
    }).then( 
        () => {
            update_navbar();
        },
        (reject) => { error(reject); }
    );

}

function ep_parent_selected() {
    let parent = query_value('ep-parent-select');
    let id = query_value('ep-selected').substring(1);

    server('update_page', {
        pageid: parseInt(id) ,
       cols: ['parentId'],
        values: [parseInt(parent)] }).then(
        () => {
            update_navbar();
        },
        (reject) => { error(reject); }
    );

}

function ep_move_up() {

    let selected_pageid = query_value('ep-selected');
    let ul = query_id('ep-pagelist');
    if (ul === null)
        return;
    
    let moved = false;
    // find position
    let newList = new Array();
    let pos = 0;
    for (let i = 0; i < ul.childElementCount; i++) {
        newList.push(ul.children[i]);
        if (ul.children[i].id === selected_pageid) {
            pos = i;
        }
    }
    // swap
    if (pos > 0) {
        let temp = newList[pos - 1];
        newList[pos - 1] = newList[pos];
        newList[pos] = temp;
        moved = true;
    }
    // rebuild
    ul.innerHTML = '';
    for (let i = 0; i < newList.length; i++) {
        let li = document.createElement('li');
        li.id = newList[i].id;
        li.style.listStyle = 'none';
        if (newList[i].id === selected_pageid) {
            li.classList.add('selected-listitem');
        }
        li.innerText = newList[i].innerText;
        ul.appendChild(li);
    }
    if (moved) {
        let positions = new Array();
        for (pos = 0; pos < ul.childElementCount; pos++) {
            positions.push({
                id: parseInt(ul.children[pos].id.substring(1)),
                pos: pos
            });
        }
        update_page_positions(positions);
        update_navbar();

    }
}

function ep_move_down() {

    let selected_pageid = query_value('ep-selected');
    let ul = query_id('ep-pagelist');
    if (ul === null)
        return;
    
    let moved = false;
    // find position
    let newList = new Array();
    let pos = 0;
    for (let i = 0; i < ul.childElementCount; i++) {
        newList.push(ul.children[i]);
        if (ul.children[i].id === selected_pageid) {
            pos = i;
        }
    }
    // swap
    if (pos < ul.childElementCount - 1) {
        let temp = newList[pos + 1];
        newList[pos + 1] = newList[pos];
        newList[pos] = temp;
        moved = true;
    }
    // rebuild
    ul.innerHTML = '';
    for (let i = 0; i < newList.length; i++) {
        let li = document.createElement('li');
        li.id = newList[i].id;
        li.style.listStyle = 'none';
        if (newList[i].id === selected_pageid) {
            li.classList.add('selected-listitem');
        }
        li.innerText = newList[i].innerText;
        ul.appendChild(li);
    }
    if (moved) {
        let positions = new Array();
        for (pos = 0; pos < ul.childElementCount; pos++) {
            positions.push({
                id: parseInt(ul.children[pos].id.substring(1)),
                pos: pos
            });
        }
        update_page_positions(positions);
        update_navbar();
            
    }
}

function ep_delete() {
    let selected_page = query_value('ep-selected');
    if( is_valid(selected_page) ) {
        let pageid = selected_page.substring(1);
        yesno('Radera sida', 'Är du säker på att du vill radera sidan "'+ query_value('ep-selected-name') + '"', 'ep_delete_page', 'ep_skip_delete_page');
    }
}

function ep_delete_page() {
    remove_form('yesno');
    server('unregister_page', {
        pageid: query_value('ep-selected').substring(1)
    }).then(
        () => {
            update_navbar();
        },
        (reject) => { 
            popup('Radeing av sida', reject);
        }
    );    
}

function ep_skip_delete_page() {
    remove_form('yesno');
}

function ep_close() {
    remove_form('edit-pages-form');
}


//  =================================
//  EDIT USER
//  eu-users
//  eu-image
//  eu-file
//  eu-username
//  eu-fullname
//  eu-email
//  eu-password
//  eu-save-new
//  eu-save
//  eu-delete
//  =================================
function adt_edit_users() {
    
    server('edit_users', {}).then(
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


//  =================================
//  EDIT SETTINGS
//  =================================
function adt_edit_settings() {

    server('edit_settings', {}).then(
        (resolve) => {
            add_form('edit-settings-form', resolve);
        },
        (reject) => {
            error(reject);
        }
    );
}

function es_theme_selected() {

}

function es_save() {

}


function es_close() {
    remove_form('edit-settings-form');
}

//  =================================
//  EDIT THEMES
//  =================================
function adt_edit_themes() {

    server('edit_themes', {}).then(
        (resolve) => {
            add_form('edit-themes-form', resolve);
        }
    );
}

function et_selected() {

    let enable = query_value('et-themes') !== 'IceWall';
    enable_element('et-delete',enable);
    server('get_theme', {
        theme: query_value('et-themes')
    }).then(
        (resolve) => {
            let theme = JSON.parse(resolve);
            theme_to_styles(theme);
        }
    )
}

function et_new() {
    simple('Nytt tema', 'Namn', '?', 'et_new_theme_name' ) ;
}

function et_new_theme_name(name_element) {

    let name = name_element.value;
    close_simple();
    set_style('theme', '"' + name + '"' );

    server('add_theme', {
        theme: styles_to_theme()
    });

}

function et_close() {
    remove_form('edit-themes-form');
}

