
function content_move(dir) {
    if (dir < 0) move_content_up();
    else move_content_down();
}

function move_content_up() {

    let content = get_session_selection();
    if (!is_valid(content) ) return;

    if (content.previousElementSibling) {
        content.parentNode.insertBefore(content, content.previousElementSibling);
        update_content_positions();
    }
}

function move_content_down() {

    let content = get_session_selection();
    if (!is_valid(content)) return;

    if (content.nextElementSibling) {
        content.parentNode.insertBefore(content.nextElementSibling, content);
        update_content_positions();
    }
}
