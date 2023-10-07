
/*  List of used cookies in this application

canedit : boolean 
host: url (host base url like http://localhost:8080)
logo: url 
pageId: number
isAdmin: number 
selected: string (block element.id)
showheader: boolean
username: string

*/


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

    static set permPages(v) { this.#set('ice-pp', v === true || v==='1'?'true':'false'); }
    static get permPages() { return this.#get('ice-pp') === 'true'; }
    
    static set permBlocks(v) { this.#set('ice-pb', v === true || v==='1'?'true':'false'); }
    static get permBlocks() { return this.#get('ice-pb') === 'true'; }
    
    static set permUsers(v) { this.#set('ice-pu', v === true || v==='1'?'true':'false'); }
    static get permUsers() { return this.#get('ice-pu') === 'true'; }
    
    static set permThemes(v) { this.#set('ice-pt', v === true || v==='1'?'true':'false'); }
    static get permThemes() { return this.#get('ice-pt') === 'true'; }

    static set permSettings(v) { this.#set('ice-ps', v === true || v==='1'?'true':'false'); }
    static get permSettings() { return this.#get('ice-ps') === 'true'; }

    static set pageId(v) { this.#set('ice-pid', parseInt(v)); }
    static get pageId() { return parseInt(this.#get('ice-pid')); }
    
    static set isAuthor(v) { this.#set('ice-pa',v === true || v==='1'?'true':'false'); }
    static get isAuthor() { return this.#get('ice-pa') === 'true'; }
    
    static set selectedBlockId(v) { this.#set('ice-sbid', v); }
    static get selectedBlockId() { return this.#get('ice-sbid'); }
    
    static set selectedChildId(v) { this.#set('ice-scid', v); }
    static get selectedChildId() { return this.#get('ice-scid'); }
    
    static set host(v) { this.#set('ice-h', v); }
    static get host() { return this.#get('ice-h'); }
    
    static set theme(v) { this.#set('ice-t',v ); }
    static get theme() { return this.#get('ice-t'); }

    static set canEdit(v) { this.#set('ice-ce', v ? 'true' : 'false');}
    static get canEdit() { return this.#get('ice-ce') === 'true' &&  window.innerHeight <= 600 ;}

}
