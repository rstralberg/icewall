
// Entry point called from server
function index(pageid, sitekey) {

    if (parseInt(pageid) === 0) alert('index pageid === 0');
    if (sitekey === '') alert('index sitekey === ""');

    init_session(pageid, sitekey).then(
        () => {
            // we will take over broser righ clicks
            let body = document.querySelector('body');
            body.addEventListener('contextmenu', (e) => { e.preventDefault();})

            init_content_pop();
            init_menu_pop();
            init_admin_pop();
            get_logo();
            get_top_menu();
            get_avatar();
            get_footer();
            get_title();
            get_content();

        });
}

