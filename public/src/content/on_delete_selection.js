
function on_delete_section() {
    yesno('Radera inramat område', 'Är du säker?', 'on_delete_selection', 'dont_delete_selection');
}

function on_delete_selection()   {

    let section = get_session_selection();
    section.removeChild(cur_element) ;
    on_save_content();
    cur_element = null;
    close_yesno();
}

function dont_delete_selection()   {
    
    close_yesno();
}