
const EDIT_ACCOUNT_USERNAME = 'editaccount-username';
const EDIT_ACCOUNT_PICTURE = 'editaccount-picture';
const EDIT_ACCOUNT_FULLNAME = 'editaccount-fullname';
const EDIT_ACCOUNT_EMAIL = 'editaccount-email';
const EDIT_ACCOUNT_IMGFILE = 'accountform-imgfile';

function editAccountSelected() {
    webForm('editAccount', { username: Session.user.username });
}

function accountImageSelected() {

    const imageInput = document.getElementById(EDIT_ACCOUNT_IMGFILE);
    if (imageInput.files.length > 0) {
        const selectedImage = imageInput.files[0];
        const maxWidth = IMAGE_MAX_WIDTH;

        let folder = Session.site.folder + '/uploads/users';
        uploadImage(selectedImage, maxWidth, folder).then(
            (resolve) => {
                if (resolve.status === 'ok') {
                    document.getElementById(EDIT_ACCOUNT_PICTURE).src = resolve.content;
                }
            },
            (reject) => {
                popup('FEL', reject.content);
            }
        );
    }
}

function saveAccount() {

    let user = Session.user;
    updateUser('editAccount',
        document.getElementById(EDIT_ACCOUNT_USERNAME).value,
        document.getElementById(EDIT_ACCOUNT_PICTURE).src,
        document.getElementById(EDIT_ACCOUNT_FULLNAME).value,
        document.getElementById(EDIT_ACCOUNT_EMAIL).value,
        user.permPage , user.permContent, user.permUser , user.permTheme , user.permSettings
    );
}

function closeEditAccount() {
    closeForm('editAccount');
}

function deteteAccountSelected() {
    const username = document.getElementById(EDIT_ACCOUNT_USERNAME).value;
    deleteUser(username);
}
