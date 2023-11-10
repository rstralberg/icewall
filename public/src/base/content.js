

function update_content() {

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
                if( content.style != '') {
                    section.style = content.style;
                }
                container.appendChild(section);

                section.addEventListener('click', (e) => {
                    let cur_section = get_session_selection();
                    if (section !== cur_section  ) {

                        if( is_valid(cur_section)) {
                            console.log( 'detatching ' + cur_section.id);
                            detach_editor();
                        }
                        console.log( 'attaching ' + section.id);
                        attach_editor(section);
                        set_session_selection(section);
                        
                        if( section.getAttribute('isPublic')==='true')
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