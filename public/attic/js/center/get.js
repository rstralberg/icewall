function getContents(pageId) {
    let request = new SrvReq('sql', [
        { key: 'command', value: 'select' },
        { key: 'table', value: 'content' },
        { key: 'cols', value: ['html', 'public', 'id'] },
        { key: 'where', value: 'pageId=' + pageId },
        { key: 'order', value: 'pos asc' },
        { key: 'single', value: false }
    ]);
    request.send().then((reply) => {
        let element = document.querySelector('.center');
        element.innerHTML = '';
        JSON.parse(reply).forEach(content => {
            let section = document.createElement('section');
            section.id = 'sec-' + content.id;
            section.setAttribute('pub', content.public ? 'true' : 'false');
            section.addEventListener('mousedown', (e) => {
                contentSelected(section.id);
            });
            section.innerHTML = content.html;
            element.appendChild(section);
        });
        prepareContents();
    }, (err) => { error(err); });
}
function getContentPublic(content) {
    return new Promise((repl, e) => {
        let request = new SrvReq('getContentPublic', [
            { key: 'id', value: parseInt(content.id.substring('sec-'.length)) }
        ]);
        request.send().then((reply) => { repl(reply); }, (err) => { e(err); });
    });
}
