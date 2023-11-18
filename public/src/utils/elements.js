

function enable_element(id, enable) {
    if( enable ) document.getElementById(id).removeAttribute('disabled');
    else document.getElementById(id).setAttribute('disabled','');
}

function toggle_display(element, expr = 'block') {
    if (element.style.display === 'none' || element.style.display === '')
        element.style.display = expr;
    else
        element.style.display = 'none';
}

function is_valid(v) {
    if( v===null) return false;
    if( typeof v === 'undefined' ) return false;
    if( typeof v === 'number' && isNaN(v) ) return false;
    return true;
}

