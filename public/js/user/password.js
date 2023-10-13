
const CHANGE_PASSWD_OLD = 'changepassword-old';
const CHANGE_PASSWD_NEW = 'changepassword-new';
const CHANGE_PASSWD_REPEAT = 'changepassword-repeat';
const CHANGE_PASSWD_APPLY = 'changepassword-apply';

function editPasswordSelected() {
    webForm('password');
}

function oldPasswordChanged() {
    verifyLogin( Session.user.username,  document.getElementById(CHANGE_PASSWD_OLD).value );
}

function newPasswordChanged() {
    verifyPasswords();
}

function verifyPasswordChanged() {
    verifyPasswords();
}

function saveNewPassword() {
    if (verifyPasswords()) {
        updatePassword(document.getElementById(CHANGE_PASSWD_NEW).value);
        closeChangePassword();
    }
}

function closeChangePassword() {
    closeForm('password');
}

function verifyPasswords() {

    let newPasswd = document.getElementById(CHANGE_PASSWD_NEW).value;
    let repeatPasswd = document.getElementById(CHANGE_PASSWD_REPEAT).value;
    let applyButton =  document.getElementById(CHANGE_PASSWD_APPLY);

    if (newPasswd !== repeatPasswd) {
        if( repeatPasswd.length > 0 ) alert('Lösenorden stämmer inte överens');
        applyButton.setAttribute('disabled','');
        return false;
    }
    if (newPasswd.length < 8 && newPasswd.length > 0) {
        alert('Lösenordet måste ha minst 8 tecken');
        applyButton.setAttribute('disabled','');
        return false;
    }
    applyButton.removeAttribute('disabled');

    return true;
}
 

function updatePassword(newPassword) {
    let request = new Request('update_Password', {
        username: Session.user.username,
        password: newPassword
    });
    request.send().then(
        (resolve) => { 
            if( resolve.status === 'ok') {
                popup('Lösenord', 'Lösenordet har ändrats');
            }
        },
        (reject) => { },
    );
}