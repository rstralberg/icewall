
function alignement(cmd) {

    let section = get_session_selection();
    if( is_valid(section)) {
        let node = get_selected_node();
        if( is_valid(node) && is_valid(node.parentNode)) {
            node.parentNode.style.textAlign = cmd; 
            content_save();
        }
        else {
            section.style.textAlign = cmd;
            update_section_style();
        }
    }
}

