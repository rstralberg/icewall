
function saveBlock(pub, pageId, block) {
    elements2vhw(block);
    let request = new Request('saveBlock', {
        id: block.id.substr('sec-'.length),
        pageId: pageId,
        style: block.style.cssText,
        html: block.innerHTML,
        pos: document.querySelector('main').childElementCount,
        pub: pub
    });
    request.send().then(
        (resolve) => { },
        (reject) => { popup('FEL', reject); }
    );
}
