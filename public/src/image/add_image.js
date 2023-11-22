
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

function on_image_save() {

    let section = get_session_selection();
    
    let form = document.getElementById('image-form');

    let width = Math.round(0.9 * section.clientWidth) + 'px';
    
    let img = form.querySelector('img');
    img.style.width = width; 
    if( !img.classList.contains('shadow') ) {
        img.classList.add('shadow');
    }
   
    let picture = form.querySelector('#ai-image');
   
    let caption = picture.querySelector('figcaption');
    caption.innerHTML = form.querySelector('#ai-caption').value;
    caption.style.width = width;
    caption.style.textAlign = 'center';

    
    let html = '<div style="text-align:center">' + picture.innerHTML + '</div><br>'
    section.innerHTML += html ;
    
    close_image();
}

