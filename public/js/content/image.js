
function onImage() {
    webForm('imageSelect',{ url: '',size: 256 }); 
}

function imageSelected() {

    const imageInput = document.getElementById('image-file');
    if (imageInput.files.length > 0) {
        const selectedImage = imageInput.files[0];
        const maxWidth = IMAGE_MAX_WIDTH;

        uploadImage(selectedImage, maxWidth, 'p' + Session.page.id).then(
            (resolve) => {
                if (resolve.status === 'ok') {
                    document.getElementById('image-img').src = resolve.content;
                }
            },
            (reject) => {
                alert(reject.content);
            }
        );
    }
}

function saveImage() {

    let content = Session.selected;
    if( content === null) return;

    let figure = document.createElement('figure');
    figure.classList.add('form-figure');
    figure.style.width = (content.clientWidth / 4 + SHADOW_DISTANCE) + 'px';
    figure.style.height = 'auto';
    figure.style.resize = 'both';

    let img = document.createElement('img');
    img.classList.add('form-image');
    img.classList.add('shadow');
    img.style.width = (content.clientWidth / 4) + 'px';
    img.style.height = 'auto';
    img.src = document.getElementById('image-img').src;
    img.addEventListener('load', () => {
        content.appendChild(figure);

        let div = document.createElement('div');
        div.style.height = '1em';
        div.style.width = content.style.width;
        div.innerText = ' ';
        content.appendChild(div);
    });
    figure.appendChild(img);

    let caption = document.createElement('figcaption');
    caption.classList.add('form-caption');
    caption.innerText = document.getElementById('image-caption').value;
    figure.appendChild(caption);

    

    // keeping shadow space
    new ResizeObserver(() => {
        figure.style.width = figure.style.width + IMAGE_MAX_WIDTH + 'px';
        img.style.width = figure.style.width;
        img.style.height = 'auto';
    }).observe(figure);

    closeImage();
}

function closeImage() {
    closeForm('imageSelect');
}

