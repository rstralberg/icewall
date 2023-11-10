<?php
require_once __DIR__ . '/../src/utils/send_reply.php';

$image = $_POST['image'];
$key = $_POST['key'];
$name = $_POST['name'];
$mp3 = $_POST['file'];
$pageId = $_POST['pageid'];
$contentId = $_POST['contentid'];


$data = base64_decode($mp3);

$folder = 'sites/' . $key . '/' . $pageId . '/' . $contentId;
if (!file_exists($folder)) {
    mkdir($folder, 0777, true);
}

$file = $folder.'/'.$name;

$bytes = file_put_contents($file, $data);

if( $bytes > 0 ) send_resolve($name);
else send_reject('Failed to upload file');

?> 

