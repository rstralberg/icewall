
function on_delete_content() {
    
    yesno('Radera avsnitt', 'Är du säker?', 'on_delete_section', 'dont_delete_section');
}

function on_delete_section()   {

    server('content/delete_content', {
        id: get_session_selection().id.substr(1),
    }).then(
        () => {
            get_content();
        }
    )
    close_yesno();
}

function dont_delete_section()   {
    
    close_yesno();
}