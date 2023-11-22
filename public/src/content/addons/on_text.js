
function on_text() {
    hide_content_pop();
    
    let content = get_session_selection();
    if (content === null) return;

    let p = document.createElement('p');
    p.innerText = 'Skriv här ...';
    add_borders(p);

    content.appendChild(p);
    on_save_content();    
}

