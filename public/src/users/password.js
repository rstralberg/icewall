
function password(savefunc) {
    server('users/password', {
        savefunc: savefunc
    }).then(
        (resolve) => {
            add_form('password-form', resolve);
        },
        (reject) => {
            error(reject);
        }
    )
}

function pw_repeat() {
    let pw = document.getElementById('pw-password').value;
    let repeat = document.getElementById('pw-repeat').value;
    if( pw !== repeat ) {
        popup('Lösenord' , 'Lösenorden stämmer inte överens');
        document.getElementById('pw-repeat').value = '';
        document.getElementById('pw-repeat').focus();
        enable_element('pw-save', false);
    }
    else {
        enable_element('pw-save', true);
    }
}

function pw_close() {
    remove_form('password-form');
}

function close_password() {
    pw_close();
}
