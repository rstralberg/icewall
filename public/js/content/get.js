function getContents(pageId) {
    let request = new Request('getContent', {
        pageId: Session.page.id,
        username: Session.user ? Session.user.username : null,
        barheight: vh2px('6vh'),
    });
    request.send().then(
        (resolve) => {
            let element = document.querySelector('.content');
            element.innerHTML = resolve.content; 
            prepareContents();
        },
        (reject) => { alert(reject); });
}
