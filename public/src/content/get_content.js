
function get_content() {

    server('content/get_content', {
        pageid: get_session_page().id
    }).then(
        (resolve) => {
            draw_content(JSON.parse(resolve));
        },
        (reject) => { popup('Sidans innehåll', reject); }
    )

}


function draw_content(contents) {

    let container = document.getElementById('content');
    container.innerHTML = '';
    contents.forEach(content => {

        let section = document.createElement('section');
        section.innerHTML = content.html;
        section.id = 's' + content.id;
        if( content.isPublic === '1') {
            section.setAttribute('ispublic', 'true');
            replace_class( section, 'draft', 'public' );
        }
        else {
            section.setAttribute('ispublic', 'false');
            replace_class( section, 'public', 'draft' );
        }
        if (content.style != '') {
            section.style = content.style;
        }
        container.appendChild(section);

        section.addEventListener('click', (e) => {
            if (get_session_user().username !== '') {
                let cur_section = get_session_selection();

                if (section !== cur_section) {

                    if (is_valid(cur_section)) {
                        detach_editor();
                    }
                    attach_editor(section);
                    set_session_selection(section);
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