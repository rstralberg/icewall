
function update_section_style() {

    let section = get_session_selection();
    if (is_valid(section)) {
        // we just catch a few 
        let cstyle = window.getComputedStyle(section);
        let style = '';
        if( cstyle.textAlign !== '') style += 'text-align:' + cstyle.textAlign;

        server('content/style', {
            id: parseInt(section.id.substring(1)),
            style: style
        }).then(
            () => { },
            (reject) => { alert(reject); }
        );
    }
}