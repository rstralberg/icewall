
function error( message) {

    server('error', {
        message: message,
    }).then(
        (resolve) => {
            add_form('error', resolve);
        }
    )
}

