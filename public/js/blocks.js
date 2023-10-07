
function onBlockSelect(id) {

    function onBlockLeave(block) {
        if( block && document.getElementById('tools').style.display !== 'none' ) {
            let pub = true;
            let ePublic = document.getElementById('block-public');
            if( ePublic )  {
                pub = ePublic.checked;
            }
            saveBlock(pub, Cookie.pageId, block);
        }
    }

     
    let blocks = document.querySelectorAll('section');
    blocks.forEach(b => {
        b.classList.remove('selected');
        b.contentEditable = false;
    });

    let prevId = Cookie.selectedBlockId ?  Cookie.selectedBlockId  : false;
    if (prevId && prevId.startsWith('sec-') && id !== prevId) {
        let prevBlock = document.getElementById(prevId);
        if (prevBlock) {
            detachEditor(prevBlock);
            onBlockLeave(prevBlock);
        }
    }

    Cookie.selectedBlockId = id;
    let block = document.getElementById(id);
    block.classList.toggle('selected');
    if ( Cookie.canEdit ) {
        block.contentEditable = true;
        let main = document.querySelector('main');
        if( document.getElementById('pagetitle-content').style.display != 'none' ) 
        {
            document.getElementById('tools').style.top = '16vh';
            main.style.marginTop = '16vh';
        }
        else 
        {
            document.getElementById('tools').style.top = '10vh';
            main.style.marginTop = '10vh';
        }

        attachEditor(block);
    }
    else {
        document.getElementById('tools').style.display = 'none';
    }
}

function prepareBlocks() {
    if (Cookie.canEdit ) {

        let main = document.querySelector('main');

        for (let i = 0; i < main.childElementCount; i++) {

            let block = main.children[i];

            if (block.tagName.toLowerCase() === 'section') {

                for (let j = 0; j < block.childElementCount; j++) {
                    let child = block.children[j];
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
                            Cookie.selectedChildId = child.id;
                        });
                    }
                    else {
                        child.addEventListener('click', (e) => {
                            Cookie.selectedChildId = '';
                        });
                    }
                }
            }
        }
    }
}

function onAddBlock() {
    addBlock(document.querySelector('main').childElementCount);
}

function onDeleteBlock() {
    deleteBlock(document.getElementById(Cookie.selectedBlockId));
}

function onSaveBlock() {
    saveBlock(
        document.getElementById('block-public').checked,
        Cookie.pageId, 
        document.getElementById(Cookie.selectedBlockId));
  
}