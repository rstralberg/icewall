
function addBlock(pos) {
    let request = new Request('addBlock', {
        pageId: Cookie.pageId,
        pos: pos
    });
    request.send().then(
        (resolve) => {
            getBlocks(Cookie.pageId);
        },
        (reject) => { }
    );
}
