
function set_tool_state(toolId, state) {
    let tool = document.getElementById(toolId);
    if (is_valid(tool)) {
        switch (state) {
            case 'normal': 
                enable_tool(tool); 
                if (!tool.classList.contains('tool-normal')) tool.classList.add('tool-normal');
                if (tool.classList.contains('tool-active')) tool.classList.remove('tool-active');
                if (tool.classList.contains('tool-disabled')) tool.classList.remove('tool-disabled');
                 break;
            
            case 'active': 
                activate_tool(tool); 
                if (tool.classList.contains('tool-normal')) tool.classList.remove('tool-normal');
                if (!tool.classList.contains('tool-active')) tool.classList.add('tool-active');
                if (tool.classList.contains('tool-disabled')) tool.classList.remove('tool-disabled');

                break;

            case 'disabled': 
                disable_tool(tool); 
                if (tool.classList.contains('tool-normal')) tool.classList.remove('tool-normal');
                if (tool.classList.contains('tool-active')) tool.classList.remove('tool-active');
                if (!tool.classList.contains('tool-disabled')) tool.classList.add('tool-disabled');
                break;
        }
    }
}

function get_tool_state(toolId) {
    let tool = document.getElementById(toolId);
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
