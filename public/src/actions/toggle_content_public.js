function content_toggle_public(src) {

    let selection = get_session_selection();
    if( selection ) {
    server('toggle_content_public', {
        id: parseInt(selection.id.substring(1)),
        curstate: query_id('lt-public').style.color === get_style('sidebarsFgHi')
    }).then(
        (resolve) => {
            query_id('lt-public').style.color = resolve ? get_style('sidebarsFgHi') : get_style('sidebarsFg') ;
            selection.setAttribute('ispublic', resolve ? 'true':'false');
        },
        (reject) => { alert(reject); }
    );
    }
}

