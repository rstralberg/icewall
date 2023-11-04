
function get_session_key() {
    let v = sessionStorage.getItem('key');
    return v === null ? '' : v;
}

function set_session_key(key) {
    sessionStorage.setItem('key', key);
}

function validate_session() {
    if (get_session_key() === '') {
        alert('No session key. Did you forget to call Session.key at start?');
        return false;
    }
    else {
        return true;
    }
}


function session_site_item(name) {
    return get_session_key() + '-' + name;
}

function set_session_user(user) {
    if (validate_session()) {
        sessionStorage.setItem(session_site_item('user'),
            JSON.stringify(user));
    }
}

function get_session_user() {
    if (validate_session()) {
        let u = sessionStorage.getItem(session_site_item('user'));
        if (u) {
            return JSON.parse(u);
        }
    }
    return {
        username: '',
        fullname: '',
        email: '',
        picture: ''
    };
}

function set_session_page(page) {
    if (validate_session()) {
        sessionStorage.setItem(session_site_item('page'), JSON.stringify(page));
    }
}

function get_session_page() {
    if (validate_session()) {
        let page = sessionStorage.getItem(session_site_item('page'));
        if (page) return JSON.parse(page);
    }
    return {
        title: '',
        parentId: 0,
        author: '',
        showTitle: 0,
        pos: 0,
        isParent: 0,
        isPublic: 0
    }
}

function set_session_site(site) {
    if (validate_session()) {
        sessionStorage.setItem(session_site_item('site'), JSON.stringify(site));
    }
}

function get_session_site() {
    if (validate_session()) {
        let sess = sessionStorage.getItem(session_site_item('site'));
        if (sess) return JSON.parse(sess);
    }
    return {
        key: '',
        title: '',
        owner: '',
        email: '',
        logo: '',
        theme: ''
    };
}

function init_session(pageid, sitekey) {

    set_session_key(sitekey);
    server('getsite', { key: sitekey }).then(
        (resolve) => { set_session_site(JSON.parse(resolve)); },
        (reject) => { alert(reject) });

    server('getpage', { pageid: pageid }).then(
        (resolve) => { set_session_page(JSON.parse(resolve)); },
        (reject) => { alert(reject) });

}
