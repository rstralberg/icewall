
// type = 'left' | 'right'
function getTools(type) {

    return new Promise((ok, failed) => {
        let request = new Request( type + 'Tools', {
            iconsfolder: 'icons/white',
            username: Session.user.username,
            pageId: Session.page.id
        });
        request.send().then(
            (resolve) => {
                let tools = document.getElementById(type);
                if (tools) {
                    tools.innerHTML = resolve.content;
                    tools.style.display = 'content';
                }
                ok();
            },
            (reject) => { failed(); }
        );
    });
}
