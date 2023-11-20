
function on_line() {
    
    let hr = document.createElement('hr');
    get_session_selection().append(hr);
    get_session_selection().innerHTML += '<br>';
    on_save_content();

}