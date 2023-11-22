
function on_line() {
    hide_content_pop();
 
    let hr = document.createElement('hr');
    get_session_selection().append(hr);
    get_session_selection().innerHTML += '<br>';
    on_save_content();

}