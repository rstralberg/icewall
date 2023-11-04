function getColors(name) {
    return new Promise((resolve, reject) => {
        let theme = getStyle('name');
        let request = new SrvReq('getColors', [
            { key: 'theme', value: theme },
            { key: 'name', value: name }
        ]);
        request.send().then((reply) => {
            resolve({ bg: '', fg: '', bgHi: '', fgHi: '' });
        }, (err) => { reject(err); });
    });
}
