

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
                container.appendChild(section);

                section.addEventListener('click', (e) => {
                    if (section !== get_session_selection() ) {
                        for (let i = 0; i < container.childElementCount; i++) {
                            let element = container.children[i];
                            if (element === section) {
                                element.classList.add('active-section');
                                element.contentEditable = true;
                                set_session_selection(element);
                                query_id('lt-public').style.color = element.getAttribute('ispublic') === 'true' ? get_style('sidebarsFgHi') : get_style('sidebarsFg');

                            }
                            else {
                                element.classList.remove('active-section');
                                element.removeAttribute('contentEditable');

                            }
                        }
                    }
                })
            });
        },
        (reject) => { alert(reject); }
    )

}