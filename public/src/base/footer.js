
function update_footer() {

    server('update_footer', {}).then(
        (resolve) => {
            query('footer').innerHTML = resolve;
        },
        (reject) => {
            alert(reject);
        }
    )

}