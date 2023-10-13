function getContents(pageId) {
    let request = new Request('getContent', {
        pageId: pageId,
        barheight: vh2px('6vh'),
        username: Session.user.username
    });
    request.send().then(
        (resolve) => {
            let element = document.querySelector('.content');
            element.innerHTML = resolve.content; 
            prepareContents();
        },
        (reject) => { alert(reject); });
}
