
<?php

require_once __DIR__ . '/../src/utils/load_html.php';
require_once __DIR__ . '/../src/utils/send_reply.php';
require_once __DIR__ . '/../src/utils/scaleimage.php';

$image = $_POST['image'];
$key = $_POST['key'];
$name = $_POST['name'];
$type = $_POST['type'];
$pageId = $_POST['pageid'];
$contentId = $_POST['contentid'];
$opt = $_POST['option'];


$image = str_replace('data:image/' . $type . ';base64,', '', $image);
$image = str_replace(' ', '+', $image);

$data = base64_decode($image);

$folder = $_SERVER['DOCUMENT_ROOT'] .'/sites/' . $key . '/' . $pageId . '/' . $contentId;
if( $opt !== '') 
    $folder = $_SERVER['DOCUMENT_ROOT'] .'/sites/' . $key . '/' . $opt;

if (!file_exists($folder))  mkdir($folder, 0777, true);

$scaling = [
    [ 'folder' => '1200', 'w' => 1728, 'h' => 1200],
    [ 'folder' => '800', 'w' => 1152, 'h' => 800],
    [ 'folder' => '600', 'w' => 864, 'h' => 600],
    [ 'folder' => '200', 'w' => 288, 'h' => 200]
];

// <source 
// media="(min-width:1728px)" 
// srcset="sites/km/1/1/1200/http://localhost:8080/sites/km/1/1/Screenshot_2023-11-08_23-26-03.png">


$orgFolder = $folder.'/org';
if (!file_exists($orgFolder))  mkdir($orgFolder, 0777, true);
$src = $orgFolder . '/' . $name;
file_put_contents($src, $data);

for( $i = 0; $i < count($scaling); $i++ ) {
    $scale = $scaling[$i];
    $dir = $folder . '/' . $scale['folder'];
    if (!file_exists($dir))  mkdir($dir, 0777, true);
    scale_image($src, $scale['w'], $scale['h'], $dir . '/'. $name);
}

// if( $opt === '') {
// $basefolder = 'sites/' . $key . '/' . $pageId . '/' . $contentId;

// $html = 
//     '<figure><picture>   ';
//     for( $i = 0; $i < count($scaling); $i++ ) {
//         $scale = $scaling[$i];
//         $dir = $basefolder . '/' . $scale['folder'];
//         $html .= '<source media="(min-width:'. $scale['w'] . 'px)" srcset="' . $dir .'/'. $name . '">';
//     }
//     $html .= '<img onwheel="resize_img_by_wheel" class="shadow" style="width:256px;height=auto" src="' . $src . '" alt="' .$name. '" style="width:256px;height:auto">'
//     . '</picture>'
//     . '<figcaption>' . $name . '</figcaption>'
//     . '</figure><br>';

//     send_resolve(compress_html($html));
// }
// else {
    send_resolve($name);
    exit(0);

?> 