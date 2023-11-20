
function get_content_style(section) {
    // we just catch a few 
    let cstyle = window.getComputedStyle(section);
    let style = '';
    if( cstyle.textAlign !== '') style += 'text-align:' + cstyle.textAlign;
    return style;
}

function get_content_position(section) {
    let container = document.getElementById('content');
    let pos = 0;
    for( ; pos < container.childElementCount; pos++) {
        let child = container.children[pos];
        if( child.id === section.id ) {
            break;
        }
    }

    return pos;
}


function content_shadow() {
    alert('content_shadow');
}


var edit_target = null;
function attach_editor(element) {

    edit_target = element;
    edit_target.classList.add('active-section');
    edit_target.contentEditable = true;

    init_user_tools();

    let btn_public = document.getElementById('cont-public');
    if( element.getAttribute('ispublic') === 'true' ) {
        if(!btn_public.classList.contains('active')) btn_public.classList.add('active');
    }
    else {
        if(btn_public.classList.contains('active')) btn_public.classList.remove('active');
    }


    ce_add_events();
    update_user_tools(edit_target);

    let images = edit_target.querySelectorAll('img');
    for( let i=0; i < images.length; i++ ) {
        let child = images[i];
        child.addEventListener( 'wheel', (e) => { resize_img_by_wheel(e); } );
    }
}


function detach_editor() {
    if (edit_target) {
        ce_remove_events();

        for( let i=0; i < edit_target.childElementCount; i++ ) {
            let child = edit_target.children[i];
            child.style.resize = 'none';
        }

        let btn_public = document.getElementById('cont-public');
        btn_public.classList.contains('active');

        edit_target.classList.remove('active-section');
        edit_target.contentEditable = false;
        edit_target = null;
        release_user_tools(edit_target);
    }
}

function ce_add_events() {
    if (edit_target === null) return;
    edit_target.addEventListener('click', ce_click);
    edit_target.addEventListener('mousedown', ce_mouse_down);
    edit_target.addEventListener('mouseup', ce_mouse_up);
    edit_target.addEventListener('mousemove', ce_mouse_move);
    edit_target.addEventListener('mouseleave', ce_mouse_leave);
    edit_target.addEventListener('mouseenter', ce_mouse_enter);
    edit_target.addEventListener('keydown', ce_keydown);
    edit_target.addEventListener('keyup', ce_keyup);
}

function ce_remove_events() {
    if (edit_target === null) return;
    edit_target.removeEventListener('click', ce_click);
    edit_target.removeEventListener('mousedown', ce_mouse_down);
    edit_target.removeEventListener('mouseup', ce_mouse_up);
    edit_target.removeEventListener('mousemove', ce_mouse_move);
    edit_target.removeEventListener('mouseleave', ce_mouse_leave);
    edit_target.removeEventListener('mouseenter', ce_mouse_enter);
    edit_target.removeEventListener('keydown', ce_keydown);
    edit_target.removeEventListener('keyup', ce_keyup);
}

function ce_click(e) {
   
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

    let tagName = '#text';
    if (is_valid(node.parentNode)) {
        tagName = node.parentNode.nodeName;
    }

    set_tool_state('ust-bold', tagName === 'STRONG' ? 'active' : 'normal');
    set_tool_state('ust-italic', tagName === 'EM' ? 'active' : 'normal');
    set_tool_state('ust-mark', tagName === 'H2' ? 'active' : 'normal');

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

function ce_mouse_down(e) {
}

function ce_mouse_up(e) {
}

function ce_mouse_move(e) {
}

function ce_mouse_leave(e) {
}

function ce_mouse_enter(e) {
}

function ce_keydown(e) {
}

function ce_keyup(e) {
}





function content_editor_mousedown(e) {

}

function content_editor_mousedown(e) {

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

