function bottom() {
    let request = new SrvReq('bottom', []);
    request.send().then((reply) => {
        let element = document.querySelector('.bottom');
        element.innerHTML = reply;
    }, (err) => { error(err); });
}
