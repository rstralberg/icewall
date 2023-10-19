<?php
require_once __DIR__ . '/../php/utils/reqrep.php';

$image = $_POST['image'];
$key = $_POST['key'];
$name = $_POST['name'];
$type = $_POST['type'];

$image = str_replace('data:image/' . $type . ';base64,', '', $image);
$image = str_replace(' ', '+', $image);

$data = base64_decode($image);

$folder = 'sites/' . $key . '/images';
if (!file_exists($folder)) {
    mkdir($folder, 0777, true);
}

$file = $folder.'/'.$name;

$bytes = file_put_contents($file, $data);

$reply = new Reply($bytes>0, $name);
$reply->send();

?> 