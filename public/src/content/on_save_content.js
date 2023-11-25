
function section_clean_up(element) {
    if( element.childElementCount === 0 ) return;
    
    for ( let child of element.children ) {
        if (child.tagName === 'H1') {
            child.style.outline = '1px solid ' + get_style('linkFg');
        }
        else {
            child.style.outline = 'none';
        }

        child.style.border = null;
        child.contentEditable = false;
        child.style.resize = null;
        if ( child.childElementCount > 0  ) {
            section_clean_up(child);
        }
    }
}


function get_content_style(section) {
    // we just catch a few 
    let cstyle = window.getComputedStyle(section);
    let style = '';
    if (cstyle.textAlign !== '') style += 'text-align:' + cstyle.textAlign;
    return style;
}

function get_content_position(section) {
    let container = document.getElementById('content');
    let pos = 0;
    for (; pos < container.childElementCount; pos++) {
        let child = container.children[pos];
        if (child.id === section.id) {
            break;
        }
    }
    return pos;
}


function on_save_content() {

    let section = get_session_selection();
    section_clean_up(section);

    for( let i=0; i < section.childElementCount; i++ ) {
        let child = section.children[i];
        if( child.tagName !== 'ARTICLE') {
            section.removeChild(child);
        } else {
            if( child.childElementCount === 1 && child.firstChild.tagName === 'BR' )
                section.removeChild(child);
        }
    }


    let isPublic = section.getAttribute('ispublic') === 'true';
    
    let bg = section.style.backgroundColor;
    section.style.backgroundColor = 'red';
    server('content/update_content', {
        id: section.id.substr(1),
        pos: get_content_position(section),
        style: get_content_style(section),
        html: section.innerHTML,
        isPublic: isPublic
    }).then(
        () => {
            section.style.backgroundColor = bg;
        }
    );

}