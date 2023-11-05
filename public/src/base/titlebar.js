
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
                let top = vh2px('6vh') 
                    + vh2px(get_style('navbarHeight')); 
                main.style.top = top + 'px';

                let height =  vh2px( (100 - 6 - 4)+'vh') 
                    - vh2px(get_style('navbarHeight')) 
                    - vh2px(get_style('footerHeight'));
                main.style.height = height + 'px';
            }
            else {
                let top = vh2px('6vh') 
                    + vh2px(get_style('navbarHeight')) 
                    + vh2px(get_style('titlebarHeight')); 
                main.style.top = top + 'px';
            
                let height =  vh2px( (100 - 6 - 4)+'vh') 
                    - vh2px(get_style('navbarHeight')) 
                    - vh2px(get_style('titlebarHeight'))
                    - vh2px(get_style('footerHeight'));
                main.style.height = height + 'px';
            }

        },
        (reject) => {
            alert(reject);
        }
    )
}
