
function sys_settings() {

    server('sys/sys_settings', {}).then(
        (resolve) => {
            add_form('edit-settings-form', resolve);
        },
        (reject) => {
            error(reject);
        }
    );
}

function es_theme_selected() {

}

function es_save() {

}


function es_close() {
    remove_form('edit-settings-form');
}

