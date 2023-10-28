const GETVALUE_VALUE = 'getvalue-value';
function getValue(title, label, type, value, onApply, opt) {
    return new Promise((resolve, _reject) => {
        webForm('getvalue', [
            { key: 'title', value: title },
            { key: 'label', value: label },
            { key: 'type', value: type },
            { key: 'value', value: value },
            { key: 'callback', value: onApply },
            { key: 'opt', value: opt },
        ]);
    });
}
function getTheValue() {
    let value = eGetValue(GETVALUE_VALUE);
    closeGetValue();
    return value;
}
function closeGetValue() {
    closeForm('getvalue');
}
