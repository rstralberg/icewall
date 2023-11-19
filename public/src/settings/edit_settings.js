
function edit_settings() {

    server('settings/edit_settings_form', {}).then(
        (resolve) => {
            add_form('edit-settings-form', resolve);
        },
        (reject) => {
            error(reject);
        }
    );
}

function settings_theme_selected() {

}

function settings_logo_selected() {

    const imageInput = document.getElementById('settings-file');
    if (imageInput.files.length > 0) {
        const selectedImage = imageInput.files[0];

        upload_image(selectedImage, MAX_IMAGE_SIZE, 'images').then(
            (resolve) => {
                if (resolve.ok) {
                    document.getElementById('settings-image').innerHTML = picture_code(resolve.content, 'images', 128, document.getElementById('settings-imgsrc').value);
                    document.getElementById('settings-imgsrc').value = resolve.content;
                }
            },
            (reject) => {
                error(reject);
            }
        );
    }
}

function settings_save() {

    server('settings/update_settings', {
        title: document.getElementById('settings-name').value,
        owner: document.getElementById('settings-owner').value,
        email: document.getElementById('settings-email').value,
        logo:  document.getElementById('settings-imgsrc').value,
        theme: document.getElementById('settings-theme').value
    }).then(
        (resolve) => {
            let settings = JSON.parse(resolve);
            set_session_site(settings);
            get_logo();
        },
        (reject) => { error(reject); }
    );
}

function close_settings() {
    remove_form('edit-settings-form');
}

