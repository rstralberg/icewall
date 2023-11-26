
function on_spotify(url='', callback='on_spotify_save') {
 
 
    server('content/addons/spotify', {
        url: url,
        callback: callback
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
    close_spotify();

    let section = get_session_selection();
    section.innerHTML += '<article type="spotify">' + html + '</article>';

}

