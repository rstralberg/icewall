
function add_form(form_id, html) {
    let body = document.querySelector('body');
    let container = document.createElement('div');
    container.classList.add('form');
    container.id = form_id;
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