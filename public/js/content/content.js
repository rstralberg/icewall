
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

function onAddContent() {
    addContent(document.querySelector('.content').childElementCount);
}

function onDeleteContent() {
    let content = Session.selected;
    if( content === null) return;
    deleteContent(content);
}

function onSaveContent() {
    let content = Session.selected;
    if( content === null) return;

    saveContent(
        document.getElementById('content-public').checked,
        Session.page.id, 
        content);
  
}

