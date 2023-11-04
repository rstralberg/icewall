function getpage(pageId) {
    request('getpage', {
        pageId: pageId
    }).then((reply) => {
        let page = reply;
        
        // object2PageStyle(page);

    }, (problem) => { error(problem); });
}
