
function getNavbar(username) {
    let request = new Request('navbar', {
        username: username,
        theme: get_style('theme')
    });
    request.send().then(
        (resolve) => { updateHtml('nav', resolve.content); },
        (reject) => { alert(reject); });

}


