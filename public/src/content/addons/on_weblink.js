
function on_weblink(url='', text='', callback='on_save_weblink') {
    
    if( text==='' ) text = get_selected_text();

    server('content/addons/weblink', {
        url: url,
        text: text,
        callback: callback
    }).then(
        (resolve) => {
            add_form('weblink-form', resolve);
        }
    );
}

function close_weblink() {
    remove_form('weblink-form');
}

function on_save_weblink() {

    let html = '<a target="_blank" href="' + document.getElementById('wl-link').value +
        '">' + document.getElementById('wl-text').value + '</a>';
    close_weblink();

    let section = get_session_selection();
    section.innerHTML += '<article type="weblink">' + html + '</article>';
    on_save_content();
    attach_editor(section);

}
