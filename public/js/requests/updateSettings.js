
function updateSettings(logo, name, owner, host) {

    let request = new Request('updateSettings', {
        logo: logo,
        name: name,
        owner: owner,
        host: host
    });
    request.send().then(
        (result) => { },
        (error) => { popup('FEL', error); }
    );
}
