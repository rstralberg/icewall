
function on_spotify() {
    
    server('content/addons/spotify', {
        url: ''
    }).then(
        (resolve) => {
            add_form('spotify-form', resolve);
        }
    );
}

function close_spotify() {
    remove_form('spotify-form');
}

function on_spotify_pasted(element) {

    document.getElementById('sp-frame').innerHTML = document.getElementById('sp-url').value;
    enable_element('sp-save-button',true);
    document.getElementById('sp-save-button').focus();
}

function on_spotify_save() {

    let html = document.getElementById('sp-frame').innerHTML;
    get_session_selection().innerHTML += html + '<br>';
    close_spotify();


}

