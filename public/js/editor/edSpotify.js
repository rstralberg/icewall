const SPOTIFY_URL = 'spotify-url';
const SPOTIFY_FRAME = 'spotify-frame';

var spotifyForm = '';
function onSpotify() {
    if( spotifyForm.length > 0 ) return;
    webForm('spotify', {url: ''}). 
    then( (forname) => { spotifyForm = forname; });
}

function onSpotifySelected() {

    let track = document.getElementById(SPOTIFY_URL).value;
    let iframe = document.getElementById(SPOTIFY_FRAME);
    iframe.innerHTML = track;
}

function onSpotifyApply() {

    if( !verifySpotify(document.getElementById(SPOTIFY_URL).value) ) {
        alert('Något är fel med det du klistrade in!');
        return;
    }


    let block = document.getElementById(Cookie.selectedBlockId);

   
    let figure = document.createElement('figure');
    figure.classList.add('form-figure');
    figure.style.width = 'auto';
    figure.style.height = 'auto';

    let iframe = document.getElementById(SPOTIFY_FRAME);
    figure.appendChild(iframe.firstChild);
    
    block.appendChild(figure);
    block.innerHTML += '<br>';
    
    closeForm(spotifyForm);
    spotifyForm='';
}

function onSpotifyClose() {
    closeForm(spotifyForm);
    spotifyForm='';
}

function verifySpotify(str) {
    return str.search('open.spotify.com') !== -1 &&
            str.search('iframe') !== -1;
}
