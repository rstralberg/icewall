class Page {
    constructor(id = 0, title = '', parentId = 0, isParent = false, author = '', showTitle = false, pos = 0, publ = false) {
        this.id = 0;
        this.title = '';
        this.parentId = 0;
        this.isParent = false;
        this.author = '';
        this.showTitle = false;
        this.pos = 0;
        this.publ = false;
        this.id = id;
        this.title = title;
        this.parentId = parentId;
        this.isParent = isParent;
        this.author = author;
        this.showTitle = showTitle;
        this.pos = pos;
        this.publ = publ;
    }
}



function updatePageParent(pageId, parentId) {
    return new Promise((resolve, reject) => {
        let request = new SrvReq('pageUpdate', [
            { key: 'pageId', value: pageId },
            { key: 'type', value: 'parentId' },
            { key: 'newParent', value: parentId },
        ]);
        request.send().then((result) => { resolve(result === 'true'); }, (error) => { reject(error); });
    });
}
function getPageGroup(pageId) {
    return new Promise((resolve, reject) => {
        let request = new SrvReq('getPageGroup', [
            { key: 'pageId', value: pageId }
        ]);
        request.send().then((result) => { resolve(result); }, (error) => { reject(error); });
    });
}
