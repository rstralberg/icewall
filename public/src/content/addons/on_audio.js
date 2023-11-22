
function on_audio() {
    hide_content_pop();

    server('content/addons/audio', {
        url: '',
        comment: ''
    }).then(
        (resolve) => {
            add_form('audio-form', resolve);
        }
    );
}

function on_audio_selected(element) {
    const audioInput = element;
    if (audioInput === null) return;
    if (audioInput.files === null) return;
    if (audioInput.files.length === 0) return;
    
    const selectedAudio = audioInput.files[0];
    upload_mp3(selectedAudio).then(
        (resolve) => { 
            if( resolve.ok ) {
                let form = document.getElementById('audio-form');
                let player = form.querySelector('#au-player');
                player.src = 
                    'sites/'+ 
                    get_session_key() + '/' +
                    get_session_page().id + '/' +
                    get_session_selection().id.substr(1) + '/' +
                    'mp3/' + resolve.content;

                enable_element('au-save-button', true);
            }
            else {
                error( resolve.content);
            }
        }, 
        (reject) => { 
            error(reject);
         }
    );
}

function on_save_audio() {
    
    let content = get_session_selection();
    if (content === null) return;

    let form = document.getElementById('audio-form');
    let caption = form.querySelector('#au-caption').value;
    let player = form.querySelector('#au-player');
    player.id='';

    let html = 
    '<figure style="text-align:center">' +
        player.parentElement.innerHTML + 
        '<figcaption>' + caption + '</figcaption>' +
    '</figure><br>';
    content.innerHTML += html;
    close_audio();

    on_save_content();    
}

function close_audio() {
    remove_form('audio-form');
}