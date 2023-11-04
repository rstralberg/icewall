// function deleteContent(content: HTMLElement) {
//     let contentId = content.id.substr('sec-'.length);
//     if (contentId === null) {
//         return;
//     }
//     let request = new SrvReq('sql', [
//         { key: 'command', value: 'delete' },
//         { key: 'table', value: 'content' },
//         { key: 'where', value: 'id=' + contentId }]);
//     request.send().then(
//         (reply) => {
//             getContents(Session.page.id);
//         },
//         (err) => { error(err); }
//     );
// }
