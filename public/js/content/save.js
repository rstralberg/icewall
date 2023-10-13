
function saveContent(pub, pageId, content) {
    elements2vhw(content);
    let request = new Request('saveContent', {
        id: content.id.substr('sec-'.length),
        pageId: pageId,
        style: content.style.cssText,
        html: content.innerHTML,
        pos: document.querySelector('.content').childElementCount,
        pub: pub
    });
    request.send().then(
        (resolve) => { 
            if( resolve.status !== 'ok' ) {
                alert(resolve.content);
            }
        },
        (reject) => { popup('FEL', reject); }
    );
}
