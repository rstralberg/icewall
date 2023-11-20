
function on_weblink() {

    server('content/addons/weblink', {
        url: '',
        text: ''
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
    get_session_selection().innerHTML += html + '<br>';
    close_weblink();
}
