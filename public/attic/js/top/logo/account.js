//  =====================================
//  Support for /php/user/html/editAccount.html
const EDIT_ACCOUNT_USERNAME = 'ea-username';
const EDIT_ACCOUNT_PICTURE = 'ea-picture';
const EDIT_ACCOUNT_FULLNAME = 'ea-fullname';
const EDIT_ACCOUNT_EMAIL = 'ea-email';
const EDIT_ACCOUNT_IMGFILE = 'ea-file';
function evEditAccount() {
    webForm('editAccount', [
        { key: 'username', value: Session.user.username }
    ]);
}
function accountImageSelected(fileId, imgId) {
    const imageInput = document.getElementById(fileId);
    if (imageInput === null)
        return;
    if (imageInput.files === null)
        return;
    if (imageInput.files.length === 0)
        return;
    const selectedImage = imageInput.files[0];
    uploadImage(selectedImage, imgId, IMAGE_MAX_WIDTH).then((imgFile) => {
        let img = document.getElementById(imgId);
        if (img)
            img.src = 'sites/' + Session.site.key + '/images/' + imgFile;
    }, (reject) => { error(reject); });
}
function saveAccount() {
    let username = eGetValue('ea-username');
    let picture = eGetSrc('ea-picture');
    let fullname = eGetValue('ea-fullname');
    let email = eGetValue('ea-email');
    closeEditAccount();
    updateUser(username, fullname, email, picture, '');
}
function closeEditAccount() {
    closeForm('editAccount');
}
function evDeleteAccount() {
    deleteUser(eGetValue('ea-username'));
}
