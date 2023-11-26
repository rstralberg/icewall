
function add_content() {
    server('content/add_content', {
        pageid: get_session_page().id,
        pos: document.getElementById('content').childElementCount
    }).then(
        () => {
            get_content();
        }
    );
}
