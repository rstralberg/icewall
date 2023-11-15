
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
    server('pg/pg_rename_form', {
        pageid: get_session_page().id
    }).then(
        (resolve) => {
            add_form('page-rename-form', resolve);
        }
    );
}
 
function pg_rename_form_rename(pageid) {

    server('pg/pg_rename', {
        pageid: pageid,
        title: query_value('page-rename-form-new')
    }).then( 
        () => {
            update_navbar();
            remove_form('page-rename-form');
        },
        (reject) => { alert(reject); }
    );
}

function pg_rename_form_close() {
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
    server('pg/pg_public', {
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
        server('pg/pg_create_form', {
            username: username
        }).then(
            (resolve) => {
                add_form('page_create_form', resolve);
            }
        );
    }
}
function pg_create_form_create() {
 
    let placement = query_value('pg-create-form-placement');
    
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

    server('pg/pg_create', {
        title: query_value('pg-create-form-title'),
        author: query_value('pg-create-form-author'),
        isParent: isParent,
        parentId: parentid,
        pos: pos,
        showtitle: query_id('pg-create-form-showtitle').checked
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

function pg_create_form_close() {
    remove_form('page_create_form');
}

//  =================================
//  DELETE PAGES
//  =================================
function adt_delete_pages() {

    server('pg/pg_delete_form', {
        pageid: get_session_page().id
    }).then(
        (resolve) => {
            add_form('page_delete_form', resolve);
        }
    );
}

function yes_delete_page() {
    remove_form('yesno');
    server('pg/pg_delete', {
        pageid: query_value('pg-delete-form-pages')
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

function no_delete_page() {
    remove_form('yesno');
    remove_form('page_delete_form');
}

function pg_delete_form_delete() {
    yesno('Radera sida', 'Är du säker', 'yes_delete_page', 'no_delete_page');
}

function pg_delete_form_close() {
    remove_form('page_delete_form');
}

