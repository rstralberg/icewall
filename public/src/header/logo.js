//  ------------------------
//  args:
//     
//  ------------------------

function logo() {
    
    server('header/logo', {}).then(
        (resolve) => {
            document.getElementById('top-logo').innerHTML = resolve;
        },
        (reject) => {
            popup('Logo',reject);
        }
    )
}
