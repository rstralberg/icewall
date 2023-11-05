
function on_page_public() {
    
    server('toggle_page_public', {
        pageid: get_session_page().id
    }).then(
        (resolve) => {
            query_id('rt-public').style.color = 
            resolve? 
            get_style('sidebarsFgHi') : 
            get_style('sidebarsFg');

        },
        (reject) => { alert(reject); }
    );
}


