var curAttachment = null;
function attachEditor(block) {
    
    if( block === curAttachment ) return;
    if( document.getElementById('page-author') === 'false') return;
    
    Cookie.selectedBlockId=block.id;
    curAttachment = block;
    block.contentEditable = true;
    block.addEventListener('click', onEditorClick);

    getTools().then( 
        (ok) => { document.getElementById('block-public').checked = block.getAttribute('pub') === 'true'; }
    );
    
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
    for( let i=0; i < element.childElementCount; i++) {
        addBorders(element.children[i]);
    }
}

function removeBorders(element) {
    element.style.border = 'none';
    for( let i=0; i < element.childElementCount; i++) {
        removeBorders(element.children[i]);
    }
}


var curSelection = null;;
function addEditorEvents(element) {

    // element.addEventListener('click', (e) => {
        
    //     if (curSelection) {
    //         curSelection.style.outline = 'none';
    //         curSelection.style.height = 'auto';
    //     }
    //     curSelection = e.target;
    //     curSelection.style.outline = '1px solid red';
    // });

    // for (let i = 0; i < element.childElementCount; i++) {
    //     addEditorEvents(element.children[i]);
    // }
}

function removeEditorEvents(element) {
    element.removeEventListener('click', (e) => {} );
    element.style.outline = 'none';
    for (let i = 0; i < element.childElementCount; i++) {
        removeEditorEvents(element.children[i]);
    }
}

function detachEditor(block) {
    let tools = block.querySelector('#tools');
    if (tools) {
        tools.innerHTML = '';
        tools.style.dislay = 'none';
    }
    removeEditorEvents(block);
    removeBorders(block);
    block.contentEditable = false;


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

    let main = document.querySelector('main');
    for (let i = 0; i < main.childElementCount; i++) {
        let child = main.children[i];
        if (child.classList.contains('block-active')) {
            child.classList.remove('block-active');
        }
    }

    let block = document.getElementById(Cookie.selectedBlockId);
    block.classList.add('block-active');

    getSelectedNode(0, block.childNodes).then(
        (resolve) => {
            let toolName = resolve.nodeType.toLowerCase();
            Cookie.selectedChildId = resolve.id;
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

    let block = document.getElementById(Cookie.selectedBlockId);
    getSelectedNode(0, block.childNodes).then(
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
    let block = document.getElementById(Cookie.selectedBlockId);
    if (dir > 0) {
        if (block.previousElementSibling)
            block.parentNode.insertBefore(block, block.previousElementSibling);
    }
    else {
        if (block.nextElementSibling)
            block.parentNode.insertBefore(block.nextElementSibling, block);
    }
}

function onFontSize(value) {
    let block = document.getElementById(Cookie.selectedBlockId);
    let fsize = parseFloat(block.style.fontSize);
    if (isNaN(fsize) || fsize === 0) {
        fsize = parseFloat(get_style('fontsize'))
    }

    let newFsize = fsize + (value < 0 ? (-FONTSIZE_STEP) : (FONTSIZE_STEP));
    if (newFsize >= MIN_FONTSIZE && newFsize < MAX_FONTSIZE) {
        block.style.fontSize = newFsize + 'em';
    }
}

function onAlign(arg) {
    let block = document.getElementById(Cookie.selectedBlockId);
    if (Cookie.selectedChildId) {
        let child = document.getElementById(Cookie.selectedChildId);
        switch (arg) {
            case 'left':
                child.style.marginLeft = '0px';
                break;
            case 'center':
                child.style.marginLeft = ((block.clientWidth - child.clientWidth) / 2) + 'px';
                break;
            case 'right':
                child.style.marginLeft = (block.clientWidth - child.clientWidth - SHADOW_DISTANCE) + 'px';
                break;
        }

    } else if (Cookie.selectedBlockId) {
        let block = document.getElementById(Cookie.selectedBlockId);
        block.style.textAlign = arg;
    }
}

function onHorizontalRule() {
    let block = document.getElementById(Cookie.selectedBlockId);
    block.innerHTML += '<hr>';
    moveCursorToEnd(block);
}

var weblinkForm = '';
function onLink() {
    webForm('weblink', {
        text: getSelectedText(),
        cursorPos: getCaretPosition()
    }).
        then((formname) => { weblinkForm = formname; });
}

function onWeblinkApply(cursorPos) {

    document.getElementById(Cookie.selectedBlockId).focus();

    let text = document.getElementById('weblink-text').value;
    let url = document.getElementById('weblink-url').value;
    let a = document.createElement('a');
    a.classList.add('weblink');
    a.href = url;
    a.innerHTML = text;
    setCaretPosition(cursorPos);
    insertElement(a);
    closeForm(weblinkForm);
}

function onWeblinkClose() {
    closeForm(weblinkForm);
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

function moveCursorToEnd(block) {
    block.focus();

    const range = document.createRange();
    range.selectNodeContents(block);
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
    const block = document.getElementById(Cookie.selectedBlockId);
    let caretPos = 0;
    const sel = window.getSelection();


    if (sel.rangeCount > 0) {
        const range = sel.getRangeAt(0);
        const preCaretRange = range.cloneRange();
        preCaretRange.selectNodeContents(block);
        preCaretRange.setEnd(range.endContainer, range.endOffset);
        caretPos = preCaretRange.toString().length;
    }
    return caretPos;
}

function setCaretPosition(pos) {

    let block = document.getElementById(Cookie.selectedBlockId);

    var range = document.createRange();
    var selection = window.getSelection();

    // Set the Range to start and end at a specific position within the div
    // In this example, we'll set the caret position to the end of the text

    range.setStartAfter(block, 0);
    range.setEndAfter(block, pos);

    // Remove any existing selections
    selection.removeAllRanges();

    // Add the new Range to the Selection
    selection.addRange(range);

    // Focus the editable div to show the caret
    block.focus();
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
    const div = document.getElementById(Cookie.selectedBlockId);

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
