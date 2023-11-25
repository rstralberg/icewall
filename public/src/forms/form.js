
let offsetX = 0;
let offsetY = 0 ;
let isDragging = false;

function add_form(form_id, html) {

    let body = document.querySelector('body');

    let container = document.createElement('div');

    container.classList.add('form');
    container.id = form_id;

    container.style.position = 'fixed';
    container.style.left = '2vw';
    container.style.top = '6vh';
    container.style.zIndex = 2000;
    
    container.innerHTML = '<h1 class="form-banner"></h1>'  + html;

    offsetX = 0;
    offsetY = 0;
    isDragging = false;

    container.addEventListener('mousedown', (e) => {
        isDragging = true;
        offsetX = e.clientX - e.target.getBoundingClientRect().left;
        offsetY = e.clientY - e.target.getBoundingClientRect().top;
    });
    
    container.addEventListener('mousemove', (e) => {
        if ( isDragging ) {
            let x = e.clientX - offsetX;
            let y = e.clientY - offsetY;

            e.target.style.left = x + 'px';
            e.target.style.top = y + 'px';
        }
    });
    
    container.addEventListener('mouseup', (e) => {
        isDragging = false;
    });

    body.appendChild(container);
}


function remove_form(form_id) {
    let container = document.getElementById(form_id);
    if (is_valid(container)) {
        container.removeEventListener('mousedown', (e) => { });
        container.removeEventListener('mousemove', (e) => { });
        container.removeEventListener('mousedown', (e) => { });
        let body = document.querySelector('body');
        body.removeChild(container);
    }
}