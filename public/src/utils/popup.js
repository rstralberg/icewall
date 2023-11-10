
function popup(title, message, isError = false ) {

    server('popup', {
        title: title, 
        message: message,
        isError: isError
    }).then(
        (resolve) => {
            add_form('popup', resolve);
        }
    )
}

