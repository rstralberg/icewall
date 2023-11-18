

function yesno(title, message, callback_yes, callback_no ) {

    server('forms/yesno', {
        title: title, 
        message: message,
        yes: callback_yes,
        no: callback_no
    }).then(
        (resolve) => {
            add_form('yesno', resolve);
        }
    );
}

function close_yesno() {
    remove_form('yesno');
}