
var EditorTarget = null;
var EditorFocus = null;
var EditorSelection = null;;


function attachEditor(content) {

    if (content === EditorTarget) return;
    if (document.getElementById('page-author') === 'false') return;

    Session.selected = content.id;
    Session.selectedChild = null;

    EditorFocus = null;
    EditorSelection = null;;
    
    EditorTarget = content;
    content.contentEditable = true;
    content.addEventListener('click', onEditorClick);

    document.getElementById('content-public').checked = content.getAttribute('pub') === 'true';


    addEditorEvents(EditorTarget);
}

function detachEditor(content) {

    function removeBorders(element) {
        element.style.border = 'none';
        for (let i = 0; i < element.childElementCount; i++) {
            removeBorders(element.children[i]);
        }
    }

    function removeEditorEvents(element) {
        element.removeEventListener('click', (e) => { });
        element.removeEventListener('mouseenter', (e) => { });
        element.removeEventListener('mouseleave', (e) => { });
        element.removeEventListener('mousedown', (e) => { });
        element.removeEventListener('mouseup', (e) => { });
        element.removeEventListener('dblclick', (e) => { });
        element.style.outline = 'none';
        for (let i = 0; i < element.childElementCount; i++) {
            removeEditorEvents(element.children[i]);
        }
    }
    
    let tools = content.querySelector('#tools');
    if (tools) {
        tools.innerHTML = '';
        tools.style.dislay = 'none';
    }
    removeEditorEvents(content);
    removeBorders(content);
    content.contentEditable = false;
    Session.selected = null;
    Session.selectedChild = null;
    EditorFocus = null;
    EditorSelection = null;;

}

function hideEditor() {
    let tools = document.querySelector('#tools');
    if (tools) {
        tools.style.dislay = 'none';
    }
}

function addEditorEvents(element) {

    element.addEventListener('mouseenter', (e) => {
        if (EditorFocus) {
            EditorFocus.style.outline = 'none';
        }
        EditorFocus = element;
        EditorFocus.style.outline = '1px solid ' + get_style('bgHover');
    });

    element.addEventListener('mouseleave', (e) => {
        element.style.outline = 'none';
        EditorFocus = null;
    });

    element.addEventListener('mousedown', (e) => {
        if (element.tagName !== 'SECTION') {
            if( EditorFocus ) EditorFocus.style.outline = '3px solid ' + get_style('bgHover');
            EditorSelection = element;
        }
    });

    for (let i = 0; i < element.childElementCount; i++) {
        addEditorEvents(element.children[i]);
    }
}

function onEditorClick() {

    let content = document.querySelector('.content');
    for (let i = 0; i < content.childElementCount; i++) {
        let child = content.children[i];
        if (child.classList.contains('content-active')) {
            child.classList.remove('content-active');
        }
    }

    content = Session.selected;
    if (content === null) return;

    content.classList.add('content-active');

    getSelectedNode(0, content.childNodes).then(
        (resolve) => {
            let toolName = resolve.nodeType.toLowerCase();
            Session.selectedChild = resolve.id;
            switch (toolName) {
                case 'h1':
                case 'strong':
                case 'em':
                    updateTool(toolName, true);
                    break;
            }

        },
        (reject) => { }
    );

}

function onClear() {

    let content = Session.selected;
    if (content === null) return;

    getSelectedNode(0, content.childNodes).then(
        (resolve) => {
            resolve.node.parentElement.childNodes[resolve.nodeNumber].outerHTML = resolve.node.innerHTML;
            resolve.node.innerHTML = resolve.node.innerText;
            updateTool(resolve.nodeType.toLowerCase(), false);
        },
        (reject) => { }
    );
}

function updateTool(toolName, active) {
    let tool = document.getElementById(toolName);
    if (tool) {
        tool.classList.replace(active ? 'tool' : 'tool-active', active ? 'tool-active' : 'tool');
    }
}

function isToolActive(toolName) {
    let tool = document.getElementById(toolName);
    if (tool) {
        return tool.classList.contains('tool-active');
    }
}

function onAlign(arg) {
    let content = Session.selected;
    if (EditorSelection) {
        let w = content.clientWidth - EditorSelection.clientWidth;
        switch (arg) {
            case 'left':
                if (EditorSelection.tagName === 'FIGURE')
                    EditorSelection.style.marginLeft = '0px';
                else
                    EditorSelection.style.textAlign = 'left';
                break;
            case 'center':
                if (EditorSelection.tagName === 'FIGURE')
                    EditorSelection.style.marginLeft = Math.round(w / 2) + 'px';
                else
                    EditorSelection.style.textAlign = 'center';
                break;
            case 'right':
                if (EditorSelection.tagName === 'FIGURE')
                    EditorSelection.style.marginLeft = (w - SHADOW_DISTANCE) + 'px';
                else
                    EditorSelection.style.textAlign = 'right';
                break;
        }
    }
}

function onHorizontalRule() {
    let content = Session.selected;
    if (content) {
        content.innerHTML += '<hr>';
        moveCursorToEnd(content);
    }
}

function getSelectedText() {
    var selectedText = "";
    if (window.getSelection) {
        selectedText = window.getSelection().toString();
    } else if (document.selection && document.selection.type != "Control") {
        selectedText = document.selection.createRange().text;
    }
    return selectedText;
}

function replaceSelectedText(newText) {
    var selection = window.getSelection();
    if (selection.rangeCount > 0) {
        var range = selection.getRangeAt(0);
        range.deleteContents();
        range.insertNode(document.createTextNode(newText));
    }
}

function moveCursorToEnd(content) {
    content.focus();

    const range = document.createRange();
    range.selectNodeContents(content);
    range.collapse(false);

    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
}

function insertElement(element, at) {

    const selection = window.getSelection();

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

function getCaretPosition() {
    const content = Session.selected;
    if (content === null) return false;

    let caretPos = 0;
    const sel = window.getSelection();

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
    if (content === null) return;

    var range = document.createRange();
    var selection = window.getSelection();

    // Set the Range to start and end at a specific position within the div
    // In this example, we'll set the caret position to the end of the text

    range.setStartAfter(content, 0);
    range.setEndAfter(content, pos);

    // Remove any existing selections
    selection.removeAllRanges();

    // Add the new Range to the Selection
    selection.addRange(range);

    // Focus the editable div to show the caret
    content.focus();
}

function getSelectedNode(start, nodes) {
    return new Promise((resolve, reject) => {

        let caretPos = getCaretPosition();

        let nodeNumber = 0;
        let end = 0;
        nodes.forEach(node => {
            let type = node.nodeType;
            switch (type) {
                case 1:
                    end = start + node.textContent.length;

                    if (caretPos >= start && caretPos < end) {
                        resolve({
                            node: node,
                            nodeNumber: nodeNumber,
                            nodeType: node.nodeName,
                            nodeText: node.textContent,
                            nodeStart: start,
                            nodeEnd: end,
                            carePos: caretPos
                        });
                    }
                    if (node.childNodes.length > 0) {
                        getSelectedNode(start, node.childNodes);
                    }
                    start += +node.textContent.length;
                    break;
                case 3:
                    end = start + node.length;
                    if (caretPos >= start && caretPos < end) {
                        resolve({
                            node: node,
                            nodeNumber: nodeNumber,
                            nodeType: node.nodeName,
                            nodeText: node.textContent,
                            nodeStart: start,
                            nodeEnd: end,
                            carePos: caretPos
                        });
                    }
                    start += node.length;
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

        range.setStart(textNode, startPos);
        range.setEnd(textNode, endPos);

        selection.removeAllRanges();
        selection.addRange(range);
    }
}

