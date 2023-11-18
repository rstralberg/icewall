
function add_content() {
    server('content/add', {
        pageid: get_session_page().id
    }).then(
        () => {
            get_content();
        }
    );

}
