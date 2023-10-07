function getBlocks(pageId) {
    let request = new Request('blocks', {
        pageId: pageId,
        barheight: vh2px('6vh'),
        username: Cookie.username
    });
    request.send().then(
        (reply) => {
            updateHtml('main', reply.content);
            prepareBlocks();
        },
        (reject) => { alert(reject); });
}
