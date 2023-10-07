function getFooter() {
    let request = new Request('footer');
    request.send().then(
        (reply) => { updateHtml('footer', reply.content); },
        (reject) => { alert(reject); });
}
