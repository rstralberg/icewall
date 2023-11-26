
function get_footer() {

    server('footer/get_footer', {}).then(
        (resolve) => {
            document.getElementById('info').innerHTML = resolve;
        },
        (reject) => {
            alert(reject);
        }
    )

}