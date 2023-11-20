
function on_youtube() {
 
    server('content/addons/youtube', {
        url: ''
    }).then(
        (resolve) => {
            add_form('youtube-form', resolve);
        }
    );
}

function close_youtube() {
    remove_form('youtube-form');
}

function on_youtube_pasted(element) {

    document.getElementById('yt-frame').innerHTML = element.value;
    enable_element('yt-save-button',true);
    document.getElementById('yt-save-button').focus();
}

function on_youtube_save() {

    let html = document.getElementById('yt-frame').innerHTML;
    get_session_selection().innerHTML += html + '<br>';
    close_youtube();
}
