function webForm(formName, args) {
    if (document.querySelector('#' + formName))
        return;
    let request = new SrvReq(formName, args);
    request.send().then((reply) => { openForm(formName, reply); }, (err) => { error(err); });
}
