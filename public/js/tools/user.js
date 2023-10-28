class User {
    constructor(username = '', fullname = '', email = '', picture = '') {
        this.username = username;
        this.fullname = fullname;
        this.email = email;
        this.picture = picture;
        this.isAdmin = username === 'admin';
    }
    load(username) {
        return new Promise((resolve, reject) => {
            let request = new SrvReq('getUser', [
                { key: 'username', value: username }
            ]);
            request.send().then((result) => { resolve(JSON.parse(result)); }, (err) => { error(err); });
        });
    }
}
