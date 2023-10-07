
const CHANGE_PASSWD_OLD = 'changepassword-old';
const CHANGE_PASSWD_NEW = 'changepassword-new';
const CHANGE_PASSWD_REPEAT = 'changepassword-repeat';
const CHANGE_PASSWD_APPLY = 'changepassword-apply';

var changePasswordForm = '';

function onChangePassword() {
    if( changePasswordForm.length >  0) return;
    webForm('changePassword'). 
    then( (formName) => { changePasswordForm = formName} );
}

function onChangePasswordOld() {
    verifyLogin( Cookie.username,  document.getElementById(CHANGE_PASSWD_OLD).value );
}

function onChangePasswordNew() {
    verifyPasswords();
}

function onChangePasswordRepeat() {
    verifyPasswords();
}

function onChangePasswordApply() {
    if (verifyPasswords()) {

        updatePassword(document.getElementById(CHANGE_PASSWD_NEW).value);
        closeForm(changePasswordForm);
        changePasswordForm = '';
    }
}

function onChangePasswordAbort() {
    closeForm(changePasswordForm);
    changePasswordForm = '';
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
 