
function vh2px(vh) {
    return Math.round(window.innerHeight / (100 / vh).toFixed(0));
}

function vw2px(vw) {
    return Math.round(window.innerWidth / (100 / vw).toFixed(0));
}

function px2vh(px) {
    return Math.round(100 * (px/window.innerHeight)).toFixed(1);
}

function px2vw(px) {
    return Math.round(100 * (px/window.innerWidth)).toFixed(1);
}

function widths2vw(element) {

    if( element.style.width && element.style.width.search('px') != -1 ) {
        element.style.width = px2vw(parseInt(element.style.width)) + 'vw';
    }
    if( element.style.left && element.style.left.search('px') != -1 ) {
        element.style.left = px2vw(parseInt(element.style.left)) + 'vw';
    }
    if( element.style.right && element.style.right.search('px') != -1 ) {
        element.style.right = px2vw(parseInt(element.style.right)) + 'vw';
    }
    if( element.style.marginLeft && element.style.marginLeft.search('px') != -1 ) {
        element.style.marginLeft = px2vw(parseInt(element.style.marginLeft)) + 'vw';
    }
    if( element.style.marginRight && element.style.marginRight.search('px') != -1 ) {
        element.style.marginRight = px2vw(parseInt(element.style.marginRight)) + 'vw';
    }
    if( element.style.paddingLeft && element.style.paddingLeft.search('px') != -1 ) {
        element.style.paddingLeft = px2vw(parseInt(element.style.paddingLeft)) + 'vw';
    }
    if( element.style.paddingRight && element.style.paddingRight.search('px') != -1 ) {
        element.style.paddingRight = px2vw(parseInt(element.style.paddingRight)) + 'vw';
    }
}

function heights2vh(element) {
    if( element.style.height && element.style.height.search('px') != -1 ) {
        element.style.height = px2vh(parseInt(element.style.height)) + 'vh';
    }
    if( element.style.top && element.style.top.search('px') != -1 ) {
        element.style.top = px2vh(parseInt(element.style.top)) + 'vh';
    }
    if( element.style.bottom && element.style.bottom.search('px') != -1 ) {
        element.style.bottom = px2vh(parseInt(element.style.bottom)) + 'vh';
    }
    if( element.style.marginTop && element.style.marginTop.search('px') != -1 ) {
        element.style.marginTop = px2vh(parseInt(element.style.marginTop)) + 'vh';
    }
    if( element.style.marginBottom && element.style.marginBottom.search('px') != -1 ) {
        element.style.marginBottom = px2vh(parseInt(element.style.marginBottom)) + 'vh';
    }
    if( element.style.paddingTop && element.style.paddingTop.search('px') != -1 ) {
        element.style.paddingTop = px2vh(parseInt(element.style.paddingTop)) + 'vh';
    }
    if( element.style.paddingBottom && element.style.paddingBottom.search('px') != -1 ) {
        element.style.paddingBottom = px2vh(parseInt(element.style.paddingBottom)) + 'vh';
    }
}

function elements2vhw( element ) {
    widths2vw(element);
    heights2vh(element);
    for( let i=0; i < element.childElementCount; i++) {
        elements2vhw(element.children[i]);
    }
}

function elements2percent(element) {

}

function size2percent(element) {

    // element.style.width = (element.clientWidth/element.parentElement.clientWidth).toFixed(1) + '%';
    console.log( 'main width ' + document.querySelector('.content').clientWidth);
    console.log( 'elem ' + element.tagName + ' width ' + element.clientWidth );
    console.log( '%s = ' + (element.clientWidth/document.querySelector('.content').clientWidth) + '%');
}