
const YOUTUBE_FORM = 'youtube-form';
const YOUTUBE_URL = 'youtube-url';
const YOUTUBE_FRAME = 'youtube-frame';

var  youtubeForm = '';

function onYoutube() {
    if( youtubeForm.length > 0 ) return;
    webForm('youtube', {
        url: ''
    }). 
    then( (formName) =>  { youtubeForm = formName; } );
}

function onYoutubeSelected() {

    let track = document.getElementById(YOUTUBE_URL).value;
    if( !verifyYoutube(track) ) {
        alert('Något är fel med det du klistrade in!');
        return;
    }
    let iframe = document.getElementById(YOUTUBE_FRAME);
    iframe.innerHTML = track;
}

function onYoutubeApply() {
    
    if( !verifyYoutube(document.getElementById(YOUTUBE_URL).value) ) {
        alert('Något är fel med det du klistrade in!');
        return;
    }
    

    let block = document.getElementById(Cookie.selectedBlockId);

    let figure = document.createElement('figure');
    figure.classList.add('form-figure');
    figure.style.width = 'auto';
    figure.style.height = 'auto';

    let iframe = document.getElementById(YOUTUBE_FRAME);
    iframe.style.width = 'inherit';
    iframe.style.height = 'inherit';
    
    figure.appendChild(iframe.firstChild);
    
    block.appendChild(figure);
    block.innerHTML += '<br>';
    
    closeForm(youtubeForm);
    youtubeForm = '';
}

function onYoutubeClose() {
    closeForm(youtubeForm);
    youtubeForm = '';
}

function verifyYoutube(str) {
    return str.search('www.youtube.com') !== -1 &&
            str.search('iframe') !== -1;
}



