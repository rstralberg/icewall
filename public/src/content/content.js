
// WARNING!!! THIS FILE IS A MONSTER :) :) 


//  ===================================================
//  Attach editing possibilites to selected section
//  ===================================================
var edit_target = null;
var cur_article = null;
var org_class = null;
function attach_editor(element) {

    edit_target = element;

    org_class = null;
    if (edit_target.classList.contains('public')) org_class = 'public';
    else if (edit_target.classList.contains('draft')) org_class = 'draft';
    remove_class(edit_target, 'public');
    remove_class(edit_target, 'draft');
    add_class(element, 'active-section');

    add_content_listeners(edit_target);

    let images = edit_target.querySelectorAll('img');
    for (let i = 0; i < images.length; i++) {
        let child = images[i];
        child.addEventListener('wheel', (e) => { resize_img_by_wheel(e); });
    }
    edit_target.contentEditable = true;
}

function detach_editor() {
    if (edit_target) {

        for (let i = 0; i < edit_target.childElementCount; i++) {
            let child = edit_target.children[i];
            child.style.resize = 'none';
        }

        editor_clean_up();
        edit_target.classList.remove('active-section');
        if (org_class) add_class(edit_target, org_class);
        edit_target.contentEditable = false;
        edit_target = null;
        cur_article = null;
    }
}

function enter_article(element) {
    leave_article(cur_article);
    if (element.tagName !== 'SECTION') {
        cur_article = element;
        cur_article.contentEditable = true;
        cur_article.style.border = '2px solid ' + get_style('contFg');
    }
}

function leave_article(element) {
    if (is_valid(cur_article)) {
        cur_article.contentEditable = false;
        cur_article.style.border = '1px dotted ' + get_style('contFg');
        cur_article = null;
    }
}

function editor_clean_up() {

    remove_content_listeners(edit_target);

    for( let i=0; i < edit_target.childElementCount; i++ ) {
        let child = edit_target.children[i];
        if( child.tagName !== 'ARTICLE') {
            edit_target.removeChild(child);
        } else {
            if( child.childElementCount === 1 && child.firstChild.tagName === 'BR' )
                edit_target.remove(child);
        }
    }

    edit_target.classList.remove('active-section');
    if (org_class) add_class(edit_target, org_class);
    
    edit_target.contentEditable = false;
    edit_target = null;
    cur_article = null;
}


function add_element_border(element) {
    element.style.border = '1px dotted ' + get_style('contFg');
}

function remove_element_border(element) {
    element.style.border = '1px dotted ' + get_style('contFg');
}

