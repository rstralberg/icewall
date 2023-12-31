
// Entry point called from server
function index(pageid, sitekey) {

    if (parseInt(pageid) === 0) alert('index pageid === 0');
    if (sitekey === '') alert('index sitekey === ""');

    init_session(pageid, sitekey).then(
        () => {
            init_left_pop();
            init_right_pop();
            get_logo();
            get_top_menu();
            get_avatar();
            get_footer();
            get_title();
            get_content();

        });
}

