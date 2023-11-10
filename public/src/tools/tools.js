
function set_tool_state(toolId, state) {
    let tool = query_id(toolId);
    if (is_valid(tool)) {
        switch (state) {
            case 'normal': enable_tool(tool); break;
            case 'active': activate_tool(tool); break;
            case 'disabled': disable_tool(tool); break;
        }
    }
}

function get_tool_state(toolId) {
    let tool = query_id(toolId);
    if (is_valid(tool)) {
        if (tool.classList.contains('tool-normal')) return 'normal';
        if (tool.classList.contains('tool-active')) return 'active';
        if (tool.classList.contains('tool-disabled')) return 'disabled';
    }
    return 'undefined';
}

function disable_tool(element) {
    element.setAttribute('disabled', '');
}

function enable_tool(element) {
    element.removeAttribute('disabled');
}

function activate_tool(element) {
    element.removeAttribute('disabled');
    element.setAttribute('active', '');
}
