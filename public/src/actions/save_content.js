function content_save() {

    let select = get_session_selection();
    if (select) {

        let container = query('main');
        let pos = 0;
        for( ; pos < container.childElementCount; pos++) {
            let sec = container.children[pos];
            if( sec.id === select.id ) {
                break;
            }
        }
        let pub = query_id('lt-public');
        let isPublic = getComputedStyle(pub).color === get_style('sidebarsFgHi');

        let content = {
            id: parseInt(select.id.substring(1)),
            pos: pos,
            html: select.innerHTML,
            isPublic: isPublic
        };
        let jc = JSON.stringify(content);
        let dc = JSON.parse(jc);

        server('update_content', content ).then(
            () => {
                alert('Sparat!');
            },
            (reject) => { alert(reject);}
        );
    }
}

