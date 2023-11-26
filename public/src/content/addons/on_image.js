
function on_image(url='', caption='', callback = 'on_image_save') {
    add_image(128, url, caption,  callback);
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
    close_image();

    let html = '<article type="image" style="text-align:center">' + picture.innerHTML + '</article>';
    section.innerHTML += html ;
    
    on_save_content();
    attach_editor(section);

}

