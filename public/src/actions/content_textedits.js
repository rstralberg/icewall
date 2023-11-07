
function content_bold() {
    toggleBoldText();
}

function toggleBoldText() {
    

    // const selection = window.getSelection();
    // getSelectedNode(0, get_session_selection().childNodes).then( 
    //     (res) => {
    // console.log( 'node: ' + res);
    // console.log( 'nodeNumber: ' + res.nodeNumber);
    // console.log( 'nodeType: ' + res.nodeName );
    // console.log( 'nodeText: ' + res.textContent );
    // console.log( 'nodeStart: ' + res.start );
    // console.log( 'nodeEnd: ' + res.end );
    // console.log( 'carePos: ' + res.caretPos );
    //     },
    //     (err) => {console.error(err);}
    // );



    // if( selection.rangeCount === 0 ) {
    //     console.error( 'selection rangecount = 0');
    //     return ;
    // }

    // const range = selection.getRangeAt(0);
    // if( !is_valid(range) ) {
    //     console.error( 'could not get range');
    //     return ;
    // }

    // let parent = range.commonAncestorContainer.parentElement.tagName === 'SECTION' ?
    //     range.commonAncestorContainer : range.commonAncestorContainer.parentElement;

    // console.log( 'parent = ' + parent.textContent);
    // console.log( 'tagName = ' + parent.tagName);
    // for( let i = 0; i < parent.childNodes.length; i++ ) {
    //     console.log( 'Child ' + i + ': ' + parent.childNodes[i].tagName);
    // }
    
    // const isBold = parent.tagName === "STRONG";
    // console.log( isBold ? 'is already bold' : 'not bold');

    // if( isBold ) {
    //     console.log( 'removing bold');
    //     const boldElement = parent;
    //     let textNode = boldElement.firstChild;
    //     boldElement.parentNode.replaceChild(textNode, boldElement);
    // }
    // else {
    //     console.log( 'adding bold');
    //     const boldElement = document.createElement('strong');
    //     range.surroundContents(boldElement);
    // }
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

// function set_caret_pos(pos) {
  
//     let div = get_session_selection();
  
//     const range = document.createRange();
//     const selection = window.getSelection();
  
//     range.setStart(div, div.childNodes.length);
//     range.setEnd(div, div.childNodes.length);
//     selection.removeAllRanges();
//     selection.addRange(range);
  
//     div.focus();
//   }
function getSelectedNode(start, nodes) {
    return new Promise((resolve, reject) => {

        let caretPos = getCaretPosition();

        let nodeNumber = 0;
        let end = 0;
        nodes.forEach(node => {
            let type = node.nodeType;
            switch (type) {
                case 1:
                    end = start + node.textContent.length;

                    if (caretPos >= start && caretPos < end) {
                        resolve({
                            node: node,
                            nodeNumber: nodeNumber,
                            nodeType: node.nodeName,
                            nodeText: node.textContent,
                            nodeStart: start,
                            nodeEnd: end,
                            carePos: caretPos
                        });
                    }
                    if (node.childNodes.length > 0) {
                        getSelectedNode(start, node.childNodes);
                    }
                    start += +node.textContent.length;
                    break;
                case 3:
                    end = start + node.length;
                    if (caretPos >= start && caretPos < end) {
                        resolve({
                            node: node,
                            nodeNumber: nodeNumber,
                            nodeType: node.nodeName,
                            nodeText: node.textContent,
                            nodeStart: start,
                            nodeEnd: end,
                            carePos: caretPos
                        });
                    }
                    start += node.length;
                    if (node.childNodes.length > 0) {
                        getSelectedNode(start, node.childNodes);
                    }
                    break;
            }
            nodeNumber++;
        });
    });
}

function getCaretPosition() {
    const content = get_session_selection();
    if (content === null) return false;

    let caretPos = 0;
    const sel = window.getSelection();

    if (sel.rangeCount > 0) {
        const range = sel.getRangeAt(0);
        const preCaretRange = range.cloneRange();
        preCaretRange.selectNodeContents(content);
        preCaretRange.setEnd(range.endContainer, range.endOffset);
        caretPos = preCaretRange.toString().length;
    }
    return caretPos;
}

