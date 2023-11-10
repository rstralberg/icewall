//  ===================================================
//  Supports /php/framework/left/html/add.html
//  ===================================================
//  ---------------------------------------------------
//  Add a weblink
//  ---------------------------------------------------
function weblink() {
    if (EditorSelection) {
        webForm('weblink', [
            { key: 'text', value: getSelectedText() },
            { key: 'cursorpos', value: get_caret_pos() }
        ]);
    }
}
function saveWeblink(cursorPos) {
    if (EditorSelection === null)
        return;
    if (EditorSelection)
        EditorSelection.focus();
    let text = eGetValue('#wl-text');
    let url = eGetValue('#wl-url');
    EditorSelection.innerHTML += '<a class="weblink" href="' + url + '" target="_blank">' + text + '<a>';
    closeWeblink();
}
function closeWeblink() {
    closeForm('weblink');
}
//  ---------------------------------------------------
//  Create a title of current selection
//  ---------------------------------------------------
function title() {
}
//  ---------------------------------------------------
//  Add a horizontal ruler
//  ---------------------------------------------------
function hr() {
    let content = Session.selected;
    if (content) {
        content.innerHTML += '<hr>';
        moveCursorToEnd(content);
    }
}
//  ---------------------------------------------------
//  Add an imnage
//  ---------------------------------------------------
function image() {
    webForm('imageSelect', [
        { key: 'url', value: '' },
        { key: 'size', value: 256 }
    ]);
}
function imageSelected() {
    const imageInput = document.getElementById('image-file');
    if (imageInput === null)
        return;
    if (imageInput.files === null)
        return;
    if (imageInput.files.length > 0) {
        const selectedImage = imageInput.files[0];
        const maxWidth = IMAGE_MAX_WIDTH;
        uploadImage(selectedImage, imageInput.value, maxWidth).then((resolve) => {
            let src = 'sites/' + Session.site.key + '/images/' + resolve;
            eSetSrc('image-img', src);
        }, (reject) => { error(reject); });
    }
}
function saveImage() {
    let content = Session.selected;
    if (content === null)
        return;
    let figure = document.createElement('figure');
    figure.style.width = (content.clientWidth / 4 + SHADOW_DISTANCE) + 'px';
    figure.style.height = 'auto';
    figure.style.resize = 'both';
    let img = document.createElement('img');
    img.classList.add('shadow');
    img.style.width = (content.clientWidth / 4) + 'px';
    img.style.height = 'auto';
    img.src = eGetSrc('image-img');
    img.addEventListener('load', () => {
        if (content) {
            content.appendChild(figure);
            let div = document.createElement('div');
            div.style.height = '1em';
            div.style.width = content.style.width;
            div.innerText = ' ';
            content.appendChild(div);
        }
    });
    figure.appendChild(img);
    let caption = document.createElement('figcaption');
    caption.innerText = eGetValue('image-caption');
    figure.appendChild(caption);
    // keeping shadow space
    new ResizeObserver(() => {
        figure.style.width = figure.style.width + IMAGE_MAX_WIDTH + 'px';
        img.style.width = figure.style.width;
        img.style.height = 'auto';
    }).observe(figure);
    closeImage();
}
function closeImage() {
    closeForm('imageSelect');
}
//  ---------------------------------------------------
//  Add a audio MP3 file
//  ---------------------------------------------------
function audio() {
    webForm('audio', []);
}
function mp3Selected(fileId, playerId) {
    const audioInput = eGet(fileId);
    if (audioInput === null)
        return;
    if (audioInput.files === null)
        return;
    if (audioInput.files.length === 0)
        return;
    const selectedAudio = audioInput.files[0];
    uploadAudio(selectedAudio).then((resolve) => { eSetSrc(playerId, resolve); }, (reject) => { error(reject); });
}
function saveAudio() {
    let content = Session.selected;
    if (content === null)
        return;
    let figure = document.createElement('figure');
    figure.style.width = (content.clientWidth / 4 + SHADOW_DISTANCE) + 'px';
    figure.style.height = 'auto';
    let audio = document.createElement('audio');
    audio.classList.add('shadow');
    audio.controls = true;
    audio.src = eGetSrc('audio-player');
    audio.style.width = 'inherit';
    audio.style.width = 'inherit';
    figure.appendChild(audio);
    let caption = document.createElement('figcaption');
    caption.innerText = eGetValue('audio-caption');
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
//  ---------------------------------------------------
//  Add Spotify
//  ---------------------------------------------------
function spotify() {
    webForm('spotify', [
        { key: 'url', value: '' }
    ]);
}
function spotifySelected() {
    let track = eGetValue('#sp-url');
    let iframe = eGet('#sp-frame');
    if (iframe)
        iframe.innerHTML = track;
}
function saveSpotify() {
    if (!verifySpotify(eGetValue('#sp-url'))) {
        popup('Något är fel med det du klistrade in!');
        return;
    }
    let content = Session.selected;
    if (content === null)
        return;
    let figure = document.createElement('figure');
    figure.style.width = 'auto';
    figure.style.height = 'auto';
    let iframe = eGet('#sp-frame');
    if (iframe)
        figure.appendChild(iframe.firstChild);
    content.appendChild(figure);
    content.innerHTML += '<br>';
    closeSpotify();
}
function closeSpotify() {
    closeForm('spotify');
}
function verifySpotify(str) {
    return str.search('open.spotify.com') !== -1 &&
        str.search('iframe') !== -1;
}
//  ---------------------------------------------------
//  Add Soundcloud
//  ---------------------------------------------------
function soundcloud() {
    webForm('soundcloud', [
        { key: 'url', value: '' }
    ]);
}
function soundcloudSelected() {
    if (!verifySoundcloud(eGetValue('#sc-url'))) {
        popup('Något är fel med det du klistrade in!');
        return;
    }
    let track = eGetValue('#sc-url');
    let iframe = eGet('#sc-frame');
    if (iframe)
        iframe.innerHTML = track;
}
function saveSoundcloud() {
    if (!verifySoundcloud(eGetValue('#sc-url'))) {
        popup('Något är fel med det du klistrade in!');
        return;
    }
    let content = Session.selected;
    if (content === null)
        return;
    let figure = document.createElement('figure');
    figure.style.width = 'autp';
    figure.style.height = 'auto';
    let iframe = eGet('#sc-frame');
    if (iframe)
        figure.appendChild(iframe.firstChild);
    content.appendChild(figure);
    content.innerHTML += '<br>';
    closeSoundcloud();
}
function closeSoundcloud() {
    closeForm('soundcloud');
}
function verifySoundcloud(str) {
    return str.search('w.soundcloud.com') !== -1 &&
        str.search('iframe') !== -1;
}
//  ---------------------------------------------------
//  Add Youtube
//  ---------------------------------------------------
function youtube() {
    webForm('youtube', [
        { key: 'url', value: '' }
    ]);
}
function youtubeSelected() {
    let track = eGetValue('#yt-url');
    if (!verifyYoutube(track)) {
        popup('Något är fel med det du klistrade in!');
        return;
    }
    let iframe = document.getElementById('yt-frame');
    if (iframe)
        iframe.innerHTML = track;
}
function saveYoutube() {
    if (!verifyYoutube(eGetValue('#yt-url'))) {
        popup('Något är fel med det du klistrade in!');
        return;
    }
    let content = Session.selected;
    if (content === null)
        return;
    let figure = document.createElement('figure');
    figure.style.width = 'auto';
    figure.style.height = 'auto';
    let iframe = eGet('#yt-frame');
    if (iframe) {
        iframe.style.width = 'inherit';
        iframe.style.height = 'inherit';
        figure.appendChild(iframe.firstChild);
    }
    content.appendChild(figure);
    content.innerHTML += '<br>';
    closeYoutube();
}
function closeYoutube() {
    closeForm('youtube');
}
function verifyYoutube(str) {
    return str.search('www.youtube.com') !== -1 &&
        str.search('iframe') !== -1;
}
