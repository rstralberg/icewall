
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
                update_content();
            },
            (reject) => { alert(reject); }
        );
    }
}

//  =================================
//  SAVE
//  =================================
function ust_save_content() {

    let select = get_session_selection();
    if (select) {

        let container = query('main');
        let pos = 0;
        for (; pos < container.childElementCount; pos++) {
            let sec = container.children[pos];
            if (sec.id === select.id) {
                break;
            }
        }
        let isPublic = get_tool_state('ust-public') === 'active';

        // we just catch a few 
        let cstyle = window.getComputedStyle(select);
        let style = '';
        if (cstyle.textAlign !== '') style += 'text-align:' + cstyle.textAlign;

        let content = {
            id: parseInt(select.id.substring(1)),
            pos: pos,
            html: select.innerHTML,
            style: style,
            isPublic: isPublic
        };

        server('update_content', content).then(
            () => {
                alert('Sparat!');
            },
            (reject) => { alert(reject); }
        );
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
                content_save();
            }
        }
    }
}

//  =================================
//  LINK
//  =================================
function ust_weblink() {

}

//  =================================
//  TITLE
//  =================================
function ust_title() {

}

//  =================================
//  LINE
//  =================================
function ust_line() {

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

    content_save();
}

function ai_close() {
    remove_form('ai-form');
}

//  =================================
//  AUDIO
//  =================================
function ust_audio() {

}

//  =================================
//  SPOTIFY
//  =================================
function ust_spotify() {

}

//  =================================
//  SOUNDCLOUD
//  =================================
function ust_soundcloud() {

}

//  =================================
//  YOUTUBE
//  =================================
function ust_youtube() {

}