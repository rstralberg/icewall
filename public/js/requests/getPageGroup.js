
function getPageGroup(pageId) {

    return new Promise( (resolve, reject) => 
    {
        let request = new Request('getPageGroup', {
            pageId: pageId
        });
        request.send().then(
            (result) => { resolve(result);},
            (error) => { reject(error); }
        );
    });
}