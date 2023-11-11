
// ust-delete-content
// ust-save-content
// ust-move-up
// ust-move-down
// ust-public"
// ust-bold
// ust-italic
// ust-normal
// ust-mark
// ust-alignleft
// ust-aligncenter
// ust-alignright
// ust-shadows
// ust-weblink
// ust-title
// ust-line
// ust-image
// ust-audio
// ust-spotify
// ust-soundcloud
// ust-youtube

function init_usertools() {

    release_user_tools();
    let left = query_class('left');
    left.style.display = get_session_user().username === '' ? 'none' : 'block';

}

function init_user_tools() {
    set_tool_state('ust-delete-content', 'normal');
    set_tool_state('ust-save-content', 'normal');
    set_tool_state('ust-move-up', 'normal');
    set_tool_state('ust-move-down', 'normal');
    set_tool_state('ust-public', 'normal');
    set_tool_state('ust-bold', 'normal');
    set_tool_state('ust-italic', 'normal');
    set_tool_state('ust-normal', 'normal');
    set_tool_state('ust-mark', 'normal');
    set_tool_state('ust-alignleft', 'normal');
    set_tool_state('ust-aligncenter', 'normal');
    set_tool_state('ust-alignright', 'normal');
    set_tool_state('ust-shadows', 'normal');
    set_tool_state('ust-weblink', 'normal');
    set_tool_state('ust-title', 'normal');
    set_tool_state('ust-line', 'normal');
    set_tool_state('ust-image', 'normal');
    set_tool_state('ust-audio', 'normal');
    set_tool_state('ust-spotify', 'normal');
    set_tool_state('ust-soundcloud', 'normal');
    set_tool_state('ust-youtube', 'normal');
}


function update_user_tools(section) {

    let cstyle = window.getComputedStyle(section);
    switch (cstyle.textAlign) {
        case 'left':
            set_tool_state('ust-alignleft', 'active');
            set_tool_state('ust-aligncenter', 'normal');
            set_tool_state('ust-alignright', 'normal');
            break;

        case 'center':
            set_tool_state('ust-alignleft', 'normal');
            set_tool_state('ust-aligncenter', 'active');
            set_tool_state('ust-alignright', 'normal');
            break;

        case 'right':
            set_tool_state('ust-alignleft', 'normal');
            set_tool_state('ust-aligncenter', 'normal');
            set_tool_state('ust-alignright', 'active');
            break;
    }

}

function release_user_tools() {
    set_tool_state('ust-delete-content', 'disabled');
    set_tool_state('ust-save-content', 'disabled');
    set_tool_state('ust-move-up', 'disabled');
    set_tool_state('ust-move-down', 'disabled');
    set_tool_state('ust-public', 'disabled');
    set_tool_state('ust-bold', 'disabled');
    set_tool_state('ust-italic', 'disabled');
    set_tool_state('ust-normal', 'disabled');
    set_tool_state('ust-mark', 'disabled');
    set_tool_state('ust-alignleft', 'disabled');
    set_tool_state('ust-aligncenter', 'disabled');
    set_tool_state('ust-alignright', 'disabled');
    set_tool_state('ust-shadows', 'disabled');
    set_tool_state('ust-weblink', 'disabled');
    set_tool_state('ust-title', 'disabled');
    set_tool_state('ust-line', 'disabled');
    set_tool_state('ust-image', 'disabled');
    set_tool_state('ust-audio', 'disabled');
    set_tool_state('ust-spotify', 'disabled');
    set_tool_state('ust-soundcloud', 'disabled');
    set_tool_state('ust-youtube', 'disabled');

}

//  =================================
//  DELETE 
//  =================================
function ust_delete_content() {
    let select = get_session_selection();
    if (select) {
        server('unregister_content', {
            contentid: parseInt(select.id.substring(1))
        }).then(
            () => {
                get_content();
            },
            (reject) => { alert(reject); }
        );
    }
}

//  =================================
//  SAVE
//  =================================
function ust_save_content() {
    save_content();
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
            curstate: get_tool_state('ust-public') === 'active'
        }).then(
            (resolve) => {
                set_tool_state('ust-public', resolve ? 'active' : 'normal');
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

function on_weblink(valueElement) {
    if (ust_webnode) {
        let wnode = document.createElement('a');
        wnode.href = valueElement.value;
        wnode.taget = '_blank';
        wnode.innerText = ust_webnode.textContent;

        ust_webnode.replaceWith(wnode);

        ust_webnode = null;
        save_content();

    }
    remove_form('simple');
}


//  =================================
//  TITLE
//  =================================
function ust_title() {
    simple('Titel', 'Text', '?', 'on_title');
}

function on_title(valueElement) {
    let h1 = document.createElement('h1');
    h1.innerText = valueElement.value;
    get_session_selection().append(h1);
    get_session_selection().innerHTML += '<br>';
    remove_form('simple');
    save_content();

}

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

    const imageInput = query_id('ai-file');
    if (imageInput.files.length > 0) {
        const selectedImage = imageInput.files[0];
        const maxWidth = 1024;

        upload_image(selectedImage, maxWidth).then(
            (resolve) => {
                if (resolve.ok) {
                    query_id('ai-image').innerHTML = resolve.content;
                    query_id('ai-save').removeAttribute('disabled');
                }
            },
            (reject) => { alert(reject); }

        );
    }
}

function ai_save() {

    let html = query_id('ai-image').innerHTML;
    html = replace_between_tags(html, '<figcaption>', '</figcaption>', query_value('ai-caption'));
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
    const audioInput = query_id('au-file');
    if (audioInput === null) return;
    if (audioInput.files === null) return;
    if (audioInput.files.length === 0) return;
    
    const selectedAudio = audioInput.files[0];
    upload_mp3(selectedAudio).then(
        (resolve) => { 
            if( resolve.ok ) {
                console.log(resolve.content);
                query_id('au-player').src = resolve.content; 
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
    audio.src = query_id('au-player').src;
    audio.style.width = 'inherit';
    audio.style.width = 'inherit';
    figure.appendChild(audio);

    let caption = document.createElement('figcaption');
    caption.innerText = query_value('au-caption');
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
    let frame = query_id('sp-frame');
    let url = query_value('sp-url');
    frame.innerHTML = url;
}

function spotify_save() {
    let frame = query_id('sp-frame');
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
    let frame = query_id('sc-frame');
    let url = query_value('sc-url');
    frame.innerHTML = url;
}

function soundcloud_save() {
    let frame = query_id('sc-frame');
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
    let frame = query_id('yt-frame');
    let url = query_value('yt-url');
    frame.innerHTML = url;
}

function youtube_save() {
    let frame = query_id('yt-frame');
    get_session_selection().innerHTML += frame.innerHTML;
    get_session_selection().innerHTML += '<br>';
    save_content();
    remove_form('youtube-form');
}

function youtube_close() {
    remove_form('youtube-form');
}
