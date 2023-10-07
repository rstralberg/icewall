
function updateUser(closeFormId, 
    username, picture, fullname, email, password = '',
    permPages = false, permBlocks = false, permUsers = false, 
    permThemes = false, permSettings = false) {

    let request = new Request('updateUser', {
        username: username,
        picture: picture,
        fullname: fullname,
        email: email,
        password: password,
        permPages: permPages,
        permBlocks: permBlocks,
        permUsers: permUsers,
        permThemes: permThemes,
        permSettings: permSettings
    });
    request.send().then( 
        (resolve) => {
            closeForm(closeFormId);
            getNavbar(Cookie.username);
        },
        (reject) => {
            closeForm(closeFormId);
        }
    );

}