
function error(message) {
    webForm('errorMsg', [
        { key: 'message', value: message },
        { key: 'stack', value: parseCaller(Error().stack) }
    ]);
}
function closeErrorMsg() {
    closeForm('errorMsg');
}

function parseCaller(stack) {
    if (typeof stack === 'undefined')
        return '';

    let subs = stack.split('at').reverse();
    let caller = '';
    let line = 1;
    for (let i = 0; i < subs.length - 2; i++) {
        let sub = subs[i];
        sub = sub.trim();
        if (!sub.startsWith('http') && sub.search('Promise') === -1) {
            caller += line + ':&nbsp;';
            line++;
            caller += '<em>' + sub.split(" ")[0] + '(...)</em>';
            caller += '<br>';
        }
    }
    return caller + '<hr>' + stack;
}
