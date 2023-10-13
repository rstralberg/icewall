
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

