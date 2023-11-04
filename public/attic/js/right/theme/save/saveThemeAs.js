function saveThemeAs() {
    webForm('saveThemeAs', []);
}
function closeSaveAs() {
    closeForm('saveThemeAs');
}
// function saveThemeAs(nameId) {
//     let name = eGetValue(nameId);
//     let request = new SrvReq('saveTheme', [
//         { key:'theme', value: styles2ValueArray() },
//         { key:'name', value: name }
//     ]);
//     request.send().then(
//         (resolve) => {
//             popup(name + ' sparat!');
//             getTop();
//             closeSaveAs();
//         },
//         (reject) => {
//             error(reject);
//             closeSaveAs();
//         }
//     );
// }
