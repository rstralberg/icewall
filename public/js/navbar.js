
class Navbar {

    static refresh() {

        let req = new SrvReq('refreshNavbar', [
            { key: 'theme', value: getStyle('theme') },
            { key: 'username', value: Session.user.username }
        ]);
        req.send().then((reply) => {
            let element = eGet('.navbar');
            element.innerHTML = reply;
        }, (reject) => { error(reject); });
    }
}
