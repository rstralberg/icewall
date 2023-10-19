//  =====================================
//  Support for /php/user/html/editAccount.html
const EDIT_ACCOUNT_USERNAME = 'ea-username';
const EDIT_ACCOUNT_PICTURE = 'ea-picture';
const EDIT_ACCOUNT_FULLNAME = 'ea-fullname';
const EDIT_ACCOUNT_EMAIL = 'ea-email';
const EDIT_ACCOUNT_IMGFILE = 'ea-file';

function evEditAccount() {
    webForm('editAccount', {
        username: Session.user.username
    });
}


function accountImageSelected(fileId, imgId) {

    const imageInput = document.getElementById(fileId);
    if (imageInput.files.length > 0) {
        const selectedImage = imageInput.files[0];
        const maxWidth = IMAGE_MAX_WIDTH;

        uploadImage(selectedImage, maxWidth).then(
            (resolve) => {
                if (resolve.ok) {
                    document.getElementById(imgId).src = 
                    'sites/' + Session.site.key + '/images/' + resolve.content;
                }
            },
            (reject) => {
                popup('FEL', reject.content);
            }
        );
    }
}

function saveAccount() {

    let username = document.getElementById('ea-username').value;
    let picture = document.getElementById('ea-picture').src;
    let fullname = document.getElementById('ea-fullname').value;
    let email = document.getElementById('ea-email').value;
    closeEditAccount();

    updateUser(username, fullname, email, picture );
}

function closeEditAccount() {
    closeForm('editAccount');
}

function evDeleteAccount() {
    deleteUser(document.getElementById('ea-username').value);
}
