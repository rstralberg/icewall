
function get_title() {

    server('pages/get_title', {
        pageid: get_session_page().id
    }).then( 
        (resolve) => {
            document.getElementById('title').innerHTML = resolve;
        },
        (reject) => {
            error(reject);
        }
    );
}
