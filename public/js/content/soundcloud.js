const SOUNDCLOUD_URL = 'soundcloud-url';
const SOUNDCLOUD_FRAME = 'soundcloud-frame';


function onSoundcloud() {
    webForm('soundcloud', { url:''} );
}

function soundcloudSelected() {

    if( !verifySoundcloud(document.getElementById(SOUNDCLOUD_URL).value) ) {
        alert('Något är fel med det du klistrade in!');
        return;
    }

    let track = document.getElementById(SOUNDCLOUD_URL).value;
    let iframe = document.getElementById(SOUNDCLOUD_FRAME);
    iframe.innerHTML = track;
}

function saveSoundcloud() {

    if( !verifySoundcloud(document.getElementById(SOUNDCLOUD_URL).value) ) {
        alert('Något är fel med det du klistrade in!');
        return;
    }


    let content = Session.selected;
    if( content === null) return;

   
    let figure = document.createElement('figure');
    figure.classList.add('form-figure');
    figure.style.width = 'autp';
    figure.style.height = 'auto';

    let iframe = document.getElementById(SOUNDCLOUD_FRAME);
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



