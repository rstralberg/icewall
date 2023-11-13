
function password(savefunc) {
    server('password', {
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
    let pw = query_value('pw-password');
    let repeat = query_value('pw-repeat');
    if( pw !== repeat ) {
        popup('Lösenord' , 'Lösenorden stämmer inte överens');
        query_id('pw-repeat').value = '';
        query_id('pw-repeat').focus();
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
