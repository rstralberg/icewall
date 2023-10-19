//  =========================================
//  Support for php/user/html/password.html
//  =========================================

function oldPassword(oldId, newId, verifyId) {
    let oldPwd = document.getElementById(oldId).value;
    let request = new Request('verifyUser', {
        username: Session.user.username,
        password: oldPwd
    });
    request.send().then(
        (reply) => {
            if (reply.ok) {
                document.getElementById(newId).removeAttribute('disabled');
                document.getElementById(verifyId).removeAttribute('disabled');
            }
        });

}

function verifyPasswordChanged(oldId, newId, verifyId, applyId) {
    let oldPwd = document.getElementById(oldId).value;
    let request = new Request('verifyUser', {
        username: Session.user.username,
        password: oldPwd
    });
    request.send().then(
        (reply) => {
            let applyButton = document.getElementById(applyId);
            if (!isValid(applyButton.getAttribute('disabled')))
                applyButton.addAttribute('disabled', '');

            if (reply.ok) {
                let newPwd = document.getElementById(newId).value;
                let verifyPwd = document.getElementById(verifyId).value;
                if (newPwd === verifyPwd && newPwd.length >= 8) { 
                    applyButton.removeAttribute('disabled');
                }
            }
        });
}

function savePassword(newPwdId) {
    
    let newPwd = document.getElementById(newPwdId).value;
    if( newPwd.length < 8 ) {
        return;
    }
    let request = new Request('changePassword', { 
        username: Session.user.username,
        password: newPwd });
    request.send().then(
        (reply) => {
            if( reply.ok) {
                closePassword();
                popup(Session.user.fullname, 'Lösenordet har ändrats');
            }
        }
    );
}

function closePassword() {
    closeForm('password');
}
