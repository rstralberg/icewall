
function deleteBlock(block) {

    let blockId = block.id.substr('sec-'.length);
    if (blockId === null) {
        return;
    }

    let request = new Request('deleteBlock', {
        blockId: blockId
    });
    request.send().then(
        (resolve) => {
            getBlocks(Cookie.pageId);
        },
        (reject) => { }
    );
}
