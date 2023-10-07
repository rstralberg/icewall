
function createDefaultTheme(themeName) {

    let request = new Request('createDefaultTheme', {
        themeName: themeName
    });
    request.send().then(
        (resolve) => {
            
        },
        (reject) => { }
    );
}
