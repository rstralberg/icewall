
function on_format_content(arg) {
    hide_content_pop();
    if( !is_valid(cur_element) ) return;
    
    switch (arg) {
        case 'normal': break;

        case 'bold': toggle_tag('strong'); break;
        case 'italic': toggle_tag('em'); break;
        case 'mark': toggle_tag('h2'); break;

        case 'align-left':
            if( cur_element.tagName === 'IMG') align_image(cur_element, 'left');
            break;

        case 'align-center':
            if( cur_element.tagName === 'IMG') align_image(cur_element, 'center');
            break;

        case 'align-right':
            if( cur_element.tagName === 'IMG') align_image(cur_element, 'right');
            break;

        case 'shadows':
            if( is_valid(cur_element) ) {
                cur_element.classList.add('shadow');
            }
            break;
    }
}

function align_image(element, align) {
    if( !is_valid(element)) return;
    if( !is_valid(element.parentElement)) return;
    if( !is_valid(element.parentElement.parentElement)) return;
    element.parentElement.parentElement.style.textAlign = align;

}


function toggle_tag(tagName) {

    let selection = window.getSelection();
    if (selection.rangeCount === 0) return;

    let range = selection.getRangeAt(0);
    let node = null;
    if (range.startContainer === range.endContainer) {
        node = range.startContainer;
    }
    else {
        node = range.startContainer.nextSibling;
    }

    tagName = tagName.toUpperCase();
    if (is_valid(node.parentNode) && node.parentNode.nodeName === tagName ) {
        let tagElement = node.parentElement;
        let textNode = tagElement.firstChild;
        tagElement.parentNode.replaceChild(textNode, tagElement);
    }
    else {
        let tagElement = document.createElement(tagName);
        range.surroundContents(tagElement);
    }
}

function clear_tags() {
    let selection = window.getSelection();
    if (selection.rangeCount === 0) return;

    let range = selection.getRangeAt(0);
    let node = null;
    if (range.startContainer === range.endContainer) {
        node = range.startContainer;
    }
    else {
        node = range.startContainer.nextSibling;
    }

    if (is_valid(node.parentNode) && node.parentNode.nodeName !== '#text' ) {
        let tagElement = node.parentElement;
        let textNode = tagElement.firstChild;
        tagElement.parentNode.replaceChild(textNode, tagElement);
    }
}   
