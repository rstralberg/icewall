
function update_section_style() {

    let section = get_session_selection();
    if (is_valid(section)) {
        // we just catch a few 
        let cstyle = window.getComputedStyle(section);
        let style = '';
        if( cstyle.textAlign !== '') style += 'text-align:' + cstyle.textAlign;

        server('update_section_style', {
            id: parseInt(section.id.substring(1)),
            style: style
        }).then(
            () => { update_user_tools(section); },
            (reject) => { alert(reject); }
        );
    }
}