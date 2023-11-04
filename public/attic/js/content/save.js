
function saveContent(pub, pageId, content) {
    elements2vhw(content);

    let request = new Request('saveContent', {
        id: content.id.substr('sec-'.length),
        pageId: pageId,
        html: content.innerHTML,
        pos: document.querySelector('.content').childElementCount,
        pub: pub
    });
    request.send().then(
        (resolve) => { 
            if( resolve.ok === false ) {
                alert(resolve.content);
            }
        },
        (reject) => { popup(reject); }
    );
}
