
function on_text() {
    
    let content = get_session_selection();
    if (content === null) return;

    content.innerHTML += '<article type="text">Skriv här ...</article>';
    on_save_content();    
}

