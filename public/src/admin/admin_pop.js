function  init_admin_pop() {

    let pop = document.getElementById('admin_pop');
    if (!is_valid(pop)) {
        server('admin/admin_pop', {
        }).then(
            (resolve) => {
                add_form('admin_pop', resolve);
                let form = document.getElementById('admin_pop');
                if (is_valid(form)) {
                    form.classList.remove('form');
                    form.classList.add('admin_pop');
                }
                let side = document.getElementById('left-side');
                side.addEventListener( 'mouseup', (e) => {
                    if( e.button === 2 ) show_admin_pop();
                });
                
                side = document.getElementById('right-side');
                side.addEventListener( 'mouseup', (e) => {
                    if( e.button === 2 ) show_admin_pop();
                });
            
        });
    }
}

function show_admin_pop(e) {


    let pop = document.getElementById('admin_pop');
    if (!is_valid(pop)) return;

    // dont know how to do this calculation in CSS
    const Margin = 10;
    pop.style.display = 'block';
    pop.style.left = (document.getElementById('content').offsetLeft +  document.getElementById('content').offsetWidth + Margin) + 'px';
    pop.style.top = ((window.innerHeight - pop.clientHeight)/2) + 'px';
}

function hide_admin_pop(e) {

    let pop = document.getElementById('admin_pop');
    if (!is_valid(pop)) return;

    if( pop.style.display === 'block' )
        pop.style.display = 'none';
    
}

function on_hide_admin_pop() {
    hide_admin_pop();
}