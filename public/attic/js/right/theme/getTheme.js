function getTheme(themeName) {
    return new Promise((resolve, reject) => {
        let request = new SrvReq('getTheme', [
            { key: 'themeName', value: themeName }
        ]);
        request.send().then((reply) => { resolve(JSON.parse(reply)); }, (error) => { reject(error); });
    });
}
function getThemePart(theme, part) {
    return new Promise((resolve, reject) => {
        let request = new SrvReq('getThemeParts', [
            { key: 'theme', value: theme },
            { key: 'part', value: part }
        ]);
        request.send().then((result) => { resolve(result); }, (error) => { reject(error); });
    });
}
