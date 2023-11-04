
function addContent(pos) {
    let request = new Request('addContent', {
        pageId: Session.page.id,
        pos: pos
    });
    request.send().then(
        (resolve) => {
            getContents(Session.page.id);
        },
        (reject) => { }
    );
}
