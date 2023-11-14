
function sys_themes() {

    server('sys/sys_themes', {}).then(
        (resolve) => {
            add_form('edit-themes-form', resolve);
        }
    );
}

function et_selected() {

    let enable = query_value('et-themes') !== 'IceWall';
    enable_element('et-delete',enable);
    server('get_theme', {
        theme: query_value('et-themes')
    }).then(
        (resolve) => {
            let theme = JSON.parse(resolve);
            theme_to_styles(theme);
        }
    )
}

function et_new() {
    simple('Nytt tema', 'Namn', '?', 'et_new_theme_name' ) ;
}

function et_new_theme_name(name_element) {

    let name = name_element.value;
    close_simple();
    set_style('theme', '"' + name + '"' );

    server('add_theme', {
        theme: styles_to_theme()
    });

}

function et_close() {
    remove_form('edit-themes-form');
}

