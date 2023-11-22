
function on_youtube() {
 
    hide_content_pop();
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

    let form = document.getElementById('youtube-form');

    form.querySelector('#yt-frame').innerHTML = element.value;
    form.querySelector('#yt-save-button').removeAttribute('disabled');
    form.querySelector('#yt-save-button').focus();
}

function on_youtube_save() {

    let form = document.getElementById('youtube-form');
    let frame = form.querySelector('#yt-frame');
    frame.classList.add('shadow');
    
    let iframe = frame.firstChild;

    let frame_width = parseInt(iframe.style.width);
    let frame_height = parseInt(iframe.style.height);
    let ratio = frame_width/frame_height;

    let section = get_session_selection();
    let desired_height = Math.round(section.clientWidth/ratio);
    iframe.style.height = desired_height + 'px';
    iframe.style.width = '-webkit-fill-available';

    let html = '<div style="text-align:center">' + frame.innerHTML + '</div></br>';

    get_session_selection().innerHTML += html ;


    close_youtube();
}
