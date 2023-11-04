
function getTheme( themeName ) {

    return new Promise( (resolve, reject ) => {
    let request = new Request('getTheme', {
        themeName: themeName
    });
    request.send().then(
        (reply) => { 
            if( reply.ok) {
                resolve(JSON.parse(reply.content));
            }
            else {
                reject(false);
            }
        },
        (error) => { reject(false) });

    });
}



function getThemePart(theme, part) {
    return new Promise( (resolve, reject) => {

    let request = new Request('getThemeParts', {
        theme: theme,
        part: part
    });
    request.send().then(
        (result) => { resolve(result); },
        (error) => { reject(error); }
    );
    });
}

