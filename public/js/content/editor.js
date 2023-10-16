
var curAttachment = null;
var curFocus = null;
var curSelection = null;;

function attachEditor(content) {

    if (content === curAttachment) return;
    if (document.getElementById('page-author') === 'false') return;

    Session.selected = content.id;
    Session.selectedChild = null;

    curFocus = null;
    curSelection = null;;
    
    curAttachment = content;
    content.contentEditable = true;
    content.addEventListener('click', onEditorClick);

    document.getElementById('content-public').checked = content.getAttribute('pub') === 'true';


    addEditorEvents(curAttachment);
    addBorders(curAttachment);
}

function hideEditor() {
    let tools = document.querySelector('#tools');
    if (tools) {
        tools.style.dislay = 'none';
    }
}

function addBorders(element) {
    element.style.border = '1px dashed ' + get_style('editFg');
    for (let i = 0; i < element.childElementCount; i++) {
        //addBorders(element.children[i]);
    }
}

function removeBorders(element) {
    element.style.border = 'none';
    for (let i = 0; i < element.childElementCount; i++) {
        removeBorders(element.children[i]);
    }
}

function addEditorEvents(element) {

    element.addEventListener('mouseenter', (e) => {
        if (curFocus) {
            curFocus.style.outline = 'none';
        }
        curFocus = element;
        curFocus.style.outline = '1px solid ' + get_style('bgHover');
    });

    element.addEventListener('mouseleave', (e) => {
        element.style.outline = 'none';
        curFocus = null;
    });

    element.addEventListener('mousedown', (e) => {
        if (element.tagName !== 'SECTION') {
            if( curFocus ) curFocus.style.outline = '3px solid ' + get_style('bgHover');
            curSelection = element;
        }
    });

    for (let i = 0; i < element.childElementCount; i++) {
        addEditorEvents(element.children[i]);
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

function detachEditor(content) {
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
    curFocus = null;
    curSelection = null;;

}

function onBold() {

    if (isToolActive('strong')) {
        onClear();
    }
    else {
        const boldEl = document.createElement('strong');
        const textSelection = window.getSelection();
        textSelection.getRangeAt(0).surroundContents(boldEl);
        updateTool('strong', true);
    }
}

function onItalic() {

    if (isToolActive('em')) {
        onClear();
    }
    else {
        const boldEl = document.createElement('em');
        const textSelection = window.getSelection();
        textSelection.getRangeAt(0).surroundContents(boldEl);
        updateTool('em', true);
    }
}

function onTitle() {
    if (isToolActive('h1')) {
        onClear();
    }
    else {
        const h1El = document.createElement('h1');
        const textSelection = window.getSelection();
        textSelection.getRangeAt(0).surroundContents(h1El);
        updateTool('h1', true);
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

function onMove(dir) {
    let content = Session.selected;
    if (content === null) return;

    let moved = false;
    if (dir > 0) {
        if (content.previousElementSibling) {
            content.parentNode.insertBefore(content, content.previousElementSibling);
            moved = true;
        }
    }
    else {
        if (content.nextElementSibling) {
            content.parentNode.insertBefore(content.nextElementSibling, content);
            moved = true;
        }
    }
    if (moved) {
        let positions = new Array();
        let container = document.querySelector('.content');
        for (let pos = 0; pos < container.childElementCount; pos++) {
            let child = container.children[pos];
            positions.push({
                id: parseInt(child.id.substring('sec-'.length)),
                pos: pos
            });
        }
        updateContentPositions(positions);
    }

}

function onEditFontSize(value) {
    let content = curSelection;
    if (content === null) return;

    let fsize = parseFloat(content.style.fontSize);
    if (isNaN(fsize) || fsize === 0) {
        fsize = parseFloat(get_style('fontsize'))
    }

    let newFsize = fsize + (value < 0 ? (-FONTSIZE_STEP) : (FONTSIZE_STEP));
    if (newFsize >= MIN_FONTSIZE && newFsize < MAX_FONTSIZE) {
        curSelection.style.fontSize = newFsize + 'em';
    }
}

function onAlign(arg) {
    let content = Session.selected;
    if (curSelection) {
        let w = content.clientWidth - curSelection.clientWidth;
        switch (arg) {
            case 'left':
                if (curSelection.tagName === 'FIGURE')
                    curSelection.style.marginLeft = '0px';
                else
                    curSelection.style.textAlign = 'left';
                break;
            case 'center':
                if (curSelection.tagName === 'FIGURE')
                    curSelection.style.marginLeft = Math.round(w / 2) + 'px';
                else
                    curSelection.style.textAlign = 'center';
                break;
            case 'right':
                if (curSelection.tagName === 'FIGURE')
                    curSelection.style.marginLeft = (w - SHADOW_DISTANCE) + 'px';
                else
                    curSelection.style.textAlign = 'right';
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

function onLink() {
    if (curSelection) {
        webForm('weblink', {
            text: getSelectedText(),
            cursorPos: getCaretPosition()
        });
    }
}

function saveWeblink(cursorPos) {

    if (curSelection) curSelection.focus();

    let text = document.getElementById('weblink-text').value;
    let url = document.getElementById('weblink-url').value;
    
    curSelection.innerHTML += '<a class="weblink" href="' + url + '" target="_blank">' + text + '<a>';
    closeWeblink();
}

function closeWeblink() {
    closeForm('weblink');
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

function onContentPublic(e) {
    updateContentPublic(Session.selected, e.checked);
}