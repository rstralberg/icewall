
function init_admintools() {
    let right = query_class('right');
    // right.style.display = get_session_user().username === 'admin' ? 'block' : 'none';
    right.style.display = 'block' ;
}


function on_add_content() {
    alert('on_add_content');
}

function on_admin_pages() {
    alert('on_admin_pages');
}

function on_admin_users() {
    alert('on_admin_users');
}

function on_admin_sites() {
    alert('on_admin_sites');
}

function on_theme_colors() {
    alert('on_theme_colors');
}

function on_theme_borders() {
    alert('on_theme_borders');
}

function on_theme_fonts() {
    alert('on_theme_fonts');
}

function on_theme_sizes() {
    alert('on_theme_sizes');
}

function on_theme_shadows() {
    alert('on_theme_shadows');
}

function on_theme_save() {
    alert('on_theme_save');
}

function on_theme_save_as() {
    alert('on_theme_save_as');
}

function on_theme_delete() {
    alert('on_theme_delete');
}


