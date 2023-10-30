// function arrayBufferToBase64(buffer) {
//     let binary = "";
//     const bytes = new Uint8Array(buffer);
//     const len = bytes.byteLength;
//     for (let i = 0; i < len; i++) {
//         binary += String.fromCharCode(bytes[i]);
//     }
//     return btoa(binary);
// }

// function mp3ToBase64(inputFile) {

//     return new Promise((resolve, reject) => {
//         const reader = new FileReader();

//         // Define an event handler for when the file is loaded
//         reader.onload = function (e) {
//             const base64Data = arrayBufferToBase64(e.target.result);
//             resolve(base64Data);
//         };

//         // Read the file as an ArrayBuffer
//         reader.readAsArrayBuffer(inputFile);
//     })
// }

