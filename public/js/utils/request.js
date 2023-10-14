
// Reply and Request MUST be compatible 
// with their PHP equivalents

class Reply {

    #status = '';
    #content = ':'

    get status() { return this.#status; }
    get content() { return this.#content; }

    constructor(reply) {
        this.#status = reply.status;
        this.#content = reply.content;
    }
}

class Request {

    #what = '';
    #args = null;

    constructor(what, args = null) {
        if( args === null) {
            this.#args = {
                database : Session.site.db
            }
        } else {
            // Object.defineProperty(args,'database', {
            //     value: Session.database,
            //     writable: true
            // });
            this.#args = args;
            this.#args['database'] = Session.site.db;
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
                        alert(err);
                        reject(err)
                    });

            } catch (error) {
                alert( error );
                reject(error);
            }
        });
    }
}


