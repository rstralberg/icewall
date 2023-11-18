
// Entry point called from server
function index(pageid, sitekey) {

    if (parseInt(pageid) === 0) alert('index pageid === 0');
    if (sitekey === '') alert('index sitekey === ""');

    init_session(pageid, sitekey).then(
        () => {
            usr_menu();
            adm_menu();
            logo();
            top_menu();
            avatar();

            footer();
            get_title();
            get_content();

        });
}

