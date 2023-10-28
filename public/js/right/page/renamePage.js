//  ===================================================
//  Supports /php/framework/right/html/page.html
//  ===================================================
//  ---------------------------------------------------
//  Rename page
//  ---------------------------------------------------
function renamePage() {
    webForm('renamePage', [
        { key: 'pageId', value: Session.page.id }
    ]);
}
function titleChanged() {
    let newTitle = eGetValue('#rp-new');
    let oldTitle = eGetValue('#rp-old');
    if (isEmpty(newTitle) || newTitle === oldTitle)
        eDisable('#rp-save');
    else {
        let e = eGet('#rp-save');
        if (e) {
            eEnable('#rp-save');
            e.focus();
        }
    }
}
function saveNewTitle() {
    let request = new SrvReq('sql', [
        { key: 'command', value: 'update' },
        { key: 'table', value: 'page' },
        { key: 'cols', value: ['title'] },
        { key: 'values', value: [surround(eGetValue('#rp-new'), '\'')] },
        { key: 'where', value: 'id=' + Session.page.id }
    ]);
    request.send().then((reply) => {
        getTop();
        getSub(Session.page.id);
    }, (err) => { error(err); });
    closeRenamePage();
}
function closeRenamePage() {
    closeForm('renamePage');
}
