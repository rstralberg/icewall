
const EDIT_ACCOUNT_USERNAME = 'editaccount-username';
const EDIT_ACCOUNT_PICTURE = 'editaccount-picture';
const EDIT_ACCOUNT_FULLNAME = 'editaccount-fullname';
const EDIT_ACCOUNT_EMAIL = 'editaccount-email';
const EDIT_ACCOUNT_IMGFILE = 'accountform-imgfile';

var editAccountForm = '';

function onEditAccount() {
    if( editAccountForm.length > 0 ) return;
    webForm('editAccount', {
        username: Cookie.username
    }). 
    them( (formname) => { editAccountForm = formname;});
}

function onEditAccoutImageSelected() {

    const imageInput = document.getElementById(EDIT_ACCOUNT_IMGFILE);
    if (imageInput.files.length > 0) {
        const selectedImage = imageInput.files[0];
        const maxWidth = IMAGE_MAX_WIDTH;

        uploadImage(selectedImage, maxWidth, 'users' ).then(
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

function onEditAccountApply() {

    updateUser(editAccountForm,
        document.getElementById(EDIT_ACCOUNT_USERNAME).value,
        document.getElementById(EDIT_ACCOUNT_PICTURE).src,
        document.getElementById(EDIT_ACCOUNT_FULLNAME).value,
        document.getElementById(EDIT_ACCOUNT_EMAIL).value
    );
}

function onEditAccountAbort() {
    closeForm(editAccountForm);
    editAccountForm = '';
}

var changePasswordForm = '';
function onChangePassword() {
    webForm('changePassword').
    then( (formName) => { changePasswordForm = formName;});
}

function onDeleteAccount() {
    let username = document.getElementById(EDIT_ACCOUNT_USERNAME).value;
    deleteUser(username);
}