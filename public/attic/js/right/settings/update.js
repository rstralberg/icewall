function updateSettings(logo, name, owner) {
    let request = new SrvReq('settingsUpdate', [
        { key: 'logo', value: logo },
        { key: 'name', value: name },
        { key: 'owner', value: owner }
    ]);
    request.send().then((result) => { }, (error) => { popup(error); });
}
