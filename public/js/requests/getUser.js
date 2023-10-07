
function getUser(username) {
    
    return new Promise( (resolve, reject) => {
        let request = new Request('getUser', {
            username: username
        });
        request.send().then( 
            (result) => {
                if( result.status === 'ok') {
                     resolve(JSON.parse(result.content));
                } else {
                    reject( result.content);
                }
                
            },
            (error) => {
                reject(error);
            }
        );
    });
}