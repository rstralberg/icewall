
function footer() {

    server('footer/get', {}).then(
        (resolve) => {
            document.getElementById('info').innerHTML = resolve;
        },
        (reject) => {
            alert(reject);
        }
    )

}