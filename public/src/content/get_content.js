
function get_content() {

    server('content/get', {
        pageid: get_session_page().id
    }).then(
        (resolve) => {
            draw_content(JSON.parse(resolve));
        },
        (reject) => { popup('Sidans innehåll', reject); }
    )

}

function save_content() {
    let select = get_session_selection();
    if (select) {

        let container = document.getElementById('content');
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

        server('content/update', content).then(
            () => {
            },
            (reject) => { error(reject); }
        );
    }
}

function draw_content(contents) {

    let container = document.getElementById('content');
    container.innerHTML = '';
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
            if (get_session_user().username !== '') {
                let cur_section = get_session_selection();

                if (section !== cur_section) {

                    if (is_valid(cur_section)) {
                        console.log('detatching ' + cur_section.id);
                        detach_editor();
                    }
                    console.log('attaching ' + section.id);
                    attach_editor(section);
                    set_session_selection(section);

                    set_tool_state('ust-public', section.getAttribute('isPublic') === 'true' ? 'active' : 'normal');
                }
            }
            else {
                content_write_protect(section);
            }
            
        });
    });

}

function content_write_protect(element) {
    if( element.tagName === 'SECTION') { 
        element.classList.remove('active-section');
        element.contentEditable = false;
    }
}