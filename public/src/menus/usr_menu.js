
function usr_menu() {

    release_user_tools();
    let left = document.getElementById('user-menu');
    left.style.display = get_session_user().username === '' ? 'none' : 'block';
}

function init_user_tools() {
    set_tool_state('cont-delete-content', 'normal');
    set_tool_state('cont-save-content', 'normal');
    set_tool_state('cont-move-up', 'normal');
    set_tool_state('cont-move-down', 'normal');
    set_tool_state('cont-public', 'normal');
    set_tool_state('cont-bold', 'normal');
    set_tool_state('cont-italic', 'normal');
    set_tool_state('cont-normal', 'normal');
    set_tool_state('cont-mark', 'normal');
    set_tool_state('cont-alignleft', 'normal');
    set_tool_state('cont-aligncenter', 'normal');
    set_tool_state('cont-alignright', 'normal');
    set_tool_state('cont-shadows', 'normal');
    set_tool_state('cont-weblink', 'normal');
    set_tool_state('cont-title', 'normal');
    set_tool_state('cont-line', 'normal');
    set_tool_state('cont-image', 'normal');
    set_tool_state('cont-audio', 'normal');
    set_tool_state('cont-spotify', 'normal');
    set_tool_state('cont-soundcloud', 'normal');
    set_tool_state('cont-youtube', 'normal');
}

function update_user_tools(section) {

    let cstyle = window.getComputedStyle(section);
    switch (cstyle.textAlign) {
        case 'left':
            set_tool_state('cont-alignleft', 'active');
            set_tool_state('cont-aligncenter', 'normal');
            set_tool_state('cont-alignright', 'normal');
            break;

        case 'center':
            set_tool_state('cont-alignleft', 'normal');
            set_tool_state('cont-aligncenter', 'active');
            set_tool_state('cont-alignright', 'normal');
            break;

        case 'right':
            set_tool_state('cont-alignleft', 'normal');
            set_tool_state('cont-aligncenter', 'normal');
            set_tool_state('cont-alignright', 'active');
            break;
    }

}

function release_user_tools() {
    set_tool_state('cont-delete-content', 'disabled');
    set_tool_state('cont-save-content', 'disabled');
    set_tool_state('cont-move-up', 'disabled');
    set_tool_state('cont-move-down', 'disabled');
    set_tool_state('cont-public', 'disabled');
    set_tool_state('cont-bold', 'disabled');
    set_tool_state('cont-italic', 'disabled');
    set_tool_state('cont-normal', 'disabled');
    set_tool_state('cont-mark', 'disabled');
    set_tool_state('cont-alignleft', 'disabled');
    set_tool_state('cont-aligncenter', 'disabled');
    set_tool_state('cont-alignright', 'disabled');
    set_tool_state('cont-shadows', 'disabled');
    set_tool_state('cont-weblink', 'disabled');
    set_tool_state('cont-title', 'disabled');
    set_tool_state('cont-line', 'disabled');
    set_tool_state('cont-image', 'disabled');
    set_tool_state('cont-audio', 'disabled');
    set_tool_state('cont-spotify', 'disabled');
    set_tool_state('cont-soundcloud', 'disabled');
    set_tool_state('cont-youtube', 'disabled');

}

//  =================================
//  DELETE 
//  =================================
function yes_delete_content() {
    close_yesno();
    server('unregister_content', {
        contentid: parseInt(get_session_selection().id.substring(1))
    }).then(
        () => {
            get_content();
        },
        (reject) => { alert(reject); }
    );
}
function no_delete_content() {
    close_yesno();
}

function ust_delete_content() {
    let select = get_session_selection();
    if (select) {
        yesno('Radera innehåll', 'Är du säker på att du vill radera vald innehållsavdelning?', 'yes_delete_content', 'no_delete_content');
    }
}


//  =================================
//  MOVE
//  =================================
function ust_move_up() {

    let content = get_session_selection();
    if (!is_valid(content)) return;

    if (content.previousElementSibling) {
        content.parentNode.insertBefore(content, content.previousElementSibling);
        update_content_positions();
    }

}

