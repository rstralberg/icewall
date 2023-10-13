
class Cookie {

    static #set(cname, cvalue, exphours = 1) {
        const d = new Date();
        d.setTime(d.getTime() + (exphours * 60 * 60 * 1000));
        let expires = "expires=" + d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/;SameSite=Strict";
    }
    
    static #get(cname) {
        let name = cname + "=";
        let decodedCookie = decodeURIComponent(document.cookie);
        let ca = decodedCookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                c = c.substring(name.length, c.length);
                return c === 'null' ? null : c;
            }
        }
        return null;
    }

    static set username(v) { this.#set('ice-u',v); }
    static get username() { return this.#get('ice-u'); }

    static set pageId(v) { this.#set('ice-pid', parseInt(v)); }
    static get pageId() { return parseInt(this.#get('ice-pid')); }
}
