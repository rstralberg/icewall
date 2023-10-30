<?php
require_once __DIR__ . '/../php/tools/reply.php';

$mp3 = $_POST['file'];
$key = $_POST['key'];
$name = $_POST['name'];

$data = base64_decode($mp3);

$folder = 'sites/' + $key + '/mp3';
if (!file_exists($folder)) {
    mkdir($folder, 0777, true);
}

$file = $folder.'/'.$name;

$bytes = file_put_contents($file, $data);

$reply = new Reply($bytes > 0, $name);
$reply->send();

?> 

