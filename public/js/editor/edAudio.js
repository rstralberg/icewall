
var audioForm = '';

function onAudio() {
    if( audioForm.length > 0 ) return;
    webForm('audio').then( (formName) => { audioForm = formName; } ) ;
}

function onAudioSelected() {

    const audioInput = document.getElementById('audio-file');
    if (audioInput.files.length > 0) {
        const selectedAudio = audioInput.files[0];

        uploadAudio(selectedAudio, 'p' + Cookie.pageId).then(
            (resolve) => {
                if (resolve.status === 'ok') {
                    document.getElementById('audio-player').src = resolve.content;
                }
            },
            (reject) => {
                alert(reject.content);
            }
        );
    }
}

function onAudioApply() {
    let block = document.getElementById(Cookie.selectedBlockId);

    let figure = document.createElement('figure');
    figure.classList.add('form-figure');
    figure.style.width = (block.clientWidth / 4 + SHADOW_DISTANCE) + 'px';
    figure.style.height = 'auto';

    let audio = document.createElement('audio');
    audio.classList.add('shadow');
    audio.controls = true;
    audio.src = document.getElementById('audio-player').src;
    audio.style.width = 'inherit';
    audio.style.width = 'inherit';
    figure.appendChild(audio);

    let caption = document.createElement('figcaption');
    caption.classList.add('form-caption');
    caption.innerText = document.getElementById('audio-caption').value;
    caption.style.width = 'inherit';
    caption.style.width = 'inherit';
    figure.appendChild(caption);

    block.appendChild(figure);

    let div = document.createElement('div');
    block.appendChild(div);
    
    // keeping shadow space
    new ResizeObserver(() => {
        figure.style.width = figure.style.width + SHADOW_DISTANCE + 'px';
        audio.style.width = figure.style.width;
        audio.style.height = 'auto';
    }).observe(figure);

    closeForm(audioForm);
    audioForm = '';
}

function onAudioClose() {
    closeForm(audioForm);
    audioForm = '';
}


