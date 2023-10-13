
function webForm(formName, args = null) {
    if( document.querySelector(formName) ) return;
    
    let request = new Request(formName, args);
    request.send().then(
        (res) => {
            if (res.status === 'ok') {
                let formId = 'fm-' + formName;
                openForm(formName, res.content);
            }
            else {
                alert(res.content);
            }
        },
        (error) => {
            alert(error);
        }
    );
}