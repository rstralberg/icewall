
const EDIT_USERS_SELECT = 'editusers-select';
const EDIT_USERS_PICTURE = 'editusers-picture';
const EDIT_USERS_IMGFILE = 'editusers-imgfile';
const EDIT_USERS_FULLNAME = 'editusers-fullname';
const EDIT_USERS_EMAIL = 'editusers-email';
const EDIT_USERS_PASSWORD = 'editusers-password';
const EDIT_USERS_PERM_PAGES = 'editusers-perm-pages';
const EDIT_USERS_PERM_BLOCKS = 'editusers-perm-contents';
const EDIT_USERS_PERM_USERS = 'editusers-perm-users';
const EDIT_USERS_PERM_THEMES = 'editusers-perm-themes';
const EDIT_USERS_PERM_SETTINGS = 'editusers-perm-settings';

function onEditUsers() 
{
    webForm('editUsers', { size: 128 } );
}

function onNewUser() {
    let eValue = getTheValue();
    if( eValue ) {
        let select = document.getElementById(EDIT_USERS_SELECT);
        let option = document.createElement('option');
        option.value = eValue;
        option.innerText = eValue;
        select.appendChild(option);

        for( let i=0; i < select.childElementCount; i++) {
            let child = select.children[i];
            if( child.value === eValue) {
                select.selectedIndex = i;
                break;
            }
        }
    }
    getValue('Lösenord för användaren', 'Lösenord', 'password', '', 'onNewUserPassword')
}

function onNewUserPassword() {
    let eValue = getTheValue();
    if( eValue ) {
        let password = eValue;
        if( password.length < 8) {
            popup('Lösenord', 'Lösenordet måste ha minst 8 tecken');
            return;
        }
        document.getElementById(EDIT_USERS_PASSWORD).value = password;
    }
    document.getElementById(EDIT_USERS_PICTURE).src = '';
    document.getElementById(EDIT_USERS_FULLNAME).value = '';
    document.getElementById(EDIT_USERS_EMAIL).value = '';
    
}


function userSelected() {
    let select = document.getElementById(EDIT_USERS_SELECT);
    let username = select.options[select.selectedIndex].value;

    if( username === 'add') {
        getValue('Ny användare', 'Användarnamn', 'text', '', 'onNewUser' );
        return;
    }
    if( username === 'none') {
        return;
    }

    getUser(username).then(
        (user) => {
            document.getElementById(EDIT_USERS_PICTURE).src = user.picture;
            document.getElementById(EDIT_USERS_FULLNAME).value = user.fullname;
            document.getElementById(EDIT_USERS_EMAIL).value = user.email;
            document.getElementById(EDIT_USERS_PERM_PAGES).checked = user.permPage === '1';
            document.getElementById(EDIT_USERS_PERM_BLOCKS).checked = user.permContent === '1';
            document.getElementById(EDIT_USERS_PERM_USERS).checked = user.permUser === '1';
            document.getElementById(EDIT_USERS_PERM_THEMES).checked = user.permTheme === '1';
            document.getElementById(EDIT_USERS_PERM_SETTINGS).checked = user.permSettings === '1';
        },
        (error) => { popup('FEL', error);}
    );
}

function saveEditUser() {

    let select = document.getElementById(EDIT_USERS_SELECT);
    let username = select.options[select.selectedIndex].value;

    updateUser(null,
        username,
        document.getElementById(EDIT_USERS_PICTURE).src,
        document.getElementById(EDIT_USERS_FULLNAME).value,
        document.getElementById(EDIT_USERS_EMAIL).value,
        document.getElementById(EDIT_USERS_PASSWORD).value,
        document.getElementById(EDIT_USERS_PERM_PAGES).checked,
        document.getElementById(EDIT_USERS_PERM_BLOCKS).checked,
        document.getElementById(EDIT_USERS_PERM_USERS).checked,
        document.getElementById(EDIT_USERS_PERM_THEMES).checked,
        document.getElementById(EDIT_USERS_PERM_SETTINGS).checked);

}

function deleteEditUser() 
{
    let select = document.getElementById(EDIT_USERS_SELECT);
    let username = select.options[select.selectedIndex].value;
    deleteUser(username);
}

function userImageSeleced() {

    const imageInput = document.getElementById(EDIT_USERS_IMGFILE);
    if (imageInput.files.length > 0) {
        const selectedImage = imageInput.files[0];
        const maxWidth = IMAGE_MAX_WIDTH;

        let folder = Session.site.folder + '/uploads/users';
        uploadImage(selectedImage, maxWidth, 'users' ).then(
            (resolve) => {
                if (resolve.status === 'ok') {
                    document.getElementById(EDIT_USERS_PICTURE).src = resolve.content;
                }
            },
            (reject) => {
                alert(reject.content);
            }
        );
    }
}

function closeEditUser() {
    closeForm('editUsers');
}
