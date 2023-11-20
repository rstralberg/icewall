
function update_content_positions() {

    let container = document.getElementById('content');
    let pos = 0;
    let data = new Array();
    for(; pos < container.childElementCount; pos++) {
        let sec = container.children[pos];

        data.push( {
            id: parseInt(sec.id.substring(1)),
            pos: pos
        });
    }

    server( 'content/update_positions', {
        contents: data
    });
}