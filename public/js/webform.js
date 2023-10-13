
function webForm(formName, args = null) {

    return new Promise((resolve, reject) => {
        let request = new Request(formName, args);
        request.send().then(
            (res) => {
                if (res.status === 'ok') {
                    let formId = 'fm-' + random_int();
                    openForm(formId, res.content);
                    resolve(formId);
                }
                else {
                    alert(res.content);
                    reject();
                }
            },
            (error) => {
                alert(error);
                reject();
            }
        );
    });
}