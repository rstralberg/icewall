
function error(message) {
    webForm('errorMsg', {
        message: message,
        stack: Error().stack
    });
}

function closeErrorMsg() {
    closeForm('errorMsg');
}