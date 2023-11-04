function deleteTheme() {
    webForm('deleteTheme', []);
}
function closeDeleteTheme() {
    closeForm('deleteTheme');
}
// function deleteTheme(selectId) {
//     let select = document.getElementById(selectId);
//     let themeName = select.options[select.selectedIndex].value;
//     let request = new SrvReq('deleteTheme', [
//         { key:'name', value: themeName }
//     ]);
//     request.send().then(
//         (resolve) => {
//                 popup(themeName + ' raderat!');
//                 getTop();
//         },
//         (reject) => {
//             error( reject);
//         }
//     );
// }
