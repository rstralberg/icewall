
function on_title(text='', callback='on_title_value' ) {
    
    simple('Titel', 'Text', text, callback);
}

function on_title_value(valueElement) {

    let text  = valueElement.value;
    close_simple();
    
    let section = get_session_selection();
    section.innerHTML += '<article type="title"><h1>' + text + '</h1></article>';
    on_save_content();
    attach_editor(section);

}