function add_content_listeners(element) {
    if (element.tagName !== 'SECTION') {

        // this can certainly be optimized :)
        switch (element.tagName) {
            case 'H1':
                add_element_border(element.parentElement);
                element.parentElement.addEventListener('mouseenter', (e) => {
                    enter_article(element.parentElement);
                });
                element.parentElement.addEventListener('dblclick', (e) => {
                    enter_article(element.parentElement);
                    title_hook(element);
                });
                break;

            case 'HR':
                add_element_border(element.parentElement);
                element.parentElement.addEventListener('mouseenter', (e) => {
                    enter_article(element.parentElement);
                });
                element.parentElement.addEventListener('dblclick', (e) => {
                    enter_article(element.parentElement);
                    line_hook(element);
                });
                break;

            case 'ARTICLE':
                switch (element.getAttribute('type')) {
                    case 'text':
                        add_element_border(element);
                        element.addEventListener('mouseenter', (e) => {
                            enter_article(element);
                        });
                        element.addEventListener('dblclick', (e) => {
                            enter_article(element);
                            text_hook(element);
                        });
                        break;
                }
                break;

            case 'IMG':
                add_element_border(element.parentElement.parentElement);
                element.parentElement.parentElement.addEventListener('mouseenter', (e) => {
                    enter_article(element.parentElement.parentElement);
                });
                element.parentElement.parentElement.addEventListener('dblclick', (e) => {
                    enter_article(element.parentElement.parentElement);
                    let caps = element.parentElement.querySelectorAll('FIGCAPTION');
                    if (is_valid(caps)) {
                        img_hook(element, element.src, caps[0].innerText);
                    }
                    else {
                        img_hook(element, element.src, '');
                    }
                });
                break;

            case 'AUDIO':
                add_element_border(element.parentElement.parentElement);
                element.parentElement.parentElement.addEventListener('mouseenter', (e) => {
                    enter_article(element.parentElement.parentElement);
                });
                element.parentElement.parentElement.addEventListener('dblclick', (e) => {
                    enter_article(element.parentElement.parentElement);
                    let caption = '' ;
                    let caps = cur_article.querySelectorAll('FIGCAPTION');
                    if( is_valid(caps)) {
                        caption = caps[0].innerText;
                    }
                    audio_hook(element, element.src, caption );
                });
                break;

            case 'IFRAME':
                if (element.src.includes('spotify')) {
                    add_element_border(element.parentElement);
                    element.parentElement.addEventListener('mouseenter', (e) => {
                        enter_article(element.parentElement);
                    });
                    element.parentElement.addEventListener('dblclick', (e) => {
                        enter_article(element.parentElement);
                        spotify_hook(element);
                    });
                    break;
                }
                else if (element.src.includes('soundcloud')) {
                    add_element_border(element.parentElement);
                    element.parentElement.addEventListener('mouseenter', (e) => {
                        enter_article(element.parentElement);
                    });
                    element.parentElement.addEventListener('dblclick', (e) => {
                        enter_article(element.parentElement);
                        soundcloud_hook(element, element.src);
                    });
                    break;
                }
                else if (element.src.includes('youtube')) {
                    add_element_border(element.parentElement);
                    element.parentElement.addEventListener('mouseenter', (e) => {
                        enter_article(element.parentElement);
                    });
                    element.parentElement.addEventListener('dblclick', (e) => {
                        enter_article(element.parentElement);
                        youtube_hook(element, element.src);
                    });
                    break;
                }
                break;

            case 'A':
                add_element_border(element.parentElement);
                element.parentElement.addEventListener('mouseenter', (e) => {
                    enter_article(element.parentElement);
                });
                element.parentElement.addEventListener('dblclick', (e) => {
                    enter_article(element.parentElement);
                    weblink_hook(element, element.href, element.innerText);
                });
                break;

            case 'BR':
                element.style.outline = '2px solid red';
                break;

        }
    }
    for (let child of element.children) {
        add_content_listeners(child);
    }

}

function remove_content_listeners(element) {
    if (element.tagName !== 'SECTION') {
        
        // this can certainly be optimized :)
        switch (element.tagName) {
            case 'H1':
                remove_element_border(element.parentElement);
                element.parentElement.removeEventListener('mouseenter', (e) => {} );
                element.parentElement.addEventListener('dblclick', (e) => {} );
                break;

            case 'HR':
                remove_element_border(element.parentElement);
                element.parentElement.removeEventListener('mouseenter', (e) => {});
                element.parentElement.removeEventListener('dblclick', (e) => {});
                break;

            case 'ARTICLE':
                switch (element.getAttribute('type')) {
                    case 'text':
                        remove_element_border(element);
                        element.removeEventListener('mouseenter', (e) => {});
                        element.removeEventListener('dblclick', (e) => {});
                        break;
                }
                break;

            case 'IMG':
                remove_element_border(element.parentElement.parentElement);
                element.parentElement.parentElement.removeEventListener('mouseenter', (e) => {});
                element.parentElement.parentElement.removeEventListener('dblclick', (e) => {});
                break;

            case 'AUDIO':
                remove_element_border(element.parentElement.parentElement);
                element.parentElement.parentElement.removeEventListener('mouseenter', (e) => {});
                element.parentElement.parentElement.removeEventListener('dblclick', (e) => {});
                break;

            case 'IFRAME':
                if ( element.src.includes('spotify') || 
                element.src.includes('soundcloud') || 
                element.src.includes('youtube') ) {
                    remove_element_border(element.parentElement);
                    element.parentElement.removeEventListener('mouseenter', (e) => {});
                    element.parentElement.removeEventListener('dblclick', (e) => {});
                }
                break;

            case 'A':
                remove_element_border(element.parentElement);
                element.parentElement.removeEventListener('mouseenter', (e) => {});
                element.parentElement.removeEventListener('dblclick', (e) => {});
                break;
        }
    }
    for (let child of element.children) {
        remove_content_listeners(child);
    }
}

function get_selected_text() {
    let selected = '';
    if (window.getSelection) {
        selected = window.getSelection().toString();
    } else if (document.selection && document.selection.type != "Control") {
        selected = document.selection.createRange().text;
    }
    return selected;
}



//  --- TITLE
function title_hook_callback(element) {
    let h1 = cur_article.querySelectorAll('H1');
    if (is_valid(h1)) {
        h1[0].innerText = element.value;
    }
    close_simple();
}
function title_hook(element) {
    on_title(element.innerText, 'title_hook_callback');
}

