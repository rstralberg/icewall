const SPOTIFY_URL = 'spotify-url';
const SPOTIFY_FRAME = 'spotify-frame';

function onSpotify() {
    webForm('spotify', {url: ''});
}

function spotifySelected() {

    let track = document.getElementById(SPOTIFY_URL).value;
    let iframe = document.getElementById(SPOTIFY_FRAME);
    iframe.innerHTML = track;
}

function saveSpotify() {

    if( !verifySpotify(document.getElementById(SPOTIFY_URL).value) ) {
        alert('Något är fel med det du klistrade in!');
        return;
    }

    let content = Session.selected;
    if( content === null ) return;

   
    let figure = document.createElement('figure');
    figure.classList.add('form-figure');
    figure.style.width = 'auto';
    figure.style.height = 'auto';

    let iframe = document.getElementById(SPOTIFY_FRAME);
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
