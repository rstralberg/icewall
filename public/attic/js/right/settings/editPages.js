function editPages() {
    webForm('editPages', [
        { key: 'url', value: '' },
        { key: 'comment', value: '' }
    ]);
}
function pageSelected() {
    let pageId = eGetValue('#ep-pages');
    eSetValue('#ep-selected', pageId);
    eSetValue('#ep-rename', eGetValue('#ep-pages'));
    onEditPagesFill(parseInt(pageId));
    eEnable('#ep-rename');
}
function edDeletePage() {
    let pageId = parseInt(eGetValue('#ep-pages'));
    let request = new SrvReq('removePage', [
        { key: 'pageId', value: pageId }
    ]);
    request.send().then((resolve) => {
        pageId = parseInt(resolve);
        if (pageId !== Session.page.id) {
            getPage(pageId).then((page) => {
                Session.page = page;
                getTop();
                getSub(Session.page.id);
                closeEditPages();
                editPages();
            });
        }
    }, (reject) => { error(reject); });
}
function edRenameChange() {
    if (eGetValue('#ep-rename') === eGetValue('#ep-selected') || eGetValue('#ep-selected') === '')
        eDisable('#ep-rename-button');
    else
        eEnable('#ep-rename-button');
}
function edRenamePage() {
    let request = new SrvReq('sql', [
        { key: 'command', value: 'update' },
        { key: 'table', value: 'page' },
        { key: 'cols', value: ['title'] },
        { key: 'values', value: [surround(eGetValue('#ep-rename'), '\'')] },
        { key: 'where', value: 'id=' + parseInt(eGetValue('#ep-selected')) }
    ]);
    request.send().then((reply) => {
        getTop();
        getSub(Session.page.id);
        closeEditPages();
        webForm('editPages', [
            { key: 'url', value: '' },
            { key: 'comment', value: '' }
        ]);
    }, (err) => { error(err); });
}
function onEditPagesFill(pageId) {
    getPageGroup(pageId).then((resolve) => {
        let ul = eGet('#ep-pagelist');
        if (ul === null)
            return;
        ul.innerHTML = '';
        let pages = resolve;
        for (let i = 0; i < pages.length; i++) {
            let page = pages[i];
            let li = document.createElement('li');
            li.id = 'p' + page.id;
            li.style.listStyle = 'none';
            if (page.id === pageId) {
                li.classList.add('li-mark');
            }
            li.innerText = page.title;
            ul.appendChild(li);
        }
    }, (reject) => { error(reject); });
}
function onEditPagesClear() {
    let ePages = eGet('#ep-pages');
    if (ePages)
        ePages.selectedIndex = 0;
    eSetValue('#ep-selected', '');
    eSetValue('#ep-rename', '');
    let eParents = eGet('#ep-parents');
    if (eParents)
        eParents.selectedIndex = 0;
}
function parentSelected() {
    let parentId = parseInt(eGetValue('#ep-parents'));
    let curId = parseInt(eGetValue('#ep-pages'));
    updatePageParent(curId, parentId).then((resolve) => {
        getTop();
        onEditPagesFill(curId);
    }, (reject) => { error(reject); });
}
function moveUp() {
    let selectedPage = eGetValue('#ep-selected');
    let ul = eGet('#ep-pagelist');
    if (ul === null)
        return;
    let moved = false;
    // find position
    let newList = new Array();
    let pos = 0;
    for (let i = 0; i < ul.childElementCount; i++) {
        newList.push(ul.children[i]);
        if (ul.children[i].id === selectedPage) {
            pos = i;
        }
    }
    // swap
    if (pos > 0) {
        let temp = newList[pos - 1];
        newList[pos - 1] = newList[pos];
        newList[pos] = temp;
        moved = true;
    }
    // rebuild
    ul.innerHTML = '';
    for (let i = 0; i < newList.length; i++) {
        let li = document.createElement('li');
        li.id = newList[i].id;
        li.style.listStyle = 'none';
        if (newList[i].id === selectedPage) {
            li.classList.add('li-mark');
        }
        li.innerText = newList[i].innerText;
        ul.appendChild(li);
    }
    if (moved) {
        let positions = new Array();
        for (pos = 0; pos < ul.childElementCount; pos++) {
            positions.push({
                pageId: parseInt(ul.children[pos].id),
                pos: pos
            });
        }
        updatePagePositions(positions);
    }
}
function moveDown() {
    let selectedPage = eGetValue('#ep-selected');
    let ul = eGet('#ep-pagelist');
    if (ul === null)
        return;
    let moved = false;
    // find position
    let newList = new Array();
    let pos = 0;
    for (let i = 0; i < ul.childElementCount; i++) {
        newList.push(ul.children[i]);
        if (ul.children[i].id === selectedPage) {
            console.log('Current pos ' + i);
            pos = i;
        }
    }
    // swap
    if (pos < ul.childElementCount - 1) {
        console.log('Swapping ' + pos + ' and ' + (pos + 1));
        let temp = newList[pos + 1];
        newList[pos + 1] = newList[pos];
        newList[pos] = temp;
        moved = true;
    }
    // rebuild
    ul.innerHTML = '';
    for (let i = 0; i < newList.length; i++) {
        console.log('Building ' + i);
        let li = document.createElement('li');
        li.id = newList[i].id;
        li.style.listStyle = 'none';
        if (newList[i].id === selectedPage) {
            li.classList.add('li-mark');
        }
        li.innerText = newList[i].innerText;
        ul.appendChild(li);
    }
    if (moved) {
        let positions = new Array();
        for (pos = 0; pos < ul.childElementCount; pos++) {
            positions.push({
                pageId: parseInt(ul.children[pos].id),
                pos: pos
            });
        }
        updatePagePositions(positions);
    }
}
function updatePagePositions(positions) {
    let request = new SrvReq('updatePagePositions', [
        { key: 'pageId', value: Session.page.id },
        { key: 'positions', value: JSON.stringify(positions) },
        { key: 'type', value: 'pos' }
    ]);
    request.send().then((resolve) => { getTop(); }, (reject) => { error(reject); });
}
function closeEditPages() {
    closeForm('editPages');
}
//  =======================================
function onEditPageTheme() {
    webForm('editPageTheme', []);
}
// function pageStyles2ValueArray() {
//     return new Array(
//         parseInt(getStyle('wContent')),
//         parseInt(getStyle('rRoundness')),
//         parseInt(getStyle('shadows')),
//         sqlString(getStyle('borderColor')),
//         parseInt(getStyle('borderWidth')),
//         sqlString(getStyle('bgCenter')),
//         sqlString(getStyle('fgCenter')),
//         parseFloat(getStyle('fzCenter')),
//         parseInt(getStyle('dCenter'))
//     );
// }
// function object2PageStyle(obj) {
//     setStyle('wContent', obj.wContent + '%');
//     setStyle('dCenter', obj.dCenter + 'vh');
//     setStyle('rRoundness', obj.rRoundness + 'px');
//     setStyle('shadows', obj.shadows);
//     setStyle('borderColor', obj.borderColor);
//     setStyle('borderWidth', obj.borderWidth + 'px');
//     setStyle('bgCenter', obj.bgCenter);
//     setStyle('fgCenter', obj.fgCenter);
//     setStyle('fzCenter', obj.fzCenter + 'em');
// }
function loadPageTheme(pageId) {
    let request = new SrvReq('getPageTheme', [
        { key: 'pageId', value: pageId }
    ]);
    request.send().then((resolve) => { object2PageStyle(JSON.parse(resolve)); }, (reject) => { error(reject); });
}
// function savePageTheme() {
//     let theme = pageStyles2ValueArray();
//     let request = new SrvReq('updPageTheme', [ 
//         { key:'pageId', value:Session.page.id },
//         { key:'theme', value:theme }
//     ]);
//     request.send().then(
//         (resolve) => {
//             popup('Tema sparat!');
//             closePageTheme();
//         },
//         (reject) => {
//             error( reject);
//             closePageTheme();
//         }
//     );
// }
// function closePageTheme() {
//     closeForm('editPageTheme');
// }
// function onWContent(e) { setStyle('WContent', e.value); }
// function onRContent(e) { setStyle('RContent', e.value); }
// function onBdColContent(e) { setStyle('BdColContent', e.value); }
// function onBdSizeContent(e) { setStyle('BdSizeContent', e.value); }
// function onShContent(e) { setStyle('ShContent', e.value); }
// function onBgContent(e) { setStyle('BgContent', e.value); }
// function onFgContent(e) { setStyle('FgContent', e.value); }
// function onFzContent(e) { setStyle('FzContent', e.value); }
// function onDContent(e) { setStyle('DContent', e.value); }
