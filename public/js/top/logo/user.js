function getUser(username) {
    return new Promise((resolve, reject) => {
        let request = new SrvReq('getUser', [
            { key: 'username', value: username }
        ]);
        request.send().then((result) => { resolve(JSON.parse(result)); }, (err) => { error(err); });
    });
}
function deleteUser(username) {
    return new Promise((deleted, failed) => {
        let request = new SrvReq('deleteUser', [
            { key: 'username', value: username }
        ]);
        request.send().then((resolve) => {
            popup(username + ' har raderats');
            deleted(username);
        }, (reject) => { error(reject); });
    });
}
function addUser(username, fullname, email, picture, password) {
    return new Promise((added, failed) => {
        // only filename  for images
        // before saving them into database
        let request = new SrvReq('addUser', [
            { key: 'username', value: username },
            { key: 'picture', value: filenameOnly(picture) },
            { key: 'fullname', value: fullname },
            { key: 'email', value: email },
            { key: 'password', value: password }
        ]);
        request.send().then((resolve) => { added(username); }, (reject) => { failed(reject); });
    });
}
function updateUser(username, fullname, email, picture, password) {
    // only filename  for images
    // before saving them into database
    let request = new SrvReq('updateUser', [
        { key: 'username', value: username },
        { key: 'picture', value: filenameOnly(picture) },
        { key: 'fullname', value: fullname },
        { key: 'email', value: email },
        { key: 'password', value: password }
    ]);
    request.send().then((reply) => {
        // Session.user = reply;
        getTop();
    }, (err) => { error(err); });
}
