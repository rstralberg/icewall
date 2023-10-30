
class User {

    username = '';
    fullname = '';
    email = '';
    picture = '';
    isAdmin = false;

    constructor() {
        this.clear();
    }

    clear() {
        this.username = '';
        this.fullname = '';
        this.email = '';
        this.picture = '';
        this.isAdmin = false;
    }

    add(password) {

        // only filename  for images
        // before saving them into database
        let request = new Request('addUser', {
            username: this.username,
            picture: filenameOnly(this.picture),
            fullname: this.fullname,
            email: this.email,
            password: password
        });
        request.send().then(
            (resolve) => {
                if (resolve.ok) {
                    popup(this.fullname + ' har sparats');
                }
                else {
                    error(resolve.content);
                }
            },
            (reject) => {
                error(reject);
            }
        );
    }

    load(username) {
        return new Promise((resolve, reject) => {
            let request = new SrvReq('getUser', [
                { key: 'username', value: username }
            ]);
            request.send().then((result) => {
                let user = JSON.parse(result);
                this.username = user.username;
                this.fullname = user.fullname;
                this.email = user.email;
                this.picture = user.picture;
                this.isAdmin = user.username === 'admin';
                resolve();
            },
                (err) => { error(err); });
        });
    }

    delete() {
        let request = new Request('deleteUser', {
            username: this.username
        });
        request.send().then(
            (resolve) => {
                if (resolve.ok) {
                    popup('Användare', this.username + ' har raderats');
                    this.clear();
                }
                else {
                    error(resolve.content);
                }
            },
            (reject) => { error(reject); }
        );
    }

    update() {

        // only filename  for images
        // before saving them into database

        let request = new Request('updateUser', {
            username: this.username,
            picture: filenameOnly(this.picture),
            fullname: this.fullname,
            email: this.email
        });
        request.send().then(
            (resolve) => {
                getNavbar();
            },
            (reject) => {
            }
        );
    }
}


