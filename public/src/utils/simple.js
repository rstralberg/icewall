

function simple(title, label, value, callback ) {

    server('simple', {
        title: title, 
        label: label,
        value: value,
        callback: callback
    }).then(
        (resolve) => {
            add_form('simple', resolve);
        }
    );
}

function close_simple() {
    remove_form('simple');
}
