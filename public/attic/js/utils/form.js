
// function openForm(formId, htmlCode) {

//     return new Promise((resolve, reject) => {
//         let form = document.createElement('div');
//         form.id = formId;
//         form.innerHTML = htmlCode;
//         form.style="position:fixed; top:15vh; left:10vw;z-index:400;" 

//         try {
//             let html = document.querySelector('html');
//             html.appendChild(form);
//             resolve(form);
//         }
//         catch( err ) {
//             reject(err.message);
//         }
//     });
// }

// function closeForm(formId) {
//     let form = document.getElementById(formId);
//     if (form) {
//         let html = document.querySelector('html');
//         html.removeChild(form);
//     }
// }