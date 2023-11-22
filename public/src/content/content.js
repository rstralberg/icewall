
function get_content_style(section) {
    // we just catch a few 
    let cstyle = window.getComputedStyle(section);
    let style = '';
    if (cstyle.textAlign !== '') style += 'text-align:' + cstyle.textAlign;
    return style;
}

function get_content_position(section) {
    let container = document.getElementById('content');
    let pos = 0;
    for (; pos < container.childElementCount; pos++) {
        let child = container.children[pos];
        if (child.id === section.id) {
            break;
        }
    }

    return pos;
}


function content_shadow() {
    if (!is_valid(cur_element)) {
        cur_element.classList.add('shadow');
    }
}


//  ===================================================
//  Attach editing possibilites to selected section
//  ===================================================
var edit_target = null;
var cur_element = null;
function attach_editor(element) {

    edit_target = element;
    edit_target.classList.add('active-section');
    edit_target.contentEditable = true;
    // enable_content_tools(true);

    // let btn_public = document.getElementById('cont-public');
    // if (element.getAttribute('ispublic') === 'true') {
    //     if (!btn_public.classList.contains('active')) btn_public.classList.add('active');
    // }
    // else {
    //     if (btn_public.classList.contains('active')) btn_public.classList.remove('active');
    // }

    // update_content_tools(edit_target);
    add_borders(edit_target);

    let images = edit_target.querySelectorAll('img');
    for (let i = 0; i < images.length; i++) {
        let child = images[i];
        child.addEventListener('wheel', (e) => { resize_img_by_wheel(e); });
    }
}

function add_events(element) {
    // element.addEventListener('mouseenter', (e) => {
    //     // e.target.style.border = '1px dashed ' + get_style('contentFg');
    // });
    // element.addEventListener('mouseleave', (e) => {
    //     // e.target.style.border = 'none';
    // });
    // element.addEventListener( 'mouseup', (e) => { 
    //     e.preventDefault();
    //     console.log(e.button);
    //     if( e.button === 2)

    //     show_content_pop(e); 
    // } );

    element.addEventListener('click', (e) => {
        if (is_valid(cur_element)) {
            cur_element.style.outline = 'none';
            // set_tool_state('cont-text', 'normal');
            // set_tool_state('cont-bold', 'normal');
            // set_tool_state('cont-italic', 'normal');
            // set_tool_state('cont-mark', 'normal');
            // set_tool_state('cont-weblink', 'normal');
            // set_tool_state('cont-image', 'normal');
            // set_tool_state('cont-title', 'normal');
            // set_tool_state('cont-alignleft', 'normal');
            // set_tool_state('cont-aligncenter', 'normal');
            // set_tool_state('cont-alignright', 'normal');
        }
        cur_element = e.target;
        cur_element.style.outline = '2px solid ' + get_style('linkFg');
        // if (cur_element.tagName === 'STRONG') set_tool_state('cont-bold', 'active');
        // if (cur_element.tagName === 'EM') set_tool_state('cont-italic', 'active');
        // if (cur_element.tagName === 'H2') set_tool_state('cont-mark', 'active');
        // if (cur_element.tagName === 'A') set_tool_state('cont-weblink', 'active');
        // if (cur_element.tagName === 'IMG') set_tool_state('cont-image', 'active');
        // if (cur_element.tagName === 'H1') set_tool_state('cont-title', 'active');
        // if (cur_element.tagName === 'P') set_tool_state('cont-text', 'active');

        // if (cur_element.tagName === 'IMG' &&  
        //     is_valid(cur_element.parentElement) &&
        //     is_valid(cur_element.parentElement.parentElement) &&
        //     is_valid(cur_element.parentElement.parentElement.style.textAlign)) {
        //     let e = cur_element.parentElement.parentElement;
        //     if (e.style.textAlign === 'left') set_tool_state('cont-alignleft', 'active');
        //     if (e.style.textAlign === 'center') set_tool_state('cont-aligncenter', 'active');
        //     if (e.style.textAlign === 'right') set_tool_state('cont-alignright', 'active');
        // } 

    })
}

function add_borders(container) {

    add_events(container);
    for (let i = 0; i < container.childElementCount; i++) {
        let child = container.children[i];
        add_events(child);

        if (child.childElementCount > 0) {
            add_borders(child);
        }
    }
}

function remove_events(element) {
    if (element.tagName === 'H1') {
        element.style.outline = '1px solid ' + get_style('linkFg');
    }
    else {
        element.style.outline = 'none';
    }
    element.style.border = 'none';
    element.removeEventListener('contextmenu', (e) => { } );
    // element.removeEventListener('mouseenter', (e) => { });
    // element.removeEventListener('mouseleave', (e) => { });
    element.removeEventListener('click', (e) => { });
}

function remove_borders(container) {
    remove_events(container);
    for (let i = 0; i < container.childElementCount; i++) {
        let child = container.children[i];
        remove_events(child);

        if (child.childElementCount > 0) {
            remove_borders(child);
        }
    }
}

function detach_editor() {
    if (edit_target) {

        for (let i = 0; i < edit_target.childElementCount; i++) {
            let child = edit_target.children[i];
            child.style.resize = 'none';
        }

        let btn_public = document.getElementById('cont-public');
        btn_public.classList.contains('active');

        remove_borders(edit_target);
        edit_target.classList.remove('active-section');
        edit_target.contentEditable = false;
        edit_target = null;
        cur_element = null;
        enable_content_tools(false);
    }
}

function get_selected_node() {
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
    return node;
}

function get_caret_pos() {
    let pos = 0;
    const sel = window.getSelection();
    if (sel.rangeCount > 0) {
        const range = sel.getRangeAt(0);
        const preCaretRange = range.cloneRange();
        preCaretRange.selectNodeContents(get_session_selection());
        preCaretRange.setEnd(range.endContainer, range.endOffset);
        pos = preCaretRange.toString().length;
    }
    return pos;
}


