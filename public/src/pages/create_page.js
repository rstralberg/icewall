
function create_page() {
 
    server('pages/create_form', {
        username: get_session_user().username
    }).then(
        (resolve) => {
            add_form('create-page-form', resolve, 42);
        },
        (reject) => {
            error(reject);
        }
    );
}

function close_createform() {
    remove_form('create-page-form');
}

function enable_new_page() {
    enable_element( 'create-new-page', document.getElementById('pg-create-form-title').value.length > 0
    &&  document.getElementById('pg-create-form-placement').value.length > 0
    &&  document.getElementById('pg-create-form-author').value.length > 0 );
}

function create_new_page() {
    let title = document.getElementById('pg-create-form-title').value;
    let placement = document.getElementById('pg-create-form-placement').value;
    let show = document.getElementById('pg-create-form-showtitle').checked;
    let author = document.getElementById('pg-create-form-author').value;

    let isParent = false;
    let parentId = 0;
    if( placement === 'parent' ) {
        isParent = true;
    } else if ( placement !== 'top' ) {
        parentId = parseInt(placement);
    }

    close_createform();
    
    server('pages/create_page', {
        title: title,
        author: author,
        isParent: isParent,
        parentId: parentId,
        pos: 0,
        showtitle: show
    }).then(
        (page) => {
            set_session_page(JSON.parse(page));
            get_top_menu();
            get_title();
            get_content();
        },
        (reject) => {
            error(reject);
        }
    )
}


