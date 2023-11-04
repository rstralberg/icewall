function contentSelected(id) {
    function leave(content) {
        if (content) {
            let pub = true;
            let ePublic = document.getElementById('lt-public');
            if (ePublic) {
                pub = ePublic.innerText === 'Publik';
            }
            // saveContent(pub, Session.page.id, content);
        }
    }
    if (Session.user.username === '')
        return;
    if (Session.user.username !== Session.page.author && !Session.user.isAdmin)
        return;
    // Release previous selections
    let contents = document.querySelectorAll('section');
    contents.forEach(b => {
        b.classList.remove('selected');
        b.contentEditable = 'false';
    });
    let prevId = Session.selected ? Session.selected.id : false;
    if (prevId && prevId.startsWith('sec-') && id !== prevId) {
        let prevContent = document.getElementById(prevId);
        if (prevContent) {
            detachEditor(prevContent);
            leave(prevContent);
        }
    }
    // Enter new selection
    Session.selected = id;
    let content = document.getElementById(id);
    if (content) {
        content.classList.toggle('selected');
        if (canEdit('content')) {
            content.contentEditable = 'true';
            Session.edit = true;
            attachEditor(content);
        }
        else {
            eGet('.left').style.display = 'none';
        }
    }
}
function prepareContents() {
    if (Session.user.isAdmin ||
        (Session.user.username != '' &&
            Session.user.username === Session.page.author)) {
        let main = document.querySelector('.center');
        if (main === null)
            return;
        for (let i = 0; i < main.childElementCount; i++) {
            let content = main.children[i];
            if (content.tagName.toLowerCase() === 'section') {
                for (let j = 0; j < content.childElementCount; j++) {
                    let child = content.children[j];
                    if (child.tagName.toLowerCase() === 'figure') {
                        new ResizeObserver(() => {
                            child.style.width = child.style.width + SHADOW_DISTANCE + 'px';
                            let img = child.querySelector('img');
                            if (img) {
                                img.style.width = child.style.width;
                            }
                            let audio = child.querySelector('audio');
                            if (audio) {
                                audio.style.width = child.style.width;
                            }
                            let caption = child.querySelector('figcaption');
                            if (caption) {
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
                            Session.selectedChild = '';
                        });
                    }
                }
            }
        }
    }
}
function moveContent(dir) {
    var _a, _b;
    let content = Session.selected;
    if (content === null)
        return;
    let moved = false;
    if (dir > 0) {
        if (content.previousElementSibling) {
            (_a = content.parentNode) === null || _a === void 0 ? void 0 : _a.insertBefore(content, content.previousElementSibling);
            moved = true;
        }
    }
    else {
        if (content.nextElementSibling) {
            (_b = content.parentNode) === null || _b === void 0 ? void 0 : _b.insertBefore(content.nextElementSibling, content);
            moved = true;
        }
    }
    if (moved) {
        let positions = new Array();
        let center = document.querySelector('.center');
        if (center) {
            for (let pos = 0; pos < center.childElementCount; pos++) {
                let child = center.children[pos];
                positions.push({
                    id: parseInt(child.id.substring('sec-'.length)),
                    pos: pos
                });
            }
        }
        updateContentPositions(positions);
    }
}
