

function updateHtml(id, html) {
    let element = document.querySelector(id);
    element.innerHTML = html;
}

function random_int() {
    return Math.floor(Math.random() * 30000);
}

function selectOption(selectElement, value) {
    for( let index=0; index < selectElement.childElementCount; index++) {
        if( selectElement.children[index].value === value ) {
            selectElement.selectedIndex = index;
            return;
        }
    }
}



