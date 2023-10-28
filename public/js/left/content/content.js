//  ===================================================
//  Supports /php/framework/left/html/content.html
//  ===================================================
//  ---------------------------------------------------
//  Make current selecion bold
//  ---------------------------------------------------
function strong() {
    const boldEl = document.createElement('strong');
    const textSelection = window.getSelection();
    textSelection.getRangeAt(0).surroundContents(boldEl);
}
//  ---------------------------------------------------
//  Make current selecion italic
//  ---------------------------------------------------
function em() {
    const boldEl = document.createElement('em');
    const textSelection = window.getSelection();
    textSelection.getRangeAt(0).surroundContents(boldEl);
}
//  ---------------------------------------------------
//  Change size of the font of selection
//  ---------------------------------------------------
function fontsizeUp() {
    changeFontSize(1);
}
function fontsizeDown() {
    changeFontSize(-1);
}
function changeFontSize(value) {
    let content = EditorSelection;
    if (content === null)
        return;
    let fsize = parseFloat(content.style.fontSize);
    if (isNaN(fsize) || fsize === 0) {
        fsize = parseFloat(getStyle('fontsize'));
    }
    let newFsize = fsize + (value < 0 ? (-FONTSIZE_STEP) : (FONTSIZE_STEP));
    if (newFsize >= MIN_FONTSIZE && newFsize < MAX_FONTSIZE) {
        EditorSelection.style.fontSize = newFsize + 'em';
    }
}
//  ---------------------------------------------------
//  Align current selectiion
//  ---------------------------------------------------
function alignLeft() {
    align('left');
}
function alignCenter() {
    align('center');
}
function alignRight() {
    align('right');
}
function align(arg) {
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
