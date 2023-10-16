
/*  ==============================
    Events from Left sidebar
    ============================== */

function evDeleteContent() {
    let content = Session.selected;
    if (content === null) return;
    deleteContent(content);
}

function evSaveContent() {
    let content = Session.selected;
    if (content === null) return;

    saveContent(
        document.getElementById('content-public').checked,
        Session.page.id,
        content);

}

function evMoveUp() {
    moveContent(1);
}

function evMoveDown() {
    moveContent(-1);
}

function evBold() {
    const boldEl = document.createElement('strong');
    const textSelection = window.getSelection();
    textSelection.getRangeAt(0).surroundContents(boldEl);
}

function evItalic() {
    const boldEl = document.createElement('em');
    const textSelection = window.getSelection();
    textSelection.getRangeAt(0).surroundContents(boldEl);
}

function evFontSizeUp() {
    onEditFontSize(1);
}

function evFontSizeDown() {
    onEditFontSize(-1);
}

function evAlignLeft() {
    onAlign('left');
}

function evAlignCenter() {
    onAlign('center');
}

function evAlignRight() {
    onAlign('right');
}

function evEditPageTheme() {
    webForm('editPageTheme', {
        pageId: Session.page.id
    });
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
    webLink();
}

function evLine() {
    let content = Session.selected;
    if (content) {
        content.innerHTML += '<hr><br>';
        moveCursorToEnd(content);
    }
}

function evImage() {
    onImage();
}

function evAudio() {
    onAudio();
}

function evSpotify() {
    onSpotify();
}

function evSoundclound() {
    onSoundcloud();
}

function evYoutube() {
    onYoutube();
}

function evToggleContentPublic(e) {
    e.innerText = e.innerText === 'Publik' ? 'Intern' : 'Publik';
    updateContentPublic(Session.selected, e.innerText === 'Publik');
}

function evTitle() {
    const h1El = document.createElement('h1');
    const textSelection = window.getSelection();
    textSelection.getRangeAt(0).surroundContents(h1El);
}


