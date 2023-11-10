

function query( tag ) {
    let e = document.querySelector(tag);
    if( is_valid(e) ) return e;
    else alert( 'Can\'t find element tag ' + tag );
}

function query_id( id ) {
    let e = document.querySelector('#'+id);
    if( is_valid(e) ) return e;
    else alert( 'Can\'t find element id ' + id );
}

function query_class( cls ) {
    let e = document.querySelector('.'+cls);
    if( is_valid(e) ) return e;
    else alert( 'Can\'t find element class ' + cls );
}

function query_value( id ) {
    return query_id(id).value;
}

function enable_element(id, enable) {
    if( enable ) query_id(id).removeAttribute('disabled');
    else query_id(id).setAttribute('disabled','');
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

