
function verifyLogin(username, password) {

    return new Promise((resolve, reject) => {
        let request = new Request('loginVerify', {
            username: username,
            password: password
        });
        request.send().then(
            (result) => {
                if (result.status === 'error') {
                    reject(result.content);
                }
                else {
                    resolve(result.content);
                }
            },
            (error) => {
                reject(error);
            }
        );
    });
}
