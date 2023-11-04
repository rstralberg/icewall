//  ===================================================
//  Supports /php/framework/right/html/page.html
//  ===================================================
//  ---------------------------------------------------
//  Toogle public state of page
//  ---------------------------------------------------
const PAGE_PUBLIC = 'Publik';
const PUBLIC_COLOR = 'white';
const PAGE_INTERN = 'Intern';
const INTERN_COLOR = 'red';
function togglePagePublic() {
    let publ = eGetText('#rt-public') === PAGE_PUBLIC ? false : true;
    let request = new SrvReq('sql', [
        { key: 'command', value: 'update' },
        { key: 'table', value: 'page' },
        { key: 'cols', value: ['public'] },
        { key: 'values', value: [publ ? 1 : 0] },
        { key: 'where', value: 'id=' + Session.page.id }
    ]);
    request.send().then((reply) => {
        let element = eGet('#rt-public');
        if (element === null)
            return;
        if (publ) {
            element.innerText = PAGE_PUBLIC;
            element.style.color = PUBLIC_COLOR;
        }
        else {
            element.innerText = PAGE_INTERN;
            element.style.color = INTERN_COLOR;
        }
    }, (reject) => { error(reject); });
}
