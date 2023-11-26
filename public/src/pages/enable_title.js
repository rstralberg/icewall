
function enable_title() {
    let title  = document.getElementById('title');
    title.style.display = title.style.display === 'none' ?'block' : 'none';

    server('pages/title', {
        pageid: get_session_page().id,
        curstate: title.style.display !== 'none'
    }).then(
        () => {
            get_title();
        },
        (reject) => {
            error(reject);
        }
    );

}