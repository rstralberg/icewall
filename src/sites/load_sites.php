<?php

function load_sites(): array
{
    $fh = fopen(__DIR__ . '/../../sites.json', 'r');
    if ($fh === null)
        die('IceWall: #ERROR. No sites defined. Aborting!');

    $text = fread($fh, 32000);
    fclose($fh);

    if ($text === null || $text === '') {
        die('IceWall: #ERROR. No sites defined. Aborting!');
    }

    $item = json_decode($text);

    $sites = array();
    for ($i = 0; $i < count($item->sites); $i++) {
        $site = $item->sites[$i];
        array_push(
            $sites,
            [
                'key' => $site->key,
                'title' => $site->title,
                'owner' => $site->owner,
                'email' => $site->email,
                'logo' => 'images/avatar.png',
                'theme' => $site->theme
            ]
        );
    }
    return $sites;
}

?>
