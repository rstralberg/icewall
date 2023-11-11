
// adt-rename-page
// adt-show-title
// adt-add-content
// adt-public
// adt-create-page
// adt-delete-pages
// adt-edit-pages
// adt-edit-users
// adt-edit-settings
// adt-theme-colors
// adt-theme-borders
// adt-theme-fonts
// adt-theme-sizes
// adt-theme-shadows
// adt-theme-save
// adt-theme-save_as
// adt-theme-delete

function init_admintools() {
    init_admin_tools();
    let right = query_class('right');
    right.style.display = get_session_user().username === '' ? 'none' : 'block';
    
    if( get_session_page().id !== '') {
        set_tool_state('adt-rename-page', 'normal');
        set_tool_state('adt-show-title', 'normal');
        set_tool_state('adt-add-content', 'normal');
    }

    if( get_session_user().isAdmin ) {

    }
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
    set_tool_state('adt-theme-colors', state);
    set_tool_state('adt-theme-borders', state);
    set_tool_state('adt-theme-fonts', state);
    set_tool_state('adt-theme-sizes', state);
    set_tool_state('adt-theme-shadows', state);
    set_tool_state('adt-theme-save', state);
    set_tool_state('adt-theme-save_as', state);
    set_tool_state('adt-theme-delete', state);
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
    set_tool_state('adt-theme-colors', 'disabled');
    set_tool_state('adt-theme-borders', 'disabled');
    set_tool_state('adt-theme-fonts', 'disabled');
    set_tool_state('adt-theme-sizes', 'disabled');
    set_tool_state('adt-theme-shadows', 'disabled');
    set_tool_state('adt-theme-save', 'disabled');
    set_tool_state('adt-theme-save_as', 'disabled');
    set_tool_state('adt-theme-delete', 'disabled');
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
            query_id('adt-public').style.color = 
            resolve? 
            get_style('sidebarsFgHi') : 
            get_style('sidebarsFg');

        },
        (reject) => { alert(reject); }
    );
}

//  =================================
//  CREATE PAGE
//  =================================
function adt_create_page() {
    let username = get_session_user().username;
    // if (username !== '') { 
    if (true) {
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
    remove_form('page_delete_form');
}

function on_delete_page() {
    yesno('Radera sida', 'Är du säker', do_delete_page, skip_delete_page);
}

function on_close_delete_page() {
    remove_form('page_delete_form');
}

//  =================================
//  EDIT PAGES
//  =================================
function adt_edit_pages() {

}

//  =================================
//  EDIT USER
//  =================================
function adt_edit_users() {

}

//  =================================
//  EDIT SETTINGS
//  =================================
function adt_edit_settings() {

}

//  =================================
//  COLORS
//  =================================
function adt_theme_colors() {

}

function adt_theme_borders() {

}

function adt_theme_fonts() {

}

function adt_theme_sizes() {

}

function adt_theme_shadows() {

}

function adt_theme_save() {

}

function adt_theme_save_as() {

}

function adt_theme_delete() {

}

