
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