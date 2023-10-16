
function webLink() {
    if (EditorSelection) {
        webForm('weblink', {
            text: getSelectedText(),
            cursorPos: getCaretPosition()
        });
    }
}


function saveWeblink(cursorPos) {

    if (EditorSelection) EditorSelection.focus();

    let text = document.getElementById('weblink-text').value;
    let url = document.getElementById('weblink-url').value;
    
    EditorSelection.innerHTML += '<a class="weblink" href="' + url + '" target="_blank">' + text + '<a>';
    closeWeblink();
}

function closeWeblink() {
    closeForm('weblink');
}

