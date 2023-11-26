<?php
require_once __DIR__ . '/../src/utils/send_reply.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if ($_FILES['mp3']['error'] === UPLOAD_ERR_OK) {

        $key = $_POST['key'];
        $pageid = $_POST['pageid'];
        $contentid = $_POST['contentid'];

        $uploadDir = 'sites/' . $key . '/' . $pageid . '/' . $contentid . '/mp3';
        if (!file_exists($uploadDir)) {
            mkdir($uploadDir, 0777, true);
        }

        $uploadDir .= '/';

        $filename = basename($_FILES['mp3']['name']);
        $uploadFile = $uploadDir . $filename;

        if (move_uploaded_file($_FILES['mp3']['tmp_name'], $uploadFile)) {
            send_resolve($filename);
            exit(0);
        }
    }
}
send_reject('Uppladningen misslyckades');
exit(0);
