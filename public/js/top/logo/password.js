//  =========================================
//  Support for php/user/html/password.html
//  =========================================
function oldPassword(oldId, newId, verifyId) {
    let oldPwd = eGetValue(oldId);
    let request = new SrvReq('verifyUser', [
        { key: 'username', value: Session.user.username },
        { key: 'password', value: oldPwd }
    ]);
    request.send().then((reply) => {
        let eNew = eGet(newId);
        let eVerify = eGet(verifyId);
        if (eNew)
            eNew.removeAttribute('disabled');
        if (eVerify)
            eVerify.removeAttribute('disabled');
    }, (err) => { error(err); });
}
function verifyPasswordChanged(oldId, newId, verifyId, applyId) {
    let oldPwd = eGetValue(oldId);
    let request = new SrvReq('verifyUser', [
        { key: 'username', value: Session.user.username },
        { key: 'password', value: oldPwd }
    ]);
    request.send().then((reply) => {
        let applyButton = eGet(applyId);
        if (!isValid(applyButton.getAttribute('disabled')))
            applyButton.setAttribute('disabled', '');
        let newPwd = eGetValue(newId);
        let verifyPwd = eGetValue(verifyId);
        if (newPwd === verifyPwd && newPwd.length >= 8) {
            applyButton.removeAttribute('disabled');
        }
    }, (reject) => { error(reject); });
}
function savePassword(newPwdId) {
    let newPwd = eGetValue(newPwdId);
    if (newPwd.length < 8) {
        return;
    }
    let request = new SrvReq('changePassword', [
        { key: 'username', value: Session.user.username },
        { key: 'password', value: newPwd }
    ]);
    request.send().then((reply) => {
        closePassword();
        popup('Lösenordet har ändrats');
    }, (reject) => { error(reject); });
}
function closePassword() {
    closeForm('password');
}
