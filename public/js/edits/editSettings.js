

const EDIT_SETTINGS_LOGO = 'editsettings-logo';
const EDIT_SETTINGS_FILE = 'editsettings-logo-file';
const EDIT_SETTINGS_NAME = 'editsettings-name';
const EDIT_SETTINGS_OWNER = 'editsettings-owner';
const EDIT_SETTINGS_HOST = 'editsettings-host';
const EDIT_SETTINGS_UPDATE = 'updateSettings';

var editSettingsForm = '';

function onEditSettings() {
    if( editSettingsForm.length > 0 ) return;
    webForm('editSettings'). 
    then( (formname) => { editSettingsForm = formname; })
}


function onEditSettingsImageSelected() {

    const imageInput = document.getElementById(EDIT_SETTINGS_FILE);
    if (imageInput.files.length > 0) {
        const selectedImage = imageInput.files[0];
        const maxWidth = IMAGE_MAX_WIDTH;

        uploadImage(selectedImage, maxWidth, 'shared' ).then(
            (resolve) => {
                if (resolve.status === 'ok') {
                    document.getElementById(EDIT_SETTINGS_LOGO).src = resolve.content;
                }
            },
            (reject) => {
                popup('FEL', reject.content);
            }
        );
    }
}

function onEditSettingsApply() {

    updateSettings(
        document.getElementById(EDIT_SETTINGS_LOGO).src,
        document.getElementById(EDIT_SETTINGS_NAME).value,
        document.getElementById(EDIT_SETTINGS_OWNER).value,
        document.getElementById(EDIT_SETTINGS_HOST).value);
    closeForm(editSettingsForm);
    editSettingsForm = '';
}


function onEditSettingsClose() {
    closeForm(editSettingsForm);
    editSettingsForm = '';
}
 


