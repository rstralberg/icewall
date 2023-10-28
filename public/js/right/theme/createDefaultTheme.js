function createDefaultTheme(themeName) {
    let request = new SrvReq('createDefaultTheme', [
        { key: 'themeName', value: themeName }
    ]);
    request.send().then((resolve) => {
    }, (reject) => { });
}
