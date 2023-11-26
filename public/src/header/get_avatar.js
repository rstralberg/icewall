//  ------------------------
//  args:
//     username
//  ------------------------

function get_avatar() {
    
    server('header/get_avatar', {
        username: get_session_user().username
    }).then(
        (resolve) => {
            document.getElementById('top-avatar').innerHTML = resolve;
        },
        (reject) => {
            popup('Användare',reject);
        }
    )
}
