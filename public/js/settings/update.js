
function updateSettings(logo, name, owner) {

    let request = new Request('settingsUpdate', {
        logo: logo,
        name: name,
        owner: owner
    });
    request.send().then(
        (result) => { },
        (error) => { popup('FEL', error); }
    );
}
