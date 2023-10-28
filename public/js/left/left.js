/*  ==============================
    Events from Left sidebar
    ============================== */
function evDeleteContent() {
    let content = Session.selected;
    if (content === null)
        return;
    // deleteContent(content);
}
function evSaveContent() {
    let content = Session.selected;
    if (content === null)
        return;
    // saveContent(
    //     eGetText('lt-public') === 'Publik',
    //     Session.page.id,
    //     content);
}
function evMoveUp() {
    moveContent(1);
}
function evMoveDown() {
    moveContent(-1);
}
function evFontSizeUp() {
    // onEditFontSize(1);
}
function evFontSizeDown() {
    // onEditFontSize(-1);
}
function evAlignLeft() {
    // onAlign('left');
}
function evAlignCenter() {
    // onAlign('center');
}
function evAlignRight() {
    // onAlign('right');
}
function evEditPageTheme() {
    webForm('editPageTheme', []);
}
function evShadow() {
    if (EditorSelection) {
        if (EditorSelection.tagName === 'FIGURE') {
            if (EditorSelection.style.boxShadow === 'none' ||
                EditorSelection.style.boxShadow === null)
                EditorSelection.style.boxShadow = "10px 10px 15px rgba(0,0,0,1)";
            else
                EditorSelection.style.boxShadow = "none";
        }
        else {
            if (EditorSelection.style.textShadow === 'none' ||
                EditorSelection.style.textShadow === null)
                EditorSelection.style.textShadow = '0.1em 0.1em black';
            else
                EditorSelection
                    .style.textShadow = 'none';
        }
    }
}
function evLink() {
    weblink();
}
function evLine() {
    let content = Session.selected;
    if (content) {
        content.innerHTML += '<hr><br>';
        moveCursorToEnd(content);
    }
}
function evImage() {
    // onImage();
}
function evSpotify() {
    // onSpotify();
}
function evSoundclound() {
    // onSoundcloud();
}
function evYoutube() {
    // onYoutube();
}
function evToggleContentPublic(e) {
    e.innerText = e.innerText === 'Publik' ? 'Intern' : 'Publik';
    e.style.color = e.innerText === 'Publik' ? 'green' : 'red';
    if (Session.selected)
        updateContentPublic(Session.selected, e.innerText === 'Publik');
}
function evTitle() {
    const h1El = document.createElement('h1');
    const textSelection = window.getSelection();
    if (textSelection)
        textSelection.getRangeAt(0).surroundContents(h1El);
}
