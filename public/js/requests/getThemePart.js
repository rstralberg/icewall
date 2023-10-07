

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

