// function saveContent(pub:boolean, pageId:number, content:HTMLElement) {
//     elements2vhw(content);
//     let request = new SrvReq('saveContent', [
//         { key:'id', value: content.id.substr('sec-'.length)},
//         { key:'pageId', value: pageId},
//         { key:'html', value: content.innerHTML},
//         { key:'pos', value: eGetChildCount('.center')},
//         { key:'pub', value: pub},
//     ]);
//     request.send().then(
//         (reply) => {},  
//         (err) => { error(err); }
//     );
// }