function ust_move_down() {

    let content = get_session_selection();
    if (!is_valid(content)) return;

    if (content.nextElementSibling) {
        content.parentNode.insertBefore(content.nextElementSibling, content);
        update_content_positions();
    }

}

//  =================================
//  PUBLIC
//  =================================
function ust_public() {

    let selection = get_session_selection();
    if (selection) {
        server('toggle_content_public', {
            id: parseInt(selection.id.substring(1)),
            curstate: get_tool_state('cont-public') === 'active'
        }).then(
            (resolve) => {
                set_tool_state('cont-public', resolve ? 'active' : 'normal');
                selection.setAttribute('ispublic', resolve ? 'true' : 'false');
            },
            (reject) => { alert(reject); }
        );
    }
}

//  =================================
//  TAGS
//  =================================
function ust_bold() {
    toggle_tag('STRONG');
}

function ust_italic() {
    toggle_tag('EM');
}

function ust_normal() {
    clear_tags();
}

function ust_mark() {
    toggle_tag('H2');
}

//  =================================
//  ALIGN
//  =================================
function ust_alignleft() {
    alignement('left');
}

function ust_aligncenter() {
    alignement('center');
}

function ust_alignright() {
    alignement('right');
}

function alignement(cmd) {

    let section = get_session_selection();
    if( is_valid(section)) {
        let node = get_selected_node();
        if( is_valid(node) && is_valid(node.parentNode)) {
            node.parentNode.style.textAlign = cmd; 
            save_content();
        }
        else {
            section.style.textAlign = cmd;
            update_section_style();
        }
    }
}

//  =================================
//  SHADOWS
//  =================================
function ust_shadows() {
    let section = get_session_selection();
    if (is_valid(section)) {
        let node = get_selected_node();
        if (is_valid(node)) {
            let img = node.querySelectorAll('img');
            if (img && img.length > 0) {
                node = img[0];
                if (node.classList.contains('shadow'))
                    node.classList.remove('shadow');
                else
                    node.classList.add('shadow');
                save_content();
            }
        }
    }
}

//  =================================
//  LINK
//  =================================
var ust_webnode = null;
function ust_weblink() {
    let node = get_selected_node();
    if (node.nodeName === '#text') {
        ust_webnode = node;
        simple('Webblänk', 'Länk', 'https://', 'on_weblink');
    }
}

// function on_weblink(valueElement) {
//     if (ust_webnode) {
//         let wnode = document.createElement('a');
//         wnode.href = valueElement.value;
//         wnode.taget = '_blank';
//         wnode.innerText = ust_webnode.textContent;

//         ust_webnode.replaceWith(wnode);

//         ust_webnode = null;
//         save_content();

//     }
//     remove_form('simple');
// }


//  =================================
//  LINE
//  =================================
function ust_line() {
    let hr = document.createElement('hr');
    get_session_selection().append(hr);
    get_session_selection().innerHTML += '<br>';
    save_content();

}

//  =================================
//  IMAGE
//  =================================
function ust_image() {
    server('add_image', {
        size: 256,
        url: '',
        caption: ''
    }).then(
        (resolve) => {
            add_form('ai-form', resolve);
        },
        (reject) => { console.error(reject); }
    );
}

function ai_file() {

    const imageInput = document.getElementById('ai-file');
    if (imageInput.files.length > 0) {
        const selectedImage = imageInput.files[0];
        
        upload_image(selectedImage, MAX_IMAGE_SIZE).then(
            (resolve) => {
                if (resolve.ok) {
                    document.getElementById('ai-image').innerHTML = picture_code(resolve.content, null, 300);
                    document.getElementById('ai-save').removeAttribute('disabled');
                }
            },
            (reject) => { alert(reject); }

        );
    }
}

function ai_save() {

    let html = document.getElementById('ai-image').innerHTML;
    html = replace_between_tags(html, '<figcaption>', '</figcaption>', document.getElementById('ai-caption').value);
    get_session_selection().innerHTML += html;
    remove_form('ai-form');

    save_content();
}

