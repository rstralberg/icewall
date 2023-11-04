
function getPage(pageId) {

    return new Promise( (resolve, reject) => 
    {
        let request = new Request('getPage', { 
            pageId: pageId 
        });
        request.send().then(
            (result) => { 
                if( result.ok) {
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
    let request = new Request('removePage', {pageId: pageId});
    request.send().then(
        (resolve) => {
            if (resolve.ok) {
                pageId = parseInt(resolve.content);
                if (pageId === Session.page.id) {
                    getPage(pageId).then(
                        (page) => { 
                            Session.page = page; 
                            getNavbar();
                            getPageTitle(Session.page.id);
                        }
                    );
                }
            }
            else {
                error( resolve.content);
            }
        },
        (reject) => { error( reject ) }
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
        pageId: Session.page.id,
        positions: JSON.stringify(positions),
        type: 'pos',
    });
    request.send().then(
        (resolve) => {
            if( resolve.ok) {
                getNavbar();
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
            if( resolve.ok) {
                getPageTitle(Session.page.id);
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


function getPageTitle(pageId) {
    let request = new Request('getPageTitle', {
        pageId: pageId ,
        username: Session.user ? Session.user.username : null
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

