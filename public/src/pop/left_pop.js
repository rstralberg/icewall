function  init_left_pop() {

    let pop = document.getElementById('left_pop');
    if (!is_valid(pop)) {
        server('pop/left_pop', {
        }).then(
            (resolve) => {
                add_form('left_pop', resolve);
                let form = document.getElementById('left_pop');
                if (is_valid(form)) {
                    form.classList.remove('form');
                    form.classList.add('pop');
                }
                let side = document.getElementById('left-side');
                side.addEventListener('contextmenu', (e) => { e.preventDefault();})
                side.addEventListener( 'mouseup', (e) => {
                    if( e.button === 2 ) {
                        if( ( form.style.display === 'none' || form.style.display === '' ) && is_valid(get_session_selection()) )
                            show_left_pop();
                        else
                            hide_left_pop();
                    }
                });
        });
    }
}

function show_left_pop(e) {

    let pop = document.getElementById('left_pop');
    if (!is_valid(pop)) return;

    // dont know how to do this calculation in CSS
    const Margin = 10;
    pop.style.display = 'block';
    pop.style.left = (document.getElementById('content').offsetLeft - pop.offsetWidth - Margin) + 'px';
    pop.style.top = ((window.innerHeight - pop.clientHeight)/2) + 'px';
}

function hide_left_pop(e) {

    let pop = document.getElementById('left_pop');
    if (!is_valid(pop)) return;

    if( pop.style.display === 'block' )
        pop.style.display = 'none';
    
}

function on_hide_left_pop() {
    hide_left_pop();
}