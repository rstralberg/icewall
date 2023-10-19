
function getUser(username) {

    return new Promise((resolve, reject) => {
        let request = new Request('getUser', {
            username: username
        });
        request.send().then(
            (result) => {
                if (result.ok) {
                    resolve(JSON.parse(result.content));
                } else {
                    error(result.content);
                }

            },
            (err) => {
                error(err);
            }
        );
    });
}

function deleteUser(username) {
    return new Promise((deleted, failed) => {
        let request = new Request('deleteUser', {
            username: username
        });
        request.send().then(
            (resolve) => {
                if (resolve.ok) {
                    popup('Användare', username + ' har raderats');
                    deleted(username);
                }
                else {
                    error(resolve.content);
                }
            },
            (reject) => { error(reject); }
        );
    });
}

function addUser(username, fullname, email, picture, password) {
    return new Promise((added, failed) => {
        // only filename  for images
        // before saving them into database
        let user = {
            username: username,
            picture: filenameOnly(picture),
            fullname: fullname,
            email: email,
            password: password
        };

        let request = new Request('addUser', user);
        request.send().then(
            (resolve) => {
                if( resolve.ok ) {
                    added(username);
                }
                else {
                    failed(resolve.content);
                }
            },
            (reject) => {
                failed(reject);
            }
        );
    });
}

function updateUser(username, fullname, email, picture, password) {

    // only filename  for images
    // before saving them into database
    let user = {
        username: username,
        picture: filenameOnly(picture),
        fullname: fullname,
        email: email,
        password: password
    }

    let request = new Request('updateUser', user);
    request.send().then(
        (resolve) => {
            Session.user = user;
            getNavbar();
        },
        (reject) => {
        }
    );
}

