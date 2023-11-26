
function on_move_content(dir) {
    
    function move_up(content) {

        if (content.previousElementSibling) {
            content.parentNode.insertBefore(content, content.previousElementSibling);
            update_content_positions();
        }
    
    }
    
    function move_down(content) {
    
        if (content.nextElementSibling) {
            content.parentNode.insertBefore(content.nextElementSibling, content);
            update_content_positions();
        }
    
    }

    let section = get_session_selection();
    if( !is_valid(section) ) {
        return;
    }
    
    if( dir === 'up')  {
        move_up(section);
    }
    else {
        move_down(section);
    }
}
