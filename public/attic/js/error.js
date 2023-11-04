
function error(message) {
    request('error',{
        msg:  typeof message === 'object' ? JSON.stringify(message) : message,
        stack: parseCaller(Error().stack) 
    }).then( (resolve) => {
        openForm('error', resolve );
    });
}

function closeErrorMsg() {
    closeForm('error');
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
