
function updateUser(closeFormId, 
    username, picture, fullname, email,
    permPage , permContent, permUser , 
    permTheme , permSettings ) {

    let user = {
        username: username,
        picture: picture,
        fullname: fullname,
        email: email,
        permPage: permPage,
        permContent: permContent,
        permUser: permUser,
        permTheme: permTheme,
        permSettings: permSettings
    }

    let request = new Request('userUpdate', user );
    request.send().then( 
        (resolve) => {
            Session.user = user;
            closeForm(closeFormId);
            getNavbar(user.username);
        },
        (reject) => {
            closeForm(closeFormId);
        }
    );
}


function getUser(username) {
    
    return new Promise( (resolve, reject) => {
        let request = new Request('getUser', {
            username: username
        });
        request.send().then( 
            (result) => {
                if( result.status === 'ok') {
                     resolve(JSON.parse(result.content));
                } else {
                    popup(username, result.content);
                }
                
            },
            (error) => {
                alert(error);
            }
        );
    });
}

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