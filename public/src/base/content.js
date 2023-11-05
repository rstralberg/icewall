

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
                container.appendChild(section);
            });
        },
        (reject) => { alert(reject);}
    )

}