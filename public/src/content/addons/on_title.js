
function on_title() {
    simple('Titel', 'Text', '', 'on_title_value');
}

function on_title_value(valueElement) {
    let h1 = document.createElement('h1');
    h1.innerText = valueElement.value;
    close_simple();
    get_session_selection().append(h1);
    get_session_selection().innerHTML += '<br>';
    on_save_content();

}

