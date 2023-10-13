

const GETVALUE_VALUE = 'getvalue-value';

function getValue(title, label, type, value, onApply ) {

    return new Promise( (resolve, _reject) => {
        webForm('getvalue',  {
            id: 'gv' + random_int(),
            title: title,
            label: label,
            type: type,
            value: value,
            callback: onApply
        }). 
        then( (formname) => { 
            resolve( formname );
        });

    });
}

function onCloseGetValue(id) {
    closeForm(id);
}


