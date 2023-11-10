
function replace_between_tags(inputString, startTag, endTag, newText) {
    var regex = new RegExp(`(${startTag})(.*?)(?=${endTag})`);
    return inputString.replace(regex, `$1${newText}`);
}
