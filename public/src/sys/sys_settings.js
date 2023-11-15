
function sys_settings() {

    server('sys/sys_settings_form', {}).then(
        (resolve) => {
            add_form('edit-settings-form', resolve);
        },
        (reject) => {
            error(reject);
        }
    );
}

function sys_settings_form_theme_selected() {

}

function sys_settings_form_save() {

}


function sys_settings_form_close() {
    remove_form('edit-settings-form');
}

