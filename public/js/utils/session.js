
class Session {

    static set user(v) { 
        if( v === null ) sessionStorage.removeItem('user');
        else {
            let u = {
                username: v.username,
                fullname: v.fullname,
                email: v.email,
                picture: v.picture,
                password: '',
                permPage: v.permPage==='1',
                permContent: v.permContent==='1',
                permUser: v.permUser==='1',
                permTheme: v.permTheme==='1',
                permSettings: v.permSettings==='1'
            };
            sessionStorage.setItem('user', JSON.stringify(u)); 
        }
    }
    static get user() { 
        let u = sessionStorage.getItem('user');
        if( u ) return  JSON.parse(u); 
        else return {
            username: '',
            fullname: '',
            email: '',
            picture: '',
            password: '',
            permPage: false,
            permContent: false,
            permUser: false,
            permTheme: false,
            permSettings: false
        };
    }

    static set page(v) { 
        if( v === null ) sessionStorage.removeItem('page');
        else {
            let p = {
                id:v.id,
                title:v.title,
                parentId:v.parentId,
                isParent:v.isParent==='1',
                author:v.author,
                showTitle:v.showTitle==='1',
                pos:v.pos,
                public:v.public==='1',
                style:v.style
            };
            sessionStorage.setItem('page', JSON.stringify(p));
        }
    }

    static get page() {
        let p = sessionStorage.getItem('page');
        if( p ) return JSON.parse(p);
        else return {
            id:0,
            title:'',
            parentId:0,
            isParent:false,
            author:'',
            showTitle:false,
            pos:0,
            public:false,
            style:''
        }
    }

    static set selected(v) {
        sessionStorage.setItem('selected',v);
    }

    static get selected() {
        let id = sessionStorage.getItem('selected');
        return  id && id.length > 0 ? document.getElementById(id) : null;
    }

    static set selectedChild(v) {
        sessionStorage.setItem('selectedChild',v);
    }

    static get selectedChild() {
        let id = sessionStorage.getItem('selectedChild');
        return  id && id.length > 0 ? document.getElementById(id) : null;
    }
}
