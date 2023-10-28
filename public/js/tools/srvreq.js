// Reply and SrvReq MUST be compatible 
// with their PHP equivalents
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var _SrvReq_what, _SrvReq_args;
class SrvReq {
    constructor(what, args) {
        _SrvReq_what.set(this, void 0);
        _SrvReq_args.set(this, void 0);
        __classPrivateFieldGet(this, _SrvReq_args, "f").push({ key: 'key', value: Session.site.key });
        __classPrivateFieldGet(this, _SrvReq_args, "f").push({ key: 'database', value: Session.site.key });
        args.forEach(arg => {
            switch (typeof arg.value) {
                case 'boolean':
                    arg.value = arg.value ? '1' : 'o';
                    break;
                case 'number':
                    arg.value = arg.value.toString();
                    break;
                case 'object':
                    arg.value = JSON.stringify(arg.value);
                    break;
                default: break;
            }
            __classPrivateFieldGet(this, _SrvReq_args, "f").push(arg);
        });
        __classPrivateFieldSet(this, _SrvReq_what, what, "f");
    }
    send() {
        return new Promise((reply, err) => {
            // Send the content to the server using an AJAX request
            try {
                const json = {
                    what: __classPrivateFieldGet(this, _SrvReq_what, "f"),
                    args: __classPrivateFieldGet(this, _SrvReq_args, "f")
                };
                const options = {
                    method: 'POST',
                    body: JSON.stringify(json),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                };
                fetch('/request.php', options)
                    .then(res => res.json())
                    .then(res => {
                    if (res.ok) {
                        reply(res.content);
                    }
                    else {
                        err(res.content);
                    }
                })
                    .catch(e => {
                    err(e);
                });
            }
            catch (e) {
                error(e);
            }
        });
    }
}
_SrvReq_what = new WeakMap(), _SrvReq_args = new WeakMap();
