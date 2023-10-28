var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _a, _Cookie_set, _Cookie_get, _Cookie_key, _Cookie_item;
class Cookie {
    static key(v) { __classPrivateFieldSet(this, _a, v, "f", _Cookie_key); }
    static set username(v) { __classPrivateFieldGet(this, _a, "m", _Cookie_set).call(this, __classPrivateFieldGet(this, _a, "m", _Cookie_item).call(this, 'ice-u'), v); }
    static get username() { return __classPrivateFieldGet(this, _a, "m", _Cookie_get).call(this, __classPrivateFieldGet(this, _a, "m", _Cookie_item).call(this, 'ice-u')); }
    static set pageId(v) { __classPrivateFieldGet(this, _a, "m", _Cookie_set).call(this, __classPrivateFieldGet(this, _a, "m", _Cookie_item).call(this, 'ice-pid'), v.toString()); }
    static get pageId() { return parseInt(__classPrivateFieldGet(this, _a, "m", _Cookie_get).call(this, __classPrivateFieldGet(this, _a, "m", _Cookie_item).call(this, 'ice-pid'))); }
}
_a = Cookie, _Cookie_set = function _Cookie_set(cname, cvalue, exphours = 1) {
    const d = new Date();
    d.setTime(d.getTime() + (exphours * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/;SameSite=Strict";
}, _Cookie_get = function _Cookie_get(cname) {
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
            return c === 'null' ? '' : c;
        }
    }
    return '';
}, _Cookie_item = function _Cookie_item(name) {
    return __classPrivateFieldGet(this, _a, "f", _Cookie_key) + '-' + name;
};
_Cookie_key = { value: '' };
