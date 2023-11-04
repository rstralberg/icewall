function uploadImage(fileFromInput, name, maxWidth) {
    return new Promise((resolve, reject) => {
        let item = fileFromInput;
        let reader = new FileReader();
        reader.readAsDataURL(item);
        // reader.name = item.name;
        // reader.size = item.size;
        reader.onload = (event) => {
            var _a;
            var img = new Image();
            img.src = (_a = event.target) === null || _a === void 0 ? void 0 : _a.result;
            img.setAttribute('size', '' + item.size);
            img.onload = function (el) {
                if (el === null)
                    return;
                if (el.target === null)
                    return;
                let elem = document.createElement('canvas');
                //scale the image  and keep aspect ratio
                let eventTarget = el.target;
                let scaleFactor = maxWidth / eventTarget.width;
                elem.width = maxWidth;
                elem.height = eventTarget.height * scaleFactor;
                //draw in canvas
                let ctx = elem.getContext('2d');
                if (ctx === null)
                    return;
                ctx.drawImage(eventTarget, 0, 0, elem.width, elem.height);
                //get the base64-encoded Data URI from the resize image
                var srcEncoded = ctx.canvas.toDataURL('image/png', 1);
                var resized = srcEncoded;
                //note: remember that the image is now base64-encoded Data URI
                //sendind the image to the server (php)
                var fd = new FormData();
                fd.append("image", resized);
                fd.append('key', Session.site.key);
                fd.append('name', name);
                fd.append('type', 'png');
                //sending data to the server
                var xhr = new XMLHttpRequest();
                xhr.onreadystatechange = () => {
                    //everything is ok
                    if (xhr.readyState == 4 && xhr.status == 200) {
                        var response = JSON.parse(xhr.responseText);
                        resolve(response);
                    }
                };
                xhr.open("POST", "uploadImage.php");
                xhr.send(fd);
            };
        };
    });
}
