const EDIT_SETTINGS_LOGO = 'editsettings-logo';
const EDIT_SETTINGS_FILE = 'editsettings-logo-file';
const EDIT_SETTINGS_NAME = 'editsettings-name';
const EDIT_SETTINGS_OWNER = 'editsettings-owner';
function onEditSettings() {
    webForm('editSettings', []);
}
function settingImageSelected() {
    const imageInput = document.getElementById(EDIT_SETTINGS_FILE);
    if (imageInput === null)
        return;
    if (imageInput.files === null)
        return;
    if (imageInput.files.length === 0)
        return;
    const selectedImage = imageInput.files[0];
    const maxWidth = IMAGE_MAX_WIDTH;
    uploadImage(selectedImage, imageInput.value, maxWidth).then((resolve) => { eSetSrc(EDIT_SETTINGS_LOGO, resolve); }, (reject) => { error(reject); });
}
function saveSettings() {
    updateSettings(eGetSrc(EDIT_SETTINGS_LOGO), eGetValue(EDIT_SETTINGS_NAME), eGetValue(EDIT_SETTINGS_OWNER));
    closeEditSettings();
}
// function closeEditSettings() {
//     closeForm('editSettings');
// }
