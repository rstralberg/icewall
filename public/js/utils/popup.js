
function popup(title, message) {
    webForm('popup', {
        title: title,
        message: message
    });
}

function closePopup() {
    closeForm('popup');
}