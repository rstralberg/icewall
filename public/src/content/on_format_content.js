
function on_format_content(arg) {
    
    if( !is_valid(cur_article) ) return;
    
    switch (arg) {
        case 'bold': 
            toggle_tag('strong'); 
            break;
        
        case 'italic': 
            toggle_tag('em'); 
            break;

        case 'mark': 
            toggle_tag('h2'); 
            break;

        case 'align-left':
            if( cur_article.tagName === 'IMG') align_image(cur_article, 'left');
            break;

        case 'align-center':
            if( cur_article.tagName === 'IMG') align_image(cur_article, 'center');
            break;

        case 'align-right':
            if( cur_article.tagName === 'IMG') align_image(cur_article, 'right');
            break;

        case 'shadows':
            toggle_class(cur_article, 'shadow');
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
    if( !is_valid(range) ) return;
    
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

