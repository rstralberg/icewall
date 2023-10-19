
function toggleTitle() {
    let btn = document.getElementById('rt-show-title');
    if (btn) {
        if (btn.innerText === 'Titel synlig' ) {
            btn.innerText = 'Titel dold';
            hideTitle();
        } 
        else {
            btn.innerText = 'Titel synlig';
            showTitle();
        }
    }
}


function hideTitle() {
    let request = new Request('hidePageTitle', {
        pageId: Session.page.id
    });
    request.send().then( 
        (resolve) => {
            getPageTitle(Session.page.id);
            document.querySelector('.title').style.display='none';
            set_style('hTitle','0.0fr');
        },
        (reject) => {alert(reject);}
    );

}


function showTitle() {
    let request = new Request('showPageTitle', {
        pageId: Session.page.id
    });
    request.send().then( 
        (resolve) => {
            getPageTitle(Session.page.id);
            document.querySelector('.title').style.display='block';
            set_style('hTitle','0.4fr');
        },
        (reject) => {alert(reject);}
    );

}



function updatePageTitle(pageId, title) {
    
    return new Promise((resolve, reject) => {
        let request = new Request('pageUpdate', {
            pageId: pageId,
            what: 'title',
            title: title
        });
        request.send().then(
            (result) => {
                if( result.ok ) {
                    getNavbar();
                    getPageTitle(pageId);
                    resolve();
                }
            },
            (error) => { 
                reject();
            }
        );
    });
}
