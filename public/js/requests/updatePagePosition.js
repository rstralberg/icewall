
function updatePagePosition(positions) {

    let request = new Request('updatePagePosition', {
        pages: JSON.stringify(positions)
    });
    request.send().then(
        (resolve) => {
            if( resolve.status === 'ok') {
                getNavbar(Cookie.username);
            }
        }
    );
}