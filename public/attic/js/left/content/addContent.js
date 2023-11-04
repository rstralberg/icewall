//  ===================================================
//  Supports /php/framework/left/html/section.html
//  ===================================================
//  ---------------------------------------------------
//  Add new content to the page
//  ---------------------------------------------------
function addContent() {
    let request = new SrvReq('sql', [
        { key: 'command', value: 'insert' },
        { key: 'table', value: 'content' },
        { key: 'cols', value: ['pageId', 'html', 'pos', 'public'] },
        { key: 'values', value: [
                Session.page.id,
                surround('Nytt avsnitt', '\''),
                eGetChildCount('.center'),
                0
            ] }
    ]);
    request.send().then((reply) => { getContents(Session.page.id); }, (err) => { error(err); });
}
