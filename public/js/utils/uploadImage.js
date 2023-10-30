// function uploadImage(fileFromInput, maxWidth) {

//     return new Promise((resolve, reject) => {

//         var item = fileFromInput;
//         var reader = new FileReader();

//         reader.readAsDataURL(item);
//         reader.name = item.name;
//         reader.size = item.size;
//         reader.onload = (event) => {

//             var img = new Image();
//             img.src = event.target.result; 
//             img.alt = event.target.name;
//             img.size = event.target.size;

//             img.onload = function (el) {
//                 var elem = document.createElement('canvas');

//                 //scale the image  and keep aspect ratio
//                 var scaleFactor = maxWidth / el.target.width;
//                 elem.width = maxWidth;
//                 elem.height = el.target.height * scaleFactor;

//                 //draw in canvas
//                 var ctx = elem.getContext('2d');
//                 ctx.drawImage(el.target, 0, 0, elem.width, elem.height);

//                 //get the base64-encoded Data URI from the resize image
//                 var srcEncoded = ctx.canvas.toDataURL('image/png', 1);

//                 var resized = srcEncoded;

//                 //note: remember that the image is now base64-encoded Data URI
//                 //sendind the image to the server (php)
//                 var fd = new FormData();
//                 fd.append("image", resized);
//                 fd.append('key', Session.site.key);
//                 fd.append('name', item.name);
//                 fd.append('type', 'png');

//                 //sending data to the server
//                 var xhr = new XMLHttpRequest();

//                 xhr.onreadystatechange = () => {
//                     //everything is ok
//                     if (xhr.readyState == 4 && xhr.status == 200) {
//                         var response = JSON.parse(xhr.responseText);
//                         resolve(response);

//                     }
//                 };
//                 xhr.open("POST", "uploadImage.php");
//                 xhr.send(fd);
//             };
//         };
//     });
// }
