
function on_page_delete() {
    server('on_page_delete', {
        pageid: get_session_page().id
    }).then(
        (resolve) => {
            add_form('page_delete_form', resolve);
        }
    );
}

function on_delete_page() {

    server('unregister_page', {
        pageid: query_value('dp-pages')
    }).then(
        () => {
            remove_form('page_delete_form');
            update_navbar();
        },
        (reject) => { 
            remove_form('page_delete_form');
            alert(reject); 
        }
    );
}

function on_close_delete_page() {
    remove_form('page_delete_form');
}
