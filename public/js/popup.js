
var popupForm = '';

function popup(title, message) {
    if( popupForm.length > 0 ) return ;
    webForm('popup', {
        title: title,
        message: message
    }). 
    then( (formname ) => { popupForm = formname;} );
}

function closePopup() {
    closeForm(popupForm);
    popupForm = '';
}