
function updatePageParent(pageId, parentId) {

    return new Promise( (resolve, reject) => {
    let request = new Request('updatePageParent', {
        pageId: pageId,
        newParent: parentId
    });
    request.send().then(
        (result) => { resolve(result); },
        (error) => { reject(error);}
    );
    });

}