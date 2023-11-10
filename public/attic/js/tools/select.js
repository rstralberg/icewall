//  ============================================================
//  Some function to handle text selections
//  in a DIV with contentEditable set to true
//  ============================================================
//  Note! A bit shaky and untested
function getSelectedText() {
    let selectedText = "";
    if (window.getSelection) {
        let selection = window.getSelection();
        if (selection)
            selectedText = selection.toString();
    }
    else {
        let selection = document.getSelection();
        if (selection) {
            // if (selection.type != "Control") selectedText = document.createTextNode();
        }
    }
    return selectedText;
}
function replaceSelectedText(newText) {
    let selection = window.getSelection();
    if (selection) {
        if (selection.rangeCount > 0) {
            var range = selection.getRangeAt(0);
            range.deleteContents();
            range.insertNode(document.createTextNode(newText));
        }
    }
}
function moveCursorToEnd(content) {
    content.focus();
    const range = document.createRange();
    range.selectNodeContents(content);
    range.collapse(false);
    const selection = window.getSelection();
    if (selection) {
        selection.removeAllRanges();
        selection.addRange(range);
    }
}
function insertElement(element, at) {
    const selection = window.getSelection();
    if (selection === null)
        return;
    if (selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        // Insert the element at the current cursor position
        range.insertNode(element);
        // Move the cursor to the end of the inserted element
        range.setStartAfter(element);
        range.collapse(true);
        // Update the selection
        selection.removeAllRanges();
        selection.addRange(range);
    }
}
function get_caret_pos() {
    const content = Session.selected;
    if (content === null)
        return false;
    let caretPos = 0;
    const sel = window.getSelection();
    if (sel === null)
        return false;
    if (sel.rangeCount > 0) {
        const range = sel.getRangeAt(0);
        const preCaretRange = range.cloneRange();
        preCaretRange.selectNodeContents(content);
        preCaretRange.setEnd(range.endContainer, range.endOffset);
        caretPos = preCaretRange.toString().length;
    }
    return caretPos;
}
function setCaretPosition(pos) {
    let content = Session.selected;
    if (content === null)
        return;
    let range = document.createRange();
    let selection = window.getSelection();
    if (selection === null)
        return;
    // Set the Range to start and end at a specific position within the div
    // In this example, we'll set the caret position to the end of the text
    // range.setStartAfter(content, 0);
    // range.setEndAfter(content, pos);
    // Remove any existing selections
    selection.removeAllRanges();
    // Add the new Range to the Selection
    selection.addRange(range);
    // Focus the editable div to show the caret
    content.focus();
}
function getSelectedNode(start, nodes) {
    return new Promise((resolve, reject) => {
        let caretPos = get_caret_pos();
        let nodeNumber = 0;
        let end = 0;
        nodes.forEach(node => {
            let type = node.nodeType;
            switch (type) {
                case 1:
                    end = start + (node.textContent !== null ? node.textContent.length : 0);
                    if (caretPos >= start && caretPos < end) {
                        resolve({
                            node: node,
                            nodeNumber: nodeNumber,
                            nodeType: node.nodeName,
                            nodeText: node.textContent,
                            nodeStart: start,
                            nodeEnd: end,
                            caretPos: caretPos
                        });
                    }
                    if (node.childNodes.length > 0) {
                        getSelectedNode(start, node.childNodes);
                    }
                    start += node.textContent ? node.textContent.length : 0;
                    break;
                case 3:
                    end = start + Object.keys(node).length;
                    if (caretPos >= start && caretPos < end) {
                        resolve({
                            node: node,
                            nodeNumber: nodeNumber,
                            nodeType: node.nodeName,
                            nodeText: node.textContent,
                            nodeStart: start,
                            nodeEnd: end,
                            caretPos: caretPos
                        });
                    }
                    start += Object.keys(node).length;
                    if (node.childNodes.length > 0) {
                        getSelectedNode(start, node.childNodes);
                    }
                    break;
            }
            nodeNumber++;
        });
    });
}
function selectText(startPos, endPos) {
    const div = Session.selected;
    if (div && div.childNodes.length > 0) {
        const textNode = div.childNodes[0]; // Assuming the text is a direct child
        const range = document.createRange();
        const selection = window.getSelection();
        if (selection === null)
            return;
        range.setStart(textNode, startPos);
        range.setEnd(textNode, endPos);
        selection.removeAllRanges();
        selection.addRange(range);
    }
}
