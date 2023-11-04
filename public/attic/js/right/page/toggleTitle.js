//  ===================================================
//  Supports /php/framework/right/html/page.html
//  ===================================================
//  ---------------------------------------------------
//  Toggle page title visibility
//  ---------------------------------------------------
const TITLE_VISIBLE = 'Titel synlig';
const VISIBLE_COLOR = 'white';
const TITLE_HIDDEN = 'Titel dold';
const HIDDEN_COLOR = 'red';
function toggleTitle() {
    let element = eGet('#rt-toggle-title');
    if (element.innerText === TITLE_VISIBLE) {
        element.innerText = TITLE_HIDDEN;
        element.style.color = HIDDEN_COLOR;
        hideTitle();
    }
    else {
        element.innerText = TITLE_VISIBLE;
        element.style.color = VISIBLE_COLOR;
        showTitle();
    }
}
function hideTitle() {
    let request = new SrvReq('sql', [
        { key: 'command', value: 'update' },
        { key: 'table', value: 'page' },
        { key: 'cols', value: ['showTitle'] },
        { key: 'values', value: [0] },
        { key: 'where', value: 'id=' + Session.page.id }
    ]);
    request.send().then((reply) => {
        getSub(Session.page.id);
        let sub = eGet('.sub');
        if (sub)
            sub.style.display = 'none';
        setStyle('hSub', '0.0fr');
    }, (reject) => { error(reject); });
}
function showTitle() {
    let request = new SrvReq('sql', [
        { key: 'command', value: 'update' },
        { key: 'table', value: 'page' },
        { key: 'cols', value: ['showTitle'] },
        { key: 'values', value: [0] },
        { key: 'where', value: 'id=' + Session.page.id }
    ]);
    request.send().then((reply) => {
        getSub(Session.page.id);
        let sub = eGet('.sub');
        if (sub)
            sub.style.display = 'block';
        setStyle('hSub', '0.4fr');
    }, (reject) => { error(reject); });
}
