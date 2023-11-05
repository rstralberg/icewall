
function server(php, args) {

    return new Promise((reply, reject) => {
        args.key = get_session_key();
        args.php = php;
        
        fetch('/src/redirect.php', {
            method: 'POST',
            body: JSON.stringify(args),
            headers: { 'Content-Type': 'application/json' }
        })
            .then(res => res.json())
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
