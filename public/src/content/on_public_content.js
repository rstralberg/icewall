
function on_public_content() {
    
    let public = false;
    let btn = document.getElementById('cont-public');
    if( !btn.classList.contains('active') ) {
        public = true;
    }

    server('content/content_public', {
        id: get_session_selection().id.substr(1),
        public: public
    }).then(
        (resolve) => {
            if( resolve ) {
                if( !btn.classList.contains('active') ) btn.classList.add('active');
            }
            else {
                if( btn.classList.contains('active') ) btn.classList.remove('active');
            }
        }
    );

}