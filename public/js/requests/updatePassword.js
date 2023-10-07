
function updatePassword(newPassword) {
    let request = new Request('updatePassword', {
        username: Cookie.username,
        password: newPassword
    });
    request.send().then(
        (resolve) => { 
            if( resolve.status === 'ok') {
                popup('Lösenord', 'Lösenordet har ändrats');
            }
        },
        (reject) => { },
    );
}