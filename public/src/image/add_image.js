
function add_image(size, url, caption, save_callback) {

    server('image/add_image', {
        size: size,
        url: url,
        caption: caption,
        save: save_callback
    }).then(
        (resolve) => {
            add_form('image-form', resolve);
        }
     );
}

function close_image() {
    remove_form('image-form');
}

function on_image_file(element) {
    
    const imageInput = element;
    if (imageInput.files.length > 0) {
        const selectedImage = imageInput.files[0];

        let folder = get_session_page().id + '/' + get_session_selection().id.substr(1);
        upload_image(selectedImage, MAX_IMAGE_SIZE, folder).then(
            (resolve) => {
                if (resolve.ok) {
                    let form = document.getElementById('image-form');
                    form.querySelector('#ai-save').removeAttribute('disabled');

                    form.querySelector('#ai-image').innerHTML = picture_code(resolve.content, folder, 128, null);
                    form.querySelector('#ai-src').value = resolve.content;
                    form.querySelector('#ai-caption').select();
                }
            },
            (reject) => {
                error(reject);
            }
        );
    }
}

