
function update_navbar() {
    
    server('update_navbar', {
        pageid: get_session_page().id,
        username: get_session_user().username
    }).then(
        (resolve) => {
            query('nav').innerHTML = resolve;
        },
        (reject) => {
            popup('Meny',reject);
        }
    )
}

function on_toggle_burger() {
    let menu = query_id('menu');
    toggle_display(menu);
    let burger = query_id('#nav-burger');
    let close = query_id('#nav-close');
    if (burger && close) {
        burger.style.display = burger.style.display === 'none' ? 'content' : 'none';
        close.style.display = burger.style.display === 'none' ? 'content' : 'none';
    }
}

