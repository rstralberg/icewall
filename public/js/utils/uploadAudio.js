function uploadAudio(fileFromInput) {

    return new Promise((resolve, reject) => {

        mp3ToBase64(fileFromInput).then(
            (b64) => {
                var fd = new FormData();
                fd.append('name', fileFromInput.name);
                fd.append("file", b64);
                fd.append('key', Session.key);

                var xhr = new XMLHttpRequest();
                xhr.onreadystatechange = () => {
                    if (xhr.readyState == 4 && xhr.status == 200) {
                        var response = JSON.parse(xhr.responseText);
                        resolve(response);
                    }
                };
                xhr.open("POST", "uploadAudio.php");
                xhr.send(fd);
            }
        );
    });
}
