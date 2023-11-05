
function on_page_selected(pageid) {

    server('getpage', {
        pageid: pageid
    }).then(
        (resolve) => {
            set_session_page(JSON.parse(resolve));
            update_titlebar();
            server('getcontent', {
                pageid: pageid
            }).then( 
                (resolve) => {
                    let container = query('main');
                    container.innerHTML = '';

                    let contents = JSON.parse(resolve);
                    contents.forEach(content => {
                        let section = document.createElement('section');
                        section.innerHTML = content.html;
                        container.appendChild(section);
                    });

                    
                },
                (reject) => { alert(reject);}
            )
        },
        (reject) => { alert(reject); }
    );
}

function on_page_parent_selected(e) {
    
    let ul = e.querySelectorAll('ul')[0];
    if (ul) {
        toggle_display(ul);
        for (let i = 0; i < ul.childElementCount; i++) {
            let li = ul.children[i];
            toggle_display(li);
        }
    }
}

