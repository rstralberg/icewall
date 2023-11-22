function  init_menu_pop() {

    let pop = document.getElementById('menu_pop');
    if (!is_valid(pop)) {
        server('header/menu_pop', {
        }).then(
            (resolve) => {
                add_form('menu_pop', resolve);
                let form = document.getElementById('menu_pop');
                if (is_valid(form)) {
                    form.classList.remove('form');
                    form.classList.add('menu_pop');
                }
                let content = document.getElementById('header');
                content.addEventListener( 'mouseup', (e) => {
                    if( e.button === 2 ) show_menu_pop();
                });

            });
    }
}

function show_menu_pop(e) {


    let pop = document.getElementById('menu_pop');
    if (!is_valid(pop)) return;

    // dont know how to do this calculation in CSS
    const Margin = 10;
    pop.style.display = 'block';
    pop.style.left = (document.getElementById('content').offsetLeft +  document.getElementById('content').offsetWidth + Margin) + 'px';
    pop.style.top = ((window.innerHeight - pop.clientHeight)/2) + 'px';
}

function hide_menu_pop(e) {

    let pop = document.getElementById('menu_pop');
    if (!is_valid(pop)) return;

    if( pop.style.display === 'block' )
        pop.style.display = 'none';
    
}

function on_hide_menu_pop() {
    hide_menu_pop();
}