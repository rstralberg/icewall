function rename_page() {

    server('pages/rename_form', {
        pageid: get_session_page().id
    }).then(
        (resolve) => {
            add_form('rename_form', resolve);
        },
        (reject) => {
            error(reject);
        }
    );
}

function close_renameform() {
    remove_form('rename_form');
}

function new_pagename_enter(element) {
    enable_element('pg-rename-form-rename', element.value.length>0);
}

function change_pagename(pageid) {
    let new_name = document.getElementById('pg-rename-form-new').value;
    server('pages/rename', {
        pageid: parseInt(pageid),
        title: new_name
    }).then(
        () => {
            get_top_menu();
            title();
            close_renameform();
        },
        (reject) => {
            error(reject);
        }
    )
}

