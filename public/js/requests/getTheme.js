
function getTheme( themeName ) {

    return new Promise( (resolve, reject ) => {
    let request = new Request('getTheme', {
        themeName: themeName
    });
    request.send().then(
        (reply) => { 
            if( reply.status === 'ok') {
                resolve(JSON.parse(reply.content));
            }
            else {
                reject(false);
            }
        },
        (error) => { reject(false) });

    });
}

