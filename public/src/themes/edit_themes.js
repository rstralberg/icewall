
function edit_themes() {

    server('themes/edit_themes_form', {}).then(
        (resolve) => {
            add_form('edit-themes-form', resolve);
        }
    );
}

function edit_theme_selected() {

    let enable = document.getElementById('edit-themes-selector').value !== 'IceWall';
    enable_element('edit-themes-delete',enable);
    server('themes/get_theme', {
        theme: document.getElementById('edit-themes-selector').value
    }).then(
        (resolve) => {
            let theme = JSON.parse(resolve);
            theme_to_styles(theme);
        }
    )
}

function edit_themes_new() {
    simple('Nytt tema', 'Namn', '', 'new_theme_name' ) ;
}

function new_theme_name(element) {

    let name = element.value;
    close_simple();
    set_style('theme', name );

    server('themes/add_theme', {
        theme: styles_to_theme()
    }).then(
        () => {
            set_style(name);
        },
        (reject) => {
            error(reject);
        }
    );

}

function edit_themes_delete() {

}

function close_edit_themes() {
    remove_form('edit-themes-form');
}

