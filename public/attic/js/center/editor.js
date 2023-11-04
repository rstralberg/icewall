var EditorTarget;
var EditorFocus;
var EditorSelection;
;
function attachEditor(content) {
    if (content === EditorTarget)
        return;
    if (eGet('page-author') === null)
        return;
    Session.selected = content.id;
    Session.selectedChild = '';
    EditorFocus = null;
    EditorSelection = null;
    ;
    EditorTarget = content;
    content.contentEditable = 'true';
    Session.edit = true;
    content.addEventListener('click', onEditorClick);
    updateContentPublicIndicator(Session.selected);
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
        tools.style.display = 'none';
    }
    removeEditorEvents(content);
    removeBorders(content);
    content.contentEditable = 'false';
    Session.edit = false;
    Session.selected = '';
    Session.selectedChild = '';
    EditorFocus = null;
    EditorSelection = null;
}
function updateContentPublicIndicator(content) {
    if (content !== null) {
        getContentPublic(content).then((pub) => {
            let element = document.getElementById('lt-public');
            element.innerText = pub === '1' ? 'Publik' : 'Intern';
            element.style.color = pub === '1' ? 'green' : 'red';
        }, () => { });
    }
}
function hideEditor() {
    let tools = eGet('#tools');
    if (tools) {
        tools.style.display = 'none';
    }
}
function addEditorEvents(element) {
    element.addEventListener('mouseenter', (e) => {
        if (EditorFocus) {
            EditorFocus.style.outline = 'none';
        }
        EditorFocus = element;
        if (EditorFocus)
            EditorFocus.style.outline = '1px solid ' + getStyle('bgInputHover');
    });
    element.addEventListener('mouseleave', (e) => {
        element.style.outline = 'none';
        EditorFocus = null;
    });
    element.addEventListener('mousedown', (e) => {
        if (element.tagName !== 'SECTION') {
            if (EditorFocus)
                EditorFocus.style.outline = '3px solid ' + getStyle('bgInputHover');
            EditorSelection = element;
        }
    });
    for (let i = 0; i < element.childElementCount; i++) {
        addEditorEvents(element.children[i]);
    }
}
function onEditorClick() {
    let content = document.querySelector('.center');
    for (let i = 0; i < content.childElementCount; i++) {
        let child = content.children[i];
        if (child.classList.contains('center-active')) {
            child.classList.remove('center-active');
        }
    }
    if (Session.selected) {
        content = Session.selected;
        if (content === null)
            return;
    }
    content.classList.add('center-active');
    getSelectedNode(0, content.childNodes).then((resolve) => {
        let toolName = resolve.nodeType.toLowerCase();
        //Session.selectedChild = resolve.nodeNumber;
        switch (toolName) {
            case 'h1':
            case 'strong':
            case 'em':
                updateTool(toolName, true);
                break;
        }
    }, (reject) => { });
}
function onClear() {
    let content = Session.selected;
    if (content === null)
        return;
    getSelectedNode(0, content.childNodes).then((reply) => {
        if (reply === null)
            return;
        if (reply.node === null)
            return;
        if (reply.node.parentElement === null)
            return;
        if (reply.node.parentElement.childNodes === null)
            return;
        let e = reply.node.parentElement.childNodes[reply.nodeNumber];
        let target = reply.node;
        e.outerHTML = target.innerHTML;
        target.innerHTML = target.innerText;
        updateTool(reply.nodeType.toLowerCase(), false);
    }, (reject) => { });
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
