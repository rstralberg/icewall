//  ------------------------
//  args:
//     username
//  ------------------------

function avatar() {
    
    server('header/avatar', {
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
