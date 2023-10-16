<?php
require_once __DIR__ . '/../php/utils/reqrep.php';

$mp3 = $_POST['file'];
$folder = $_POST['folder'];
$name = $_POST['name'];

$data = base64_decode($mp3);

$file = $folder.'/'.$name;

$bytes = file_put_contents($file, $data);

$reply = new Reply($bytes <= 0?'error':'ok', $file);
$reply->send();

?> 

