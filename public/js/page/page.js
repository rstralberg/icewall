
function getPage(pageId) {

    return new Promise( (resolve, reject) => 
    {
        let request = new Request('getPage', {
            pageId: pageId
        });
        request.send().then(
            (result) => { 
                if( result.status==='ok') {
                    let page = JSON.parse(result.content);
                    object2PageStyle(page);
                    resolve(page);
                }
                else reject( result.content );
            },
            (error) => { reject(error); }
        );
    });
}

function removePage(pageId) {
    let request = new Request('removePage', {
        pageId: pageId
    });
    request.send().then(
        (resolve) => {
            if (resolve.status === 'ok') {
                let firstPageId = parseInt(resolve.content);
                if (pageId === Session.page.id) {
                    getPage(firstPageId).then(
                        (page) => { Session.page = page; }
                    );
                }
                getNavbar(Session.user.username);
                getPageTitle(
                    Session.page.id,
                    Session.user.username);
            }
            else {
                popup('FEL', resolve.content);
            }
        },
        (reject) => { }
    );
}

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


function getPageTitle(pageId, username) {
    let request = new Request('getPageTitle', {
        pageId: pageId,
        username: username
    });
    request.send().then(
        (resolve) => { 
            let element = document.querySelector('.title');
            element.innerHTML = resolve.content; 

          
            if( !canEdit('content') ) document.querySelector('.left').style.display = 'none';
            if( !canEdit('page') ) document.querySelector('.right').style.display = 'none';

        },
        (reject) => { alert(reject); });
}

