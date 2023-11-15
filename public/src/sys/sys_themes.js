
function sys_themes() {

    server('sys/sys_themes_form', {}).then(
        (resolve) => {
            add_form('edit-themes-form', resolve);
        }
    );
}

function sys_themes_form_selected() {

    let enable = query_value('sys-themes-form-themes') !== 'IceWall';
    enable_element('sys-themes-form-delete',enable);
    server('gsys_themes_form_theme', {
        theme: query_value('sys-themes-form-themes')
    }).then(
        (resolve) => {
            let theme = JSON.parse(resolve);
            theme_to_styles(theme);
        }
    )
}

function sys_themes_form_new() {
    simple('Nytt tema', 'Namn', '?', 'sys_themes_form_new_theme_name' ) ;
}

function sys_themes_form_new_theme_name(name_element) {

    let name = name_element.value;
    close_simple();
    set_style('theme', '"' + name + '"' );

    server('add_theme', {
        theme: styles_to_theme()
    });

}

function sys_themes_form_close() {
    remove_form('edit-themes-form');
}

