
function update_titlebar() {

    server('update_titlebar', {
        pageid: get_session_page().id
    }).then(
        (resolve) => {
            let header = query('header');
            header.innerHTML = resolve;

            let nav = query('nav');
            let main = query('main');

            let titlebar = query_id('titlebar');
            header.style.display = titlebar.style.display;

            //  Note! Verify the style formulas against 
            //  basic.css values for main
            if( header.style.display == 'none') {
                main.classList.remove('main-header');
                main.classList.add('main-no-header');
            }
            else {
                main.classList.remove('main-no-header');
                main.classList.add('main-header');
            }

        },
        (reject) => {
            alert(reject);
        }
    )
}
