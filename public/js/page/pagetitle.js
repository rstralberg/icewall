
function onTogglePageTitle() {
    let img = document.getElementById('pagetitle-toggle');
    if (img) {
        if (img.src.search('show.svg') !== -1 ) {
            img.src = img.src.replace('show.svg', 'hide.svg');
            hideTitle();
        } 
        else {
            img.src = img.src.replace('hide.svg', 'show.svg');
            showTitle();
        }
    }
}

