function on_add_content() {

    server('add_content', {
        pageid: get_session_page().id
    }).then(
        (resolve) => {
            update_content();
        }
    );
}

