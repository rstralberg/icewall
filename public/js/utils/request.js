
// Reply and Request MUST be compatible 
// with their PHP equivalents

class Reply {

    #ok = false;
    #content = ':'

    get ok() { return this.#ok; }
    get content() { return this.#content; }

    constructor(reply) {
        this.#ok = reply.ok;
        this.#content = reply.content;
    }
}

class Request {

    #what = '';
    #args = {};

    constructor(what, args = null) {
        if( args === null) {
            this.#args = {
                key: Session.site.key,
                database : Session.site.key,
            }
        } else {
            this.#args = args;
            this.#args['key'] = Session.site.key;
            this.#args['database'] = Session.site.key;
        }
        this.#what = what;
    }

    send() {
        return new Promise((resolve, reject) => {

            // Send the content to the server using an AJAX request
            try {
                const json = {
                    what: this.#what,
                    args: this.#args
                };

                const options = {
                    method: 'POST',
                    body: JSON.stringify(json),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                };

                fetch('/request.php', options)
                    .then(res => res.json())
                    .then(res => {
                        resolve(new Reply(res));
                    })
                    .catch(err => {
                        reject(err)
                    });

            } catch (error) {
                reject(error);
            }
        });
    }
}


