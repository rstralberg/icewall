function eGet(id) {
    return document.querySelector(id);
}
function eIsEnabled(id) {
    var _a;
    return ((_a = eGet(id)) === null || _a === void 0 ? void 0 : _a.getAttribute('diabled')) === null;
}
function eEnable(id) {
    var _a;
    (_a = eGet(id)) === null || _a === void 0 ? void 0 : _a.removeAttribute('disabled');
}
function eDisable(id) {
    var _a;
    (_a = eGet(id)) === null || _a === void 0 ? void 0 : _a.setAttribute('disabled', '');
}
function eGetValue(id) {
    let e = (eGet(id));
    return e === null || e === void 0 ? void 0 : e.value;
}
function eSetValue(id, value) {
    let e = (eGet(id));
    e.value = value;
}
function eGetSrc(id) {
    let e = (eGet(id));
    return e.src;
}
function eSetSrc(id, value) {
    let e = (eGet(id));
    e.src = value;
}
function eGetHtml(id) {
    let e = (eGet(id));
    return e.innerHTML;
}
function eSetHtml(id, value) {
    let e = (eGet(id));
    e.innerHTML = value;
}
function eGetText(id) {
    let e = (eGet(id));
    return e.innerText;
}
function eSetText(id, value) {
    let e = (eGet(id));
    e.innerText = value;
}
function eGetChildCount(id) {
    let e = eGet(id);
    return e ? e.childElementCount : 0;
}
function eGetChecked(id) {
    let e = (eGet(id));
    return e.checked;
}
function eSetChecked(id, value) {
    let e = (eGet(id));
    e.checked = value;
}
function isEmpty(str) {
    if (!isValid(str))
        return true;
    return str.length === 0;
}
