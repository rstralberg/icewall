
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

function on_soudcloud_save() {

    let html = document.getElementById('sc-frame').innerHTML;
    get_session_selection().innerHTML += html + '<br>';
    close_soundcloud();
}

