
function add_image(size, url, caption) {

    server('image/add_image', {
        size: size,
        url: url,
        caption: caption
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
                    enable_element('ai-save', true);
                    document.getElementById('ai-image').innerHTML = picture_code(resolve.content, folder, 128, document.getElementById('ai-caption').value);
                    document.getElementById('ai-src').value = resolve.content;
                    document.getElementById('ai-caption').select();
                }
            },
            (reject) => {
                error(reject);
            }
        );
    }
}

function on_image_save() {

    let section = get_session_selection();
    let folder = get_session_page().id + '/' + get_session_selection().id.substr(1);
    let html = document.getElementById('ai-image').innerHTML;
    section.innerHTML += html + '<br>';
    close_image();
}

