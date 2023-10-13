
function deleteContent(content) {

    let contentId = content.id.substr('sec-'.length);
    if (contentId === null) {
        return;
    }

    let request = new Request('contentDelete', {
        contentId: contentId
    });
    request.send().then(
        (resolve) => {
            getContents(Session.page.id);
        },
        (reject) => { }
    );
}
