function  init_right_pop() {

    let pop = document.getElementById('right_pop');
    if (!is_valid(pop)) {
        server('pop/right_pop', {
        }).then(
            (resolve) => {
                add_form('right_pop', resolve);
                let form = document.getElementById('right_pop');
                if (is_valid(form)) {
                    form.classList.remove('form');
                    form.classList.add('pop');
                    replace_class(form.querySelector('h1'),'form-banner', 'pop-banner');
                }
                let side = document.getElementById('right-side');
                side.addEventListener('contextmenu', (e) => { e.preventDefault();})
                side.addEventListener( 'mouseup', (e) => {
                    if( e.button === 2 ) {
                        if( form.style.display === 'none' || form.style.display === '' )
                             show_right_pop();
                        else
                            hide_right_pop();
                    }
                });
        });
    }
}

function show_right_pop(e) {


    let pop = document.getElementById('right_pop');
    if (!is_valid(pop)) return;

    // dont know how to do this calculation in CSS
    const Margin = 10;
    pop.style.display = 'block';
    pop.style.left = (document.getElementById('content').offsetLeft +  document.getElementById('content').offsetWidth + Margin) + 'px';
    pop.style.top = ((window.innerHeight - pop.clientHeight)/2) + 'px';
}

function hide_right_pop(e) {

    let pop = document.getElementById('right_pop');
    if (!is_valid(pop)) return;

    if( pop.style.display === 'block' )
        pop.style.display = 'none';
    
}

function on_hide_right_pop() {
    hide_right_pop();
}
