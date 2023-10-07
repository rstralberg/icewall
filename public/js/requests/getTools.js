
function getTools() {

    return new Promise((ok, failed) => {
        let request = new Request('tools', {
            iconsfolder: 'icons/white'
        });
        request.send().then(
            (resolve) => {
                let tools = document.getElementById('tools');
                if (tools) {
                    tools.innerHTML = resolve.content;
                    tools.style.display = 'block';
                }
                ok();
            },
            (reject) => { failed(); }
        );
    });
}
