

function yesno(title, message, callback_yes, callback_no ) {

    server('popup', {
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

