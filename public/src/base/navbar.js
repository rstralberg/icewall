
function update_navbar() {
    server('update_navbar', {
        pageid: get_session_page().id,
        username: get_session_user().username
    }).then(
        (resolve) => {
            query('nav').innerHTML = resolve;
        },
        (reject) => {
            alert(reject);
        }
    )
}


function navbar_logout() {
    alert("navbar_logout");
}

function navbar_login() {
    alert("navbar_login");
}

function navbar_toggle_icon(src) {
    alert("navbar_toggle_icon");
}

function navbar_page_selected(pageid) {
    alert("navbar_page_selected");
}

function navbar_parent_selected(src) {
    alert("navbar_parent_selected");
}

function navbar_theme_selected(themename) {
    alert("navbar_theme_selected");
}

