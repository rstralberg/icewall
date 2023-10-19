
const EDIT_PAGES_SELECT = 'pagesform-select';
const EDIT_PAGES_SELECTED = 'pagesform-selected';
const EDIT_PAGES_DELETE = 'pagesform-delete';
const EDIT_PAGES_RENAME = 'pagesform-rename';
const EDIT_PAGES_PARENT_SELECT = 'pagesform-parent-select';
const EDIT_PAGES_UP = 'pagesform-up';
const EDIT_PAGES_RIGHT = 'pagesform-right';
const EDIT_PAGES_DOWN = 'pagesform-down';
const EDIT_PAGES_LEFT = 'pagesform-left';
const EDIT_PAGES_LIST = 'pagesform-pagelist'

function onEditPages() {
    webForm('editPages', { url: '', comment: '' });
}

function pageSelected() {
    let select = document.getElementById(EDIT_PAGES_SELECT);
    let pageId = parseInt(select.options[select.selectedIndex].value);
    document.getElementById(EDIT_PAGES_SELECTED).value = pageId;
    document.getElementById(EDIT_PAGES_RENAME).value = select.options[select.selectedIndex].innerText;
    onEditPagesFill(pageId);
}

function delPage() {
    let pageId = document.getElementById(EDIT_PAGES_SELECTED).value;
    if (pageId.length > 0) {
        removePage(parseInt(pageId));
        onEditPagesClear();
    }
}

function renPage() {
    let title = document.getElementById(EDIT_PAGES_RENAME).value;
    let pageId = parseInt(document.getElementById(EDIT_PAGES_SELECTED).value);
    updatePageTitle(pageId, title).then(
        (resolve) => {
            if (resolve.ok) {
                getNavbar();
                getPageTitle(pageId);
                onEditPagesFill(pageId);

            }
        },
        (reject) => {
            popup('FEL',reject.content);
        }
    );
}

function onEditPagesFill(pageId) {

    getPageGroup(pageId).then(
        (resolve) => {
            if (resolve.ok) {
                let ul = document.getElementById(EDIT_PAGES_LIST);
                ul.innerHTML = '';
                let pages = JSON.parse(resolve.content);
                for (let i = 0; i < pages.length; i++) {
                    let page = pages[i];
                    let li = document.createElement('li');
                    li.id = 'p' + page.id;
                    li.style.listStyle = 'none';
                    if (parseInt(page.id) === parseInt(pageId)) {
                        li.classList.add('li-mark');
                    }
                    li.innerText = page.title;
                    ul.appendChild(li);
                }
            }
            else {

            }

        },
        (reject) => { }
    );
}

function onEditPagesClear() {

    document.getElementById(EDIT_PAGES_SELECT).selectedIndex = 0;
    document.getElementById(EDIT_PAGES_SELECTED).value = '';
    document.getElementById(EDIT_PAGES_RENAME).value = '';
    document.getElementById(EDIT_PAGES_PARENT_SELECT).selectedIndex = 0;
}


function parentSelected() {

    let select = document.getElementById(EDIT_PAGES_PARENT_SELECT);
    let parentId = parseInt(select.options[select.selectedIndex].value);

    let curId = parseInt(document.getElementById(EDIT_PAGES_SELECTED).value);

    updatePageParent(curId, parentId).then(
        (resolve) => {
            if (resolve.ok) {
                getNavbar();
                onEditPagesFill(curId);
            }
        },
        (reject) => { }
    );

}

function moveUp() {

    let selectedPage = 'p' + document.getElementById(EDIT_PAGES_SELECTED).value;

    let ul = document.getElementById(EDIT_PAGES_LIST);
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
                pageId: parseInt(ul.children[pos].id.substring(1)),
                pos: pos
            });
        }
        updatePagePosition(positions);
    }

}

function moveDown() {
    let selectedPage = 'p' + document.getElementById(EDIT_PAGES_SELECTED).value;

    let ul = document.getElementById(EDIT_PAGES_LIST);
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
    if (pos < ul.childElementCount - 1) {
        let temp = newList[pos + 1];
        newList[pos + 1] = newList[pos];
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
                pageId: parseInt(ul.children[pos].id.substring(1)),
                pos: pos
            });
        }
        updatePagePosition(positions);
    }
}

function closeEditPages() {
    closeForm('editPages');
}

function onEditPageTheme() {
    webForm( 'editPageTheme');
}

function pageStyles2ValueArray()  {
    return new Array(
        parseInt(get_style('wContent')),
        parseInt(get_style('rContent')),
        parseInt(get_style('shContent')),
        sqlString(get_style('bdColContent')),
        parseInt(get_style('bdSizeContent')),
        sqlString(get_style('bgContent')),
        sqlString(get_style('fgContent')),
        parseFloat(get_style('fzContent')),
        parseInt(get_style('dContent'))
    );

}

function object2PageStyle(obj)  {

    set_style('wContent',obj.wContent + '%');
    set_style('dContent',obj.dContent + 'vh');
    set_style('rContent',obj.rContent + 'px');
    set_style('shContent',obj.shContent);
    set_style('bdColContent',obj.bdColContent);
    set_style('bdSizeContent',obj.bdSizeContent + 'px');
    set_style('bgContent',obj.bgContent);
    set_style('fgContent',obj.fgContent);
    set_style('fzContent',obj.fzContent + 'em');
}


function loadPageTheme(pageId) {

    let request = new Request('getPageTheme', { pageId: pageId});
    request.send().then( 
        (resolve) => {
            if( resolve.ok) {
                object2PageStyle(JSON.parse(resolve.content));
            }
        }
    )

}

function savePageTheme() {

    let theme = pageStyles2ValueArray();
    let request = new Request('updPageTheme', {
        pageId : Session.page.id,
        theme: theme });

    request.send().then(
        (resolve) => {
            if( resolve.ok) {
                popup('Tema sparat!');
            }
            closePageTheme();
        },
        (reject) => {
            closePageTheme();
        }
    );
}

function closePageTheme() {
    closeForm('editPageTheme');
}

function onWContent(e) { set_style('WContent', e.value);}
function onRContent(e) { set_style('RContent', e.value);}
function onBdColContent(e) { set_style('BdColContent', e.value);}
function onBdSizeContent(e) { set_style('BdSizeContent', e.value);}
function onShContent(e) { set_style('ShContent', e.value);}
function onBgContent(e) { set_style('BgContent', e.value);}
function onFgContent(e) { set_style('FgContent', e.value);}
function onFzContent(e) { set_style('FzContent', e.value);}
function onDContent(e) { set_style('DContent', e.value);}
