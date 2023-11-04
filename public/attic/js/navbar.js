
function refreshNavbar() {

    request('refreshNavbar', {
        theme: removeSurround(getStyle('theme'), '"'),
        username: Session.user.username
    }).then((reply) => {
        let element = eGet('.navbar');
        element.innerHTML = reply;
    }, 
    (reject) => { 
        error(reject); 
    });
}

