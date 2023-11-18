
function replace_between_tags(inputString, startTag, endTag, newText) {
    var regex = new RegExp(`(${startTag})(.*?)(?=${endTag})`);
    return inputString.replace(regex, `$1${newText}`);
}

function surround(str, expr) {
    return expr + str + expr;
}

function cut_char_from_ends(str) {
    str.substr(1).slice(0, -1);
    return str;
}
