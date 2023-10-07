<?php
require_once __DIR__ . '/../php/utils/reqrep.php';

$target_dir = "uploads/";

$image = $_POST['image'];
$folder = $_POST['folder'];
$name = $_POST['name'];

$image = str_replace('data:image/png;base64,', '', $image);
$image = str_replace(' ', '+', $image);

$data = base64_decode($image);

if (!file_exists($target_dir.$folder)) {
    mkdir($target_dir.$folder, 0777, true);
}


$file = $target_dir.$folder.'/'.$name;

$bytes = file_put_contents($file, $data);

$reply = new Reply($bytes <= 0?'error':'ok', $file);
$reply->send();

?> 