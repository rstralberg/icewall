
function updatePageParent(pageId, parentId) {

    return new Promise( (resolve, reject) => {
    let request = new Request('pageUpdate', {
        pageId: pageId,
        type: 'parentId',
        newParent: parentId
    });
    request.send().then(
        (result) => { resolve(result); },
        (error) => { reject(error);}
    );
    });

}


function updatePagePosition(positions) {

    let request = new Request('pageUpdate', {
        positions: JSON.stringify(positions),
        type: 'pos',
    });
    request.send().then(
        (resolve) => {
            if( resolve.status === 'ok') {
                getNavbar(Session.user.username);
            }
        }
    );
}

function updatePagePublic(pub) {
    let request = new Request('pageUpdate', {
        pageId: Session.page.id,
        type: 'public',
        pub: pub
    });
    request.send().then(
        (resolve) => {
            if( resolve.status === 'ok') {
                getPageTitle(Session.page.id, Session.user.username);
            }
        }
    );

}