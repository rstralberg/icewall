class Session {
    static set key(v) {
        sessionStorage.setItem('key', v);
    }
    static get key() {
        return sessionStorage.getItem('key');
    }
    static validate() {
        if (!isValid(Session.key)) {
            alert('No session key. Did you forget to call Session.key at start?');
        }
    }
    static item(v) {
        return Session.key + '-' + v;
    }
    static set user(v) {
        Session.validate();
        if (v === null)
            sessionStorage.removeItem(Session.item('user'));
        else {
            let u = new User(v.username, v.fullname, v.email, v.picture);
            sessionStorage.setItem(Session.item('user'), JSON.stringify(u));
        }
    }
    static get user() {
        Session.validate();
        let u = sessionStorage.getItem(Session.item('user'));
        return u ? JSON.parse(u) : new User();
    }
    static set page(v) {
        Session.validate();
        if (v === null)
            sessionStorage.removeItem(Session.item('page'));
        else {
            let p = new Page(v.id, v.title, v.parentId, v.isParent, v.author, v.showTitle, v.pos);
            sessionStorage.setItem(Session.item('page'), JSON.stringify(p));
        }
    }
    static get page() {
        Session.validate();
        let p = sessionStorage.getItem(Session.item('page'));
        if (p)
            return JSON.parse(p);
        else
            return new Page();
    }
    static set site(v) {
        Session.validate();
        if (v === null)
            sessionStorage.removeItem(Session.item('site'));
        else {
            let p = new Site(v.key, v.name);
            sessionStorage.setItem(Session.item('site'), JSON.stringify(p));
        }
    }
    static get site() {
        Session.validate();
        let p = sessionStorage.getItem(Session.item('site'));
        if (p === null)
            return new Site('', '');
        else
            return JSON.parse(p);
    }
    static set selected(v) {
        Session.validate();
        sessionStorage.setItem(Session.item('selected'), v);
    }
    static get selected() {
        Session.validate();
        let id = sessionStorage.getItem(Session.item('selected'));
        if (id === null)
            return null;
        else
            return document.getElementById(id);
    }
    static set selectedChild(v) {
        Session.validate();
        sessionStorage.setItem(Session.item('selectedChild'), v);
    }
    static get selectedChild() {
        Session.validate();
        let id = sessionStorage.getItem(Session.item('selectedChild'));
        if (id === null)
            return null;
        else
            return document.getElementById(id);
    }
    static set edit(v) {
        sessionStorage.setItem('edit', v ? 'true' : 'false');
    }
    static get edit() {
        let v = sessionStorage.getItem('edit');
        if (v === null)
            return false;
        return v === 'true';
    }
}
