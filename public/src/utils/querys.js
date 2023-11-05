

function query( tag ) {
    let e = document.querySelector(tag);
    if( e ) return e;
    else alert( 'Can\'t find element tag ' + tag );
}

function query_id( id ) {
    let e = document.querySelector('#'+id);
    if( e ) return e;
    else alert( 'Can\'t find element id ' + id );
}

function query_class( cls ) {
    let e = document.querySelector('.'+cls);
    if( e ) return e;
    else alert( 'Can\'t find element class ' + cls );
}

function query_value( id ) {
    return query_id(id).value;
}

function query_src( id ) {
    return query_id(id).src;
}

function query_text( id ) {
    return query_id(id).innerText;
}

function query_html( id ) {
    return query_id(id).innerHTML;
}

function query_checked(id) {
    return query_id(id).checked;
}

function query_style( id ) {
    return query_id(id).style;
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

