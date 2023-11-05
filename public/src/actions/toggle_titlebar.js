
function on_toggle_title() {

    server('on_toggle_title', {
        pageid: get_session_page().id,
        curstate: query('header').style.display !== 'none'
    }).then(
        () => {
            update_titlebar();
        },
        (reject) => { alert(reject); }
    );
}

