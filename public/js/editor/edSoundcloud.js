const SOUNDCLOUD_URL = 'soundcloud-url';
const SOUNDCLOUD_FRAME = 'soundcloud-frame';


var soundcloudForm = '';

function onSoundcloud() {
    if( soundcloudForm.length > 0 ) return;
    webForm('soundcloud', { url:''} ). 
    then( (formname) => { soundcloudForm = formname; });
}

function onSoundcloudSelected() {

    if( !verifySoundcloud(document.getElementById(SOUNDCLOUD_URL).value) ) {
        alert('Något är fel med det du klistrade in!');
        return;
    }

    let track = document.getElementById(SOUNDCLOUD_URL).value;
    let iframe = document.getElementById(SOUNDCLOUD_FRAME);
    iframe.innerHTML = track;
}

function onSoundcloudApply() {

    if( !verifySoundcloud(document.getElementById(SOUNDCLOUD_URL).value) ) {
        alert('Något är fel med det du klistrade in!');
        return;
    }


    let block = document.getElementById(Cookie.selectedBlockId);

   
    let figure = document.createElement('figure');
    figure.classList.add('form-figure');
    figure.style.width = 'autp';
    figure.style.height = 'auto';

    let iframe = document.getElementById(SOUNDCLOUD_FRAME);
    figure.appendChild(iframe.firstChild);

    block.appendChild(figure);
    block.innerHTML += '<br>';
    
    closeForm(soundcloudForm);
    soundcloudForm = '';
}

function onSoundcloudClose() {
    closeForm(soundcloudForm);
    soundcloudForm = '';
}

function verifySoundcloud(str) {
    return str.search('w.soundcloud.com') !== -1 &&
            str.search('iframe') !== -1;
}



