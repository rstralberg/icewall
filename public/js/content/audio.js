
function onAudio() {
    webForm('audio');
}

function mp3Selected() {

    const audioInput = document.getElementById('audio-file');
    if (audioInput.files.length > 0) {
        const selectedAudio = audioInput.files[0];

        let folder = Session.site.folder + '/uploads/' + Session.page.id;
        uploadAudio(selectedAudio, folder).then(
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

function saveAudio() {
    let content = Session.selected;
    if( content === null) return;

    let figure = document.createElement('figure');
    figure.classList.add('form-figure');
    figure.style.width = (content.clientWidth / 4 + SHADOW_DISTANCE) + 'px';
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

    content.appendChild(figure);

    let div = document.createElement('div');
    content.appendChild(div);
    
    // keeping shadow space
    new ResizeObserver(() => {
        figure.style.width = figure.style.width + SHADOW_DISTANCE + 'px';
        audio.style.width = figure.style.width;
        audio.style.height = 'auto';
    }).observe(figure);

    closeAudio();
}

function closeAudio() {
    closeForm('audio');
}


