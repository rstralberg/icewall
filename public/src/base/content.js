

function get_content() {

    server('getcontent', {
        pageid: get_session_page().id
    }).then(
        (resolve) => {
            let container = query('main');
            container.innerHTML = '';

            let contents = JSON.parse(resolve);
            contents.forEach(content => {

                let section = document.createElement('section');
                section.innerHTML = content.html;
                section.id = 's' + content.id;
                section.setAttribute('ispublic', content.isPublic === '1' ? 'true' : 'false');
                if (content.style != '') {
                    section.style = content.style;
                }
                container.appendChild(section);

                section.addEventListener('click', (e) => {
                    let cur_section = get_session_selection();
                    if (section !== cur_section) {

                        if (is_valid(cur_section)) {
                            console.log('detatching ' + cur_section.id);
                            detach_editor();
                        }
                        console.log('attaching ' + section.id);
                        attach_editor(section);
                        set_session_selection(section);

                        if (section.getAttribute('isPublic') === 'true')
                            set_tool_state('ust-public', 'active');
                        else
                            set_tool_state('ust-public', 'normal');

                    }
                })
            });
        },
        (reject) => { popup('Sidans innehåll', reject); }
    )

}

function save_content() {
    let select = get_session_selection();
    if (select) {

        let container = query('main');
        let pos = 0;
        for (; pos < container.childElementCount; pos++) {
            let sec = container.children[pos];
            if (sec.id === select.id) {
                break;
            }
        }
        let isPublic = get_tool_state('ust-public') === 'active';

        // we just catch a few 
        let cstyle = window.getComputedStyle(select);
        let style = '';
        if (cstyle.textAlign !== '') style += 'text-align:' + cstyle.textAlign;

        let content = {
            id: parseInt(select.id.substring(1)),
            pos: pos,
            html: select.innerHTML,
            style: style,
            isPublic: isPublic
        };

        server('update_content', content).then(
            () => {
            },
            (reject) => { error(reject); }
        );
    }
}