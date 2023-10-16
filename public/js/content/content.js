
function contentSelected(id) {

    function leave(content) {
        if( content ) {
            let pub = true;
            let ePublic = document.getElementById('content-public');
            if( ePublic )  {
                pub = ePublic.checked;
            }
            saveContent(pub, Session.page.id, content);
        }
    }

    let contents = document.querySelectorAll('section');
    contents.forEach(b => {
        b.classList.remove('selected');
        b.contentEditable = false;
    });

    let prevId = Session.selected ? Session.selected.id: false;
    if (prevId && prevId.startsWith('sec-') && id !== prevId) {
        let prevContent = document.getElementById(prevId);
        if (prevContent) {
            detachEditor(prevContent);
            leave(prevContent);
        }
    }

    Session.selected = id;
    let content = document.getElementById(id);
    content.classList.toggle('selected');
    if ( canEdit('content') ) {
        content.contentEditable = true;
        attachEditor(content);
    }
    else {
        document.querySelector('.left').style.display = 'none';
    }
}

function prepareContents() {
    if (canEdit('content') ) {

        let main = document.querySelector('.content');

        for (let i = 0; i < main.childElementCount; i++) {

            let content = main.children[i];

            if (content.tagName.toLowerCase() === 'section') {

                for (let j = 0; j < content.childElementCount; j++) {
                    let child = content.children[j];
                    if (child.tagName.toLowerCase() === 'figure') {
                        new ResizeObserver(() => {
                            child.style.width = child.style.width + SHADOW_DISTANCE + 'px';

                            let img = child.querySelector('img');
                            if( img ) {
                                img.style.width = child.style.width;
                            }
                            let audio = child.querySelector('audio');
                            if( audio ) {
                                audio.style.width = child.style.width;
                            }

                            let caption = child.querySelector('figcaption');
                            if( caption ) {
                                caption.style.width = child.style.width;
                            }


                        }).observe(child);

                        child.id = 'c' + random_int();
                        child.addEventListener('click', (e) => {
                            Session.selectedChild = child.id;
                        });
                    }
                    else {
                        child.addEventListener('click', (e) => {
                            Session.selectedChild = null;
                        });
                    }
                }
            }
        }
    }
}

function onEditFontSize(value) {
    let content = EditorSelection;
    if (content === null) return;

    let fsize = parseFloat(content.style.fontSize);
    if (isNaN(fsize) || fsize === 0) {
        fsize = parseFloat(get_style('fontsize'))
    }

    let newFsize = fsize + (value < 0 ? (-FONTSIZE_STEP) : (FONTSIZE_STEP));
    if (newFsize >= MIN_FONTSIZE && newFsize < MAX_FONTSIZE) {
        EditorSelection.style.fontSize = newFsize + 'em';
    }
}


function moveContent(dir) {
    let content = Session.selected;
    if (content === null) return;

    let moved = false;
    if (dir > 0) {
        if (content.previousElementSibling) {
            content.parentNode.insertBefore(content, content.previousElementSibling);
            moved = true;
        }
    }
    else {
        if (content.nextElementSibling) {
            content.parentNode.insertBefore(content.nextElementSibling, content);
            moved = true;
        }
    }
    if (moved) {
        let positions = new Array();
        let container = document.querySelector('.content');
        for (let pos = 0; pos < container.childElementCount; pos++) {
            let child = container.children[pos];
            positions.push({
                id: parseInt(child.id.substring('sec-'.length)),
                pos: pos
            });
        }
        updateContentPositions(positions);
    }

}

