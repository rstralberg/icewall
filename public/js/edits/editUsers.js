
const EDIT_USERS_SELECT = 'editusers-select';
const EDIT_USERS_PICTURE = 'editusers-picture';
const EDIT_USERS_IMGFILE = 'editusers-imgfile';
const EDIT_USERS_FULLNAME = 'editusers-fullname';
const EDIT_USERS_EMAIL = 'editusers-email';
const EDIT_USERS_PASSWORD = 'editusers-password';
const EDIT_USERS_PERM_PAGES = 'editusers-perm-pages';
const EDIT_USERS_PERM_BLOCKS = 'editusers-perm-blocks';
const EDIT_USERS_PERM_USERS = 'editusers-perm-users';
const EDIT_USERS_PERM_THEMES = 'editusers-perm-themes';
const EDIT_USERS_PERM_SETTINGS = 'editusers-perm-settings';

var editUsersForm = '';
var newUserForm='';
var newPasswordForm='';
function onEditUsers() 
{
    if( editUsersForm.length > 0 ) return;
    webForm('editUsers', { size: 128 } ). 
    then( (formname) => { editUsersForm = formname;});
}

function onNewUser() {
    let eValue = document.getElementById(GETVALUE_VALUE);
    if( eValue ) {
        let select = document.getElementById(EDIT_USERS_SELECT);
        let option = document.createElement('option');
        option.value = eValue.value;
        option.innerText = eValue.value;
        select.appendChild(option);

        for( let i=0; i < select.childElementCount; i++) {
            let child = select.children[i];
            if( child.value === eValue.value) {
                select.selectedIndex = i;
                break;
            }
        }
    }
    console.log( 'Closing ' + newUserForm);
    closeForm(newUserForm);;
    getValue('Lösenord för användaren', 'Lösenord', 'password', '', 'onNewUserPassword').then(
        (id) => { 
            newPasswordForm = id;
            console.log( 'New Password form ' + newPasswordForm);
        }
    );
}

function onNewUserPassword() {
    let eValue = document.getElementById(GETVALUE_VALUE);
    if( eValue ) {
        let password = eValue.value;
        if( password.length < 8) {
            popup('Lösenord', 'Lösenordet måste ha minst 8 tecken');
            return;
        }
        document.getElementById(EDIT_USERS_PASSWORD).value = password;
    }
    console.log('Closing ' + newPasswordForm);
    closeForm(newPasswordForm);
    document.getElementById(EDIT_USERS_PICTURE).src = '';
    document.getElementById(EDIT_USERS_FULLNAME).value = '';
    document.getElementById(EDIT_USERS_EMAIL).value = '';
    
}


function onEditUsersSelect() {
    let select = document.getElementById(EDIT_USERS_SELECT);
    let username = select.options[select.selectedIndex].value;

    if( username === 'add') {
        getValue('Ny användare', 'Användarnamn', 'text', '', 'onNewUser' ).then(
            (id) => { 
                newUserForm = id; 
                console.log( 'New User ' + newUserForm );
            }
        );
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
            document.getElementById(EDIT_USERS_PERM_PAGES).checked = user.permPages === '1';
            document.getElementById(EDIT_USERS_PERM_BLOCKS).checked = user.permBlocks === '1';
            document.getElementById(EDIT_USERS_PERM_USERS).checked = user.permUsers === '1';
            document.getElementById(EDIT_USERS_PERM_THEMES).checked = user.permThemes === '1';
            document.getElementById(EDIT_USERS_PERM_SETTINGS).checked = user.permSettings === '1';
        },
        (error) => { popup('FEL', error);}
    );
}

function onEditUsersSave() {

    let select = document.getElementById(EDIT_USERS_SELECT);
    let username = select.options[select.selectedIndex].value;

    updateUser(null,
        username,
        document.getElementById(EDIT_USERS_PICTURE).src,
        document.getElementById(EDIT_USERS_FULLNAME).value,
        document.getElementById(EDIT_USERS_EMAIL).value,
        document.getElementById(EDIT_USERS_PASSWORD).value );
        document.getElementById(EDIT_USERS_PERM_PAGES).checked;
        document.getElementById(EDIT_USERS_PERM_BLOCKS).checked;
        document.getElementById(EDIT_USERS_PERM_USERS).checked;
        document.getElementById(EDIT_USERS_PERM_THEMES).checked;
        document.getElementById(EDIT_USERS_PERM_SETTINGS).checked;

}

function onEditUsersDelete() 
{
    let select = document.getElementById(EDIT_USERS_SELECT);
    let username = select.options[select.selectedIndex].value;
    deleteUser(username);
}

function onEditUsersImageSelected() {

    const imageInput = document.getElementById(EDIT_USERS_IMGFILE);
    if (imageInput.files.length > 0) {
        const selectedImage = imageInput.files[0];
        const maxWidth = IMAGE_MAX_WIDTH;

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

function onEditUsersClose() {
    closeForm(editUsersForm);
    editUsersForm = '';
}
