
function on_line() {
    let  section = get_session_selection();
    section.innerHTML += '<article type="line"><hr></article>';
    on_save_content();
    attach_editor(section);
    
}