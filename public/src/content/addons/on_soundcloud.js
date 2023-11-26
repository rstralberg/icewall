
function on_soundcloud() {
    
  
    server('content/addons/soundcloud', {
        url: ''
    }).then(
        (resolve) => {
            add_form('soundcloud-form', resolve);
        }
    );
}

function close_soundcloud() {
    remove_form('soundcloud-form');
}

function on_soundcloud_pasted(element) {

    document.getElementById('sc-frame').innerHTML = element.value;
    enable_element('sc-save-button',true);
    document.getElementById('sc-save-button').focus();
}

function on_soundcloud_save() {
    let html = document.getElementById('sc-frame').innerHTML;
    close_soundcloud();

    let section = get_session_selection();
    section.innerHTML += '<article type="soundcloud">' + html + '</article>';
    on_save_content();
    attach_editor(section);
}

