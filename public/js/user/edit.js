//  ===============================================
//  Support for php/user/html/editUsers.html
//  ===============================================

function evCloseEditUser() {
    closeForm('editUsers');
}

function evEuUsername(e) {
    let eUsername = getElement('eu-username');
    if (eUsername.getAttribute('disabled')) {
        euUpdateButton('eu-save');
        disable('eu-save-new');
    }
    else {
        euUpdateButton('eu-save-new');
        disable('eu-save');
    }
}

function evEuFullname(e) {
    let eUsername = getElement('eu-username');
    if (eUsername.getAttribute('disabled')) {
        euUpdateButton('eu-save');
        disable('eu-save-new');
    }
    else {
        euUpdateButton('eu-save-new');
        disable('eu-save');
    }
}

function evEuEmail(e) {
    let eUsername = getElement('eu-username');
    if (eUsername.getAttribute('disabled')) {
        euUpdateButton('eu-save');
        disable('eu-save-new');
    }
    else {
        euUpdateButton('eu-save-new');
        disable('eu-save');
    }
}

function evEuPassword(e) {
}

function euUpdateButton(buttonId) {
    let values = [
        getElemValue('eu-username'),
        getElemValue('eu-fullname'),
        getElemValue('eu-email'),
    ];
    for (let i = 0; i < values.length; i++) {
        if (isEmpty(values[i])) {
            disable(buttonId);
            return;
        }
    }
    enable(buttonId);
}


function evUserSelected(eSelect) {
    let username = eSelect.value;
    if (username === 'none') {
        euClear();
        return;
    }

    if (username === 'add') {
        enable('eu-username');
        setElemValue('eu-username', '');

        enable('eu-picture');
        getElement('eu-picture').src = 'icons/avatar.png';

        enable('eu-fullname');
        setElemValue('eu-fullname', '');

        enable('eu-email');
        setElemValue('eu-email', '');

        enable('eu-password');
        setElemValue('eu-password', '');

        disable('eu-delete');
        disable('eu-save');
        euUpdateButton('eu-save-new');
        return;
    }

    getUser(username).then(
        (user) => {
            getElement('eu-image').src = addImagePath(user.picture);
            setElemValue('eu-fullname', user.fullname);
            setElemValue('eu-email', user.email);
            setElemValue('eu-username', user.username);
            setElemValue('eu-password','');
            disable('eu-username');
            enable('eu-picture');
            enable('eu-fullname');
            enable('eu-email');
            enable('eu-password');
            enable('eu-save');
            disable('eu-save-new');
            if (username === 'admin') disable('eu-delete'); else enable('eu-delete');
        },
        () => { }
    );
}

function evUserImage(eFile) {

    const imageInput = getElement('eu-picture');
    if (imageInput.files.length > 0) {
        const selectedImage = imageInput.files[0];
        const maxWidth = IMAGE_MAX_WIDTH;

        uploadImage(selectedImage, maxWidth).then(
            (resolve) => {
                if (resolve.ok) {
                    getElement('eu-image').src = addImagePath(resolve.content);
                }
                else {
                    error(resolve.content);
                }
            },
            (reject) => {
                error(reject.content);
            }
        );
    }
}

function evSaveNewUser() {
    addUser(getElemValue('eu-username'),
        getElemValue('eu-fullname'),
        getElemValue('eu-email'),
        getElement('eu-image').src,
        getElemValue('eu-password')).then(
            (added) => {
                popup('Användare', added + ' har sparats');
                let select = getElement('eu-users');
                let option = document.createElement('option');
                option.value = added;
                option.innerText = added;
                select.appendChild(option);
                select.value = select.options[0].value;
            },
            (failed) => {
                popup('Användare', failed);
            }
        )
}

function evSaveUser() {

    updateUser(getElemValue('eu-username'),
        getElemValue('eu-fullname'),
        getElemValue('eu-email'),
        getElement('eu-image').src,
        getElemValue('eu-password'));
}

function evDeleteUser() {
    deleteUser(getElemValue('eu-users')).then(
        (deleted) => {
            let select = getElement('eu-users');
            for (let i = 0; i < select.childElementCount; i++) {
                if (select.options[i].value === deleted) {
                    select.removeChild(select.options[i]);
                    euClear();
                    break;
                }
            }
        },
        (failed) => { }
    )
}


function euClear() {
    setElemValue('eu-username','');
    setElemValue('eu-fullname','');
    setElemValue('eu-email','');
    setElemValue('eu-password','');
    getElement('eu-image').src = 'icons/avatar.png';
    getElement('eu-users').selectedIndex = 0;
    disable('eu-save');
    disable('eu-save-new');
    disable('eu-delete');
    disable('eu-username');
    disable('eu-password');
    
}

