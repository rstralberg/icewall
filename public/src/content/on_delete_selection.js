
function on_delete_selection() {
    yesno('Radera inramat område', 'Är du säker?', 'on_delete_selection', 'dont_delete_selection');
}

function on_delete_selection()   {
    close_yesno();

    if( !is_valid(cur_article)) return;

    let section = get_session_selection();
    section.removeChild(cur_article);
    on_save_content();
    leave_article();
}

function dont_delete_selection()   {
    close_yesno();
}