
function section_clean_up(element) {
    for (let i = 0; i < element.childElementCount; i++) {
        let child = element.children[i];
        if (element.tagName === 'H1') {
            element.style.outline = '1px solid ' + get_style('linkFg');
        }
        else {
            element.style.outline = null;
        }

        element.style.border = null;
        element.contentEditable = false;
        element.style.resize = null;
        if (child.childElementCount > 0) {
            section_clean_up(child);
        }
    }
}


function on_save_content() {

    let section = get_session_selection();
    section_clean_up(section);

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