function ai_close() {
    remove_form('ai-form');
}

//  =================================
//  AUDIO
//  =================================
function ust_audio() {

    server('audio', {
        url:'',
        comment:''
    }).then( 
        (resolve) => {
            add_form('audio-form', resolve);
        },
        (reject) => {
            error(reject);
        }
    )
}

function mp3Selected() {
    const audioInput = document.getElementById('au-file');
    if (audioInput === null) return;
    if (audioInput.files === null) return;
    if (audioInput.files.length === 0) return;
    
    const selectedAudio = audioInput.files[0];
    upload_mp3(selectedAudio).then(
        (resolve) => { 
            if( resolve.ok ) {
                console.log(resolve.content);
                document.getElementById('au-player').src = resolve.content; 
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

function saveAudio() {
    let content = get_session_selection();
    if (content === null) return;

    let figure = document.createElement('figure');
    figure.style.width = (content.clientWidth / 4 + 32) + 'px';
    figure.style.height = 'auto';

    let audio = document.createElement('audio');
    audio.classList.add('shadow');
    audio.controls = true;
    audio.src = document.getElementById('au-player').src;
    audio.style.width = 'inherit';
    audio.style.width = 'inherit';
    figure.appendChild(audio);

    let caption = document.createElement('figcaption');
    caption.innerText = document.getElementById('au-caption').value;
    caption.style.width = 'inherit';
    caption.style.width = 'inherit';
    figure.appendChild(caption);
    
    content.appendChild(figure);

    let div = document.createElement('div');
    content.appendChild(div);

    // keeping shadow space
    new ResizeObserver(() => {
        figure.style.width = figure.style.width + 32 + 'px';
        audio.style.width = figure.style.width;
        audio.style.height = 'auto';
    }).observe(figure);

    remove_form('audio-form');
    save_content();
}

function closeAudio() {
    remove_form('audio-form');
}

//  =================================
//  SPOTIFY
//  =================================
function ust_spotify() {

    server('spotify', {
        url: ''
    }).then(
        (resolve) => {
            add_form('spotify-form', resolve);
        },
        (reject) => {
            error( reject );
        }
    );
}

function spotify_selected() {
    let frame = document.getElementById('sp-frame');
    let url = document.getElementById('sp-url').value;
    frame.innerHTML = url;
}

function spotify_save() {
    let frame = document.getElementById('sp-frame');
    get_session_selection().innerHTML += frame.innerHTML;
    get_session_selection().innerHTML += '<br>';
    save_content();
    remove_form('spotify-form');
}

function spotify_close() {
    remove_form('spotify-form');
}

//  =================================
//  SOUNDCLOUD
//  =================================
function ust_soundcloud() {

    server('soundcloud', {
        url: ''
    }).then(
        (resolve) => {
            add_form('soundcloud-form', resolve);
        },
        (reject) => {
            error( reject );
        }
    );
}

function soundcloud_selected() {
    let frame = document.getElementById('sc-frame');
    let url = document.getElementById('sc-url').value;
    frame.innerHTML = url;
}

function soundcloud_save() {
    let frame = document.getElementById('sc-frame');
    get_session_selection().innerHTML += frame.innerHTML;
    get_session_selection().innerHTML += '<br>';
    save_content();
    remove_form('soundcloud-form');
}

function soundcloud_close() {
    remove_form('soundcloud-form');
}


//  =================================
//  YOUTUBE
//  =================================
function ust_youtube() {

    server('youtube', {
        url: ''
    }).then(
        (resolve) => {
            add_form('youtube-form', resolve);
        },
        (reject) => {
            error( reject );
        }
    );
}

function youtube_selected() {
    let frame = document.getElementById('yt-frame');
    let url = document.getElementById('yt-url').value;
    frame.innerHTML = url;
}

function youtube_save() {
    let frame = document.getElementById('yt-frame');
    get_session_selection().innerHTML += frame.innerHTML;
    get_session_selection().innerHTML += '<br>';
    save_content();
    remove_form('youtube-form');
}

function youtube_close() {
    remove_form('youtube-form');
}
