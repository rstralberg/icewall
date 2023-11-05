
function add_form(form_id, html) {
    let body = query('body');
    let container = document.createElement('div');
    container.classList.add( 'form');
    container.id = form_id;
    container.innerHTML = html;
    body.appendChild(container);
}


function remove_form(form_id) {
    let container = query_id(form_id);
    let body = query('body');
    body.removeChild(container);
}