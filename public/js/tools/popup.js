function popup(message) {
    webForm('popup', [
        { key: 'title', value: 'Meddelande' },
        { key: 'message', value: message }
    ]);
}
function closePopup() {
    closeForm('popup');
}
