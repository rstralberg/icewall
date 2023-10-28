function updateContentPositions(positions) {
    let request = new SrvReq('updateContentPositions', [
        { key: 'positions', value: positions }
    ]);
    request.send().then((reply) => { }, (err) => { error(err); });
}
function updateContentPublic(content, pub) {
    let request = new SrvReq('updateContentPublic', [
        { key: 'id', value: content.id.substring('sec-'.length) },
        { key: 'pub', value: pub }
    ]);
    request.send().then((reply) => { }, (err) => { error(err); });
}
