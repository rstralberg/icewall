//  ===============================================
//  Support for php/framework/right/html/editSettings.html
//  ===============================================
function editSettings() {
    webForm('editSettings', []);
}
function closeEditSettings() {
    closeForm('editSettings');
}
function esLogo() {
    const imageInput = eGet('#es-logo');
    if (imageInput === null)
        return;
    if (imageInput.files === null)
        return;
    if (imageInput.files.length > 0) {
        const selectedImage = imageInput.files[0];
        const maxWidth = IMAGE_MAX_WIDTH;
        uploadImage(selectedImage, imageInput.value, maxWidth).then((resolve) => { eSetSrc('#es-image', addImagePath(resolve)); }, (reject) => { error(reject); });
    }
}
function esSave() {
    let request = new SrvReq('sql', [
        { key: 'command', value: 'update' },
        { key: 'table', value: 'settings' },
        { key: 'cols', value: ['name', 'url', 'owner', 'logo', 'admin', 'email'] },
        { key: 'values', value: [
                surround(eGetValue('#es-name'), '\''),
                surround(eGetValue('#es-url'), '\''),
                surround(eGetValue('#es-owner'), '\''),
                surround(filenameOnly(eGetSrc('#es-image')), '\''),
                surround(eGetValue('#es-admin'), '\''),
                surround(eGetValue('#es-email'), '\'')
            ] },
        { key: 'where', value: 'id=1' }
    ]);
    request.send().then((reply) => { popup('Instälningarn har sparats'); }, (err) => { error(err); });
}
