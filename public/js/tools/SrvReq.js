// Reply and SrvReq MUST be compatible 
// with their PHP equivalents

class SrvReq {

    #what = '';
    #args = {};

    constructor(what, args) {
        this.#what = what;
        this.#args["key"] = Session.site.key ;
        args.forEach(arg => {
            this.#args[arg.key] = arg.value ;
        });
    }

    send() {
        return new Promise((reply, err) => {
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
                fetch('/srvreq.php', options)
                    .then(res => res.json())
                    .then(res => {
                        if (res.ok) {
                            reply(res.content);
                        }
                        else {
                            console.error( res.content );
                            debugger;
            
                            err(res.content);
                        }
                    })
                    .catch(e => {
                        console.error( e );
                        debugger;
                    err(e);
                    });
            }
            catch (e) {
                error(e);
            }
        });
    }
}

