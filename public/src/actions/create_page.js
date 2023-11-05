function on_page_create() {
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
        showtitle: query_checked('cp-showtitle')
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


