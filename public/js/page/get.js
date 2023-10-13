
function getPage(pageId) {

    return new Promise( (resolve, reject) => 
    {
        let request = new Request('getPage', {
            pageId: pageId
        });
        request.send().then(
            (result) => { 
                if( result.status==='ok') resolve(JSON.parse(result.content));
                else reject( result.content );
            },
            (error) => { reject(error); }
        );
    });
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

