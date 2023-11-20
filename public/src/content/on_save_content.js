
function on_save_content() {

    let section = get_session_selection();
    let isPublic = document.getElementById('cont-public').classList.contains('active');
    
    let bg = section.style.backgroundColor;
    section.style.backgroundColor = 'red';
    server('content/update_content', {
        id: section.id.substr(1),
        pos: get_content_position(section),
        style: get_content_style(section),
        html: section.innerHTML,
        isPublic: isPublic
    }).then(
        () => {
            section.style.backgroundColor = bg;
        }
    );

}