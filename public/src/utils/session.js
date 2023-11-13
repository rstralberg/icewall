
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
        if ( user === null) {
            sessionStorage.setItem(session_site_item('user'),
                JSON.stringify({
                    username: '',
                    fullname: '',
                    email: '',
                    picture: ''
                }));
        }
        else {
            sessionStorage.setItem(session_site_item('user'),
                JSON.stringify(user));
        }
    }
}

function get_session_user() {
    if (validate_session()) {
        let u = sessionStorage.getItem(session_site_item('user'));
        if (is_valid(u) ) {
            return JSON.parse(u);
        }
    }
    return {
        username: 'admin',
        fullname: '',
        email: '',
        picture: ''
    };
}

function set_session_page(page) {
    if (validate_session()) {
        let pg = JSON.stringify(page);
        sessionStorage.setItem(session_site_item('page'), pg);
    }
}

function get_session_page() {
    if (validate_session()) {
        let page = sessionStorage.getItem(session_site_item('page'));
        if (page) return JSON.parse(page);
    }
    return {
        id: 0,
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

function set_session_selection(element) {
    if( validate_session()) {
        sessionStorage.setItem(session_site_item('selected'), element ? element.id  : null);
    }
}

function get_session_selection() {
    if( validate_session()) {
        let id = sessionStorage.getItem(session_site_item('selected'));
        if( is_valid(id) && id !== 'null') return query_id(id);
    }
    return null;
}

function init_session(pageid, sitekey) {

    return new Promise( (resolve,reject ) => {
        set_session_key(sitekey);
        server('getsite', { key: sitekey }).then(
            (site) => {
                set_session_site(JSON.parse(site));
                server('getpage', { pageid: pageid }).then(
                    (page) => { 
                        set_session_page(JSON.parse(page)); 
                        resolve();
                },
                (page_error) => { alert(page_error); reject(); });
            },
            (siteerror) => { alert(siteerror); reject();  }
        );
        set_session_selection(null);
    });


}
