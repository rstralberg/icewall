
function page_public() {

    server('pages/public', {
        pageid: get_session_page().id
    }).then( 
        (resolve) => {
            let p = document.getElementById('adt-public');
            if( resolve ) {
                p.classList.add('active');
            } else {
                p.classList.remove('active');
            }
        }
    )
}

