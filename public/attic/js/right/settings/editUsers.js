//  ===============================================
//  Support for php/user/html/editUsers.html
//  ===============================================
function editUsers() {
    webForm('editUsers', []);
}
// function closeEditUser() {
//     closeForm('editUsers');
// }
function euUserSelected() {
    let username = eGetValue('#eu-users');
    if (username === 'none') {
        euClear();
        return;
    }
    if (username === 'add') {
        eEnable('#eu-username');
        eSetValue('#eu-username', '');
        eEnable('#eu-picture');
        eSetSrc('#eu-picture', 'icons/avatar.png');
        eEnable('#eu-fullname');
        eSetValue('#eu-fullname', '');
        eEnable('#eu-email');
        eSetValue('#eu-email', '');
        eEnable('#eu-password');
        eSetValue('#eu-password', '');
        eDisable('#eu-delete');
        eDisable('#eu-save');
        euUpdateButton('#eu-save-new');
        return;
    }
    getUser(username).then((user) => {
        eSetSrc('#eu-image', addImagePath(user.picture));
        eSetValue('#eu-fullname', user.fullname);
        eSetValue('#eu-email', user.email);
        eSetValue('#eu-username', user.username);
        eSetValue('#eu-password', '');
        eDisable('#eu-username');
        eEnable('#eu-picture');
        eEnable('#eu-fullname');
        eEnable('#eu-email');
        eEnable('#eu-password');
        eEnable('#eu-save');
        eDisable('#eu-save-new');
        if (username === 'admin')
            eDisable('#eu-delete');
        else
            eEnable('#eu-delete');
    }, () => { });
}
function euUsername() {
    if (eIsEnabled('#eu-username')) {
        euUpdateButton('#eu-save-new');
        eDisable('#eu-save');
    }
    else {
        euUpdateButton('#eu-save');
        eDisable('#eu-save-new');
    }
}
function euFullname() {
    if (eIsEnabled('#eu-username')) {
        euUpdateButton('#eu-save-new');
        eDisable('#eu-save');
    }
    else {
        euUpdateButton('#eu-save');
        eDisable('#eu-save-new');
    }
}
function euEmail() {
    if (eIsEnabled('#eu-username')) {
        euUpdateButton('#eu-save-new');
        eDisable('#eu-save');
    }
    else {
        euUpdateButton('#eu-save');
        eDisable('#eu-save-new');
    }
}
function euPassword() {
}
function euUpdateButton(buttonId) {
    let values = [
        eGetValue('#eu-username'),
        eGetValue('#eu-fullname'),
        eGetValue('#eu-email'),
    ];
    for (let i = 0; i < values.length; i++) {
        if (isEmpty(values[i])) {
            eDisable(buttonId);
            return;
        }
    }
    eEnable(buttonId);
}
function euUserImage(eFile) {
    const imageInput = eGet('#eu-picture');
    if (imageInput === null)
        return;
    if (imageInput.files === null)
        return;
    if (imageInput.files.length === 0)
        return;
    const selectedImage = imageInput.files[0];
    const maxWidth = IMAGE_MAX_WIDTH;
    uploadImage(selectedImage, imageInput.value, maxWidth).then((resolve) => { eSetSrc('#eu-image', addImagePath(resolve)); }, (reject) => { error(reject); });
}
function euSaveNewUser() {
    addUser(eGetValue('#eu-username'), eGetValue('#eu-fullname'), eGetValue('#eu-email'), eGetSrc('#eu-image'), eGetValue('#eu-password')).then((added) => {
        popup(added + ' har sparats');
        let select = eGet('#eu-users');
        let option = document.createElement('option');
        option.value = added;
        option.innerText = added;
        select.appendChild(option);
        select.value = select.options[0].value;
    }, (failed) => {
        error(failed);
    });
}
function euSaveUser() {
    updateUser(eGetValue('#eu-username'), eGetValue('#eu-fullname'), eGetValue('#eu-email'), eGetSrc('#eu-image'), eGetValue('#eu-password'));
}
function euDeleteUser() {
    deleteUser(eGetValue('#eu-users')).then((deleted) => {
        let select = eGet('#eu-users');
        for (let i = 0; i < select.childElementCount; i++) {
            if (select.options[i].value === deleted) {
                select.removeChild(select.options[i]);
                euClear();
                break;
            }
        }
    }, (failed) => { });
}
function euClear() {
    eSetValue('#eu-username', '');
    eSetValue('#eu-fullname', '');
    eSetValue('#eu-email', '');
    eSetValue('#eu-password', '');
    eSetSrc('#eu-image', 'icons/avatar.png');
    eSetValue('#eu-users', '');
    eDisable('#eu-save');
    eDisable('#eu-save-new');
    eDisable('#eu-delete');
    eDisable('#eu-username');
    eDisable('#eu-password');
}
