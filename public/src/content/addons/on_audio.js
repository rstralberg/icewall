
function on_audio() {
    
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
                document.getElementById('au-player').src = resolve.content; 
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

    let html = 
    '<figure style="text-align:center">' +
        document.getElementById('au-player').parentElement.innerHTML + 
        '<figcaption>' + document.getElementById('au-caption').value + '</figcaption>' +
    '</figure><br>';
    content.innerHTML += html;
    close_audio('audio-form');

    on_save_content();    
}

function close_audio() {
    remove_form('audio-form');
}