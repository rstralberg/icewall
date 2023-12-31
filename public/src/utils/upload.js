
function upload_image(fileFromInput, maxWidth, opt='') {

    return new Promise((resolve, reject) => {

        let item = fileFromInput;
        let reader = new FileReader();
        reader.readAsDataURL(item);


        reader.onload = (event) => {

            var _a;
            var img = new Image();

            img.setAttribute('size', '' + item.size);
            img.onload = function (el) {
                if (el === null) return;
                if (el.target === null) return;

                let elem = document.createElement('canvas');

                //scale the image  and keep aspect ratio
                let eventTarget = el.target;
                let scaleFactor = maxWidth / eventTarget.width;
                elem.width = maxWidth;
                elem.height = eventTarget.height * scaleFactor;

                //draw in canvas
                let ctx = elem.getContext('2d');
                if (ctx === null) return;
                ctx.drawImage(eventTarget, 0, 0, elem.width, elem.height);

                //get the base64-encoded Data URI from the resize image
                let srcEncoded = ctx.canvas.toDataURL(item.type, 1);

                //note: remember that the image is now base64-encoded Data URI
                //sendind the image to the server (php)
                var fd = new FormData();
                fd.append("image", srcEncoded);
                fd.append('key', get_session_key());
                fd.append('pageid', opt===''?get_session_page().id:0);
                fd.append('contentid', opt==''?get_session_selection().id.substring(1):0);
                fd.append('option', opt);
                fd.append('name', fileFromInput.name);

                let types = item.type.split('/');
                fd.append('type', types[1]);

                //sending data to the server
                var xhr = new XMLHttpRequest();
                xhr.onreadystatechange = () => {
                    //everything is ok
                    if (xhr.readyState == 4 && xhr.status == 200) {
                        var response = JSON.parse(xhr.responseText);
                        resolve(response);
                    }
                };
                xhr.open("POST", "/upload_image.php");
                xhr.send(fd);
            };
            img.src = (_a = event.target) === null || _a === void 0 ? void 0 : _a.result;
        };
    });
}



function upload_mp3(fileFromInput) {

    return new Promise((resolve, reject) => {

        var fd = new FormData();
        fd.append('pageid', get_session_page().id);
        fd.append('contentid', get_session_selection().id.substring(1));
        fd.append('key', get_session_key());
        fd.append('mp3', fileFromInput);

        fetch('upload_mp3.php', {
            method: 'POST',
            headers: new Headers({'content-type': 'audio/mp3'}),
            mode: 'no-cors',
            body: fd
        })
            .then( response => {
                let r = response.json();
                resolve(r) ;
            })
            .catch(err => {
                error(err);
                reject(err);
            });
    });
}
