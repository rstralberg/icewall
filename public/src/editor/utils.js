
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

