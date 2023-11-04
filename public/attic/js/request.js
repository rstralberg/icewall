// Reply and SrvReq MUST be compatible 
// with their PHP equivalents

function request(func, args) {

    return new Promise((reply, reject) => {
        args.key = Session.site.key;
        args.func = func;
        // console.log( 'request('+func+',' + JSON.stringify(args)+')');
        fetch('/request.php', {
            method: 'POST',
            body: JSON.stringify(args),
            headers: { 'Content-Type': 'application/json' }
        })
            .then(res => res.json() )
            .then(res => {
                if (res.ok) {
                    reply(res.content);
                }
                else {
                    reject(res.content);
                }
            })
            .catch(e => {
                reject(e);
            });
    }
    );
}


