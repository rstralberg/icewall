function  init_content_pop() {

    let pop = document.getElementById('content_pop');
    if (!is_valid(pop)) {
        server('content/content_pop', {
        }).then(
            (resolve) => {
                add_form('content_pop', resolve);
                let form = document.getElementById('content_pop');
                if (is_valid(form)) {
                    form.classList.remove('form');
                    form.classList.add('content_pop');
                }
                let content = document.getElementById('content');
                content.addEventListener( 'mouseup', (e) => {
                    if( e.button === 2 ) show_content_pop();
                });
            
            });
    }
}

function show_content_pop(e) {

    let pop = document.getElementById('content_pop');
    if (!is_valid(pop)) return;

    // dont know how to do this calculation in CSS
    const Margin = 10;
    pop.style.display = 'block';
    pop.style.left = (document.getElementById('content').offsetLeft - pop.offsetWidth - Margin) + 'px';
    pop.style.top = ((window.innerHeight - pop.clientHeight)/2) + 'px';
}

function hide_content_pop(e) {

    let pop = document.getElementById('content_pop');
    if (!is_valid(pop)) return;

    if( pop.style.display === 'block' )
        pop.style.display = 'none';
    
}

function on_hide_content_pop() {
    hide_content_pop();
}