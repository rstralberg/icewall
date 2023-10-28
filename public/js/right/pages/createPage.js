//  ===================================================
//  Supports /php/framework/right/html/pages.html
//  ===================================================
//  ---------------------------------------------------
//  Create a new page
//  ---------------------------------------------------
function createPage() {
    webForm('createPage', []);
}
function pageCreate() {
    let title = eGetValue('#cp-title');
    let placement = eGetValue('#cp-placement');
    let showTitle = eGetChecked('#cp-showtitle');
    let author = eGetValue('#cp-author');
    if (placement === 'none') {
        popup('Du måste välja placering!');
        return;
    }
    let isParent = false;
    let parentId = 0;
    if (placement === 'top') {
        isParent = false;
        parentId = 0;
    }
    else if (placement === 'parent') {
        isParent = true;
        parentId = 0;
    }
    else {
        isParent = false;
        parentId = parseInt(placement);
    }
    let request = new SrvReq('sql', [
        { key: 'command', value: 'insert' },
        { key: 'table', value: 'page' },
        { key: 'cols', value: ['parentId', 'isParent', 'title', 'author', 'pos', 'showTitle', 'public'] },
        { key: 'values', value: [
                parentId,
                isParent ? 1 : 0,
                surround(title, '\''),
                surround(author, '\''),
                eGetChildCount('.links'),
                showTitle ? 1 : 0,
                0
            ] }
    ]);
    request.send().then((resolve) => {
        closeCreatePage();
        getTop();
        getSub(resolve);
    }, (reject) => { error(reject); });
}
function closeCreatePage() {
    closeForm('createPage');
}
