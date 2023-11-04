
function updateContentPositions(positions) {
    let request = new Request('updateContentPositions', {
        positions: positions
    });
    request.send().then(
        (resolve) => { 
            if( resolve.ok === false ) {
                alert(resolve.content);
            }
        },
        (reject) => { popup(reject); }
    );
}


function updateContentPublic(content,pub) {
    let request = new Request('updateContentPublic', {
        id: parseInt(content.id.substring('sec-'.length)),
        pub: pub
    });
    request.send().then(
        (resolve) => { 
            if( resolve.ok === false ) {
                alert(resolve.content);
            }
        },
        (reject) => { popup(reject); }
    );
}