
function deleteUser(username) {
    let request = new Request('deleteUser', {
        username: username
    });
    request.send().then(
        (resolve) => {
            if (resolve.status === 'ok')
                popup('Användare', username + ' har raderats');
        },
        (reject) => { },
    );
}