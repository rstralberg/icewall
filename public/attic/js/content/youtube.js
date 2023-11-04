
const YOUTUBE_FORM = 'youtube-form';
const YOUTUBE_URL = 'youtube-url';
const YOUTUBE_FRAME = 'youtube-frame';

function onYoutube() {
    webForm('youtube', {url: ''});
}

function youtubeSelected() {

    let track = document.getElementById(YOUTUBE_URL).value;
    if( !verifyYoutube(track) ) {
        alert('Något är fel med det du klistrade in!');
        return;
    }
    let iframe = document.getElementById(YOUTUBE_FRAME);
    iframe.innerHTML = track;
}

function saveYoutube() {
    
    if( !verifyYoutube(document.getElementById(YOUTUBE_URL).value) ) {
        alert('Något är fel med det du klistrade in!');
        return;
    }
    

    let content = Session.selected;
    if( content === null ) return ;

    let figure = document.createElement('figure');
    figure.classList.add('form-figure');
    figure.style.width = 'auto';
    figure.style.height = 'auto';

    let iframe = document.getElementById(YOUTUBE_FRAME);
    iframe.style.width = 'inherit';
    iframe.style.height = 'inherit';
    
    figure.appendChild(iframe.firstChild);
    
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



