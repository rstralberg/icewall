
function on_page_rename() {
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



