
function getuser(username) {

    return new Promise( (user, fail) => {
        request('getuser', { username: username}).then(
            (reply) => {
                user( reply );
            },
            (error)=> {
                fail(error);
            });
        }
    );
}