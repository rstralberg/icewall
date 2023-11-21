
function add_form(form_id, html) {
    let body = document.querySelector('body');
    let container = document.createElement('div');
    container.classList.add('form');
    container.id = form_id;
    container.style.position = 'fixed';
    container.style.left = '2vw';
    container.style.top = '6vh';
    container.innerHTML = html;
    body.appendChild(container);
}


function remove_form(form_id) {
    let container = document.getElementById(form_id);
    if (is_valid(container)) {
        let body = document.querySelector('body');
        body.removeChild(container);
    }
}