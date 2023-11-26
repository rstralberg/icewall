
function delete_page() {

    yesno('Radera sida', 'Är du säker på att du vill radera sidan "' + get_session_page().title + '"?',
        'yes_delete_page', 'no_dont_delete_page' );

}

function yes_delete_page() {
    close_yesno();

    server('pages/delete_page', {
        pageid: get_session_page().id
    }).then(
        (resolve) => {
            let page = JSON.parse(resolve);
            set_session_page(page);
            get_top_menu();
            get_title();
            get_content();

        }
    )
}

function no_dont_delete_page() {
    close_yesno();
}