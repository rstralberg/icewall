//  ------------------------
//  args:
//     
//  ------------------------

function get_logo() {
    
    server('header/get_logo', {}).then(
        (resolve) => {
            document.getElementById('top-logo').innerHTML = resolve;
        },
        (reject) => {
            popup('Logo',reject);
        }
    )
}