//  --- LINE 
function on_delete_line() {
    close_yesno();
    let section = get_session_selection();
    section.removeChild(cur_article);
    leave_article();
}
function on_keep_line() {
    close_yesno();
}

function line_hook(element) {
    yesno('Radera linje', 'Vill du ta bort linjen?', 'on_delete_line', 'on_keep_line');
}

//  --- TEXT
function on_delete_text() {
    close_yesno();
    let section = get_session_selection();
    section.removeChild(cur_article);
    leave_article();
}
function on_keep_text() {
    close_yesno();
}

function text_hook(element) {
    yesno('Radera text', 'Vill du ta bort textblocket?', 'on_delete_text', 'on_keep_text');
}

//  --- IMG
function on_replace_image(src_id) {

    let src = document.getElementById(src_id).value;
    let caption = document.getElementById('ai-caption').value;

    close_image();

    let imgs = cur_article.querySelectorAll('IMG');
    if (!is_valid(imgs)) return;

    let save = false;
    if (!src.includes('http')) {
        imgs[0].src = replace_filename(imgs[0].src, src);
        let sources = cur_article.querySelectorAll('SOURCE');
        for (let source of sources) {
            source.srcset = replace_filename(source.srcset, src);
            save=true;
        }
    }

    let caps = cur_article.querySelectorAll('FIGCAPTION');
    if (is_valid(caps)) {
        if (caption !== caps[0].innerText) {
            caps[0].innerText = caption;
            save=true;
        }
    }
    if( save ) {
        on_save_content();
        attach_editor(get_session_selection());
    }
}

function img_hook(element, src, caption) {
    on_image(src, caption, 'on_replace_image');
}

//  --- AUDIO
function replace_audio() {
    let src = document.getElementById('au-file').value;
    let audios = cur_article.querySelectorAll('AUDIO');
    let caption = document.getElementById('au-caption').value;
    
    close_audio();

    if( !is_valid(src) ) return;
    if( !is_valid(audios) ) return;

    if( src != '') {
        audios[0].src = replace_filename(audios[0].src, filename_only(src));
    }
    let caps = cur_article.querySelectorAll('FIGCAPTION');
    if (is_valid(caps)) {
        if (caption !== caps[0].innerText) {
            caps[0].innerText = caption;
            on_save_content();
            attach_editor(get_session_selection());
        }
    }
}

function audio_hook(element, url, comment) {
    on_audio(url, comment, 'replace_audio');
}

//  --- SPOTIFY
function on_replace_spotify() {
    let src = document.getElementById('sp-frame').value;
    close_spotify();

    let spots = cur_article.querySelectorAll('IFRAME');
    if( !is_valid(spots)) return;
    if( src.length > 0 && src !== spots[0].src ) {
        spots[0].src = src;
        on_save_content();
        attach_editor(get_session_selection());
    }
}

function spotify_hook(element) {
    on_spotify( element.outerHTML, 'on_replace_spotify' );
}

//  --- SOUNDCLOUD
function on_replace_soundcloud() {
    let src = document.getElementById('sc-frame').value;
    close_soundcloud();

    let sounds = cur_article.querySelectorAll('IFRAME');
    if( !is_valid(sounds)) return;
    if( src.length > 0 && src !== sounds[0].src ) {
        sounds[0].src = src;
        on_save_content();
        attach_editor(get_session_selection());
    }
}

function soundcloud_hook(element) {
    on_soundcloud( element.outerHTML, 'on_replace_soundcloud' );
}


//  --- YOUTUBE
function on_replace_youtube() {
    let src = document.getElementById('yt-frame').value;
    close_youtube();

    let tubes = cur_article.querySelectorAll('IFRAME');
    if( !is_valid(tubes)) return;
    if( src.length > 0 && src !== tubes[0].src ) {
        tubes[0].src = src;
        on_save_content();
        attach_editor(get_session_selection());
     }
}

function youtube_hook(element) {
    on_youtube( element.outerHTML, 'on_replace_youtube' );
}

//  --- WEBLINK
function on_replace_weblink() {

    let href = document.getElementById('wl-link').value;
    let text = document.getElementById('wl-text').value;
    close_weblink();

    let weblinks = cur_article.querySelectorAll('A')
    if( !is_valid(weblinks) ) return;
    weblinks[0].href = href;
    weblinks[0].innerText = text;

    on_save_content();
    attach_editor(get_session_selection());
}

function weblink_hook(element, href, text) {
    on_weblink(href, text, 'on_replace_weblink');
}

