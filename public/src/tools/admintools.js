
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

