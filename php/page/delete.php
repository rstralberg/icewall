<?php

require_once __DIR__ . '/../tools/reply.php';
require_once __DIR__ . '/../tools/loadForm.php';
require_once __DIR__ . '/page.php';

function delPage(stdClass $args): Reply
{

    $options = '';

    $db = new db();
    $db->open($args->database);
    $pages = $db->select('page', ['id', 'author', 'title'], null, 'title asc');
    $db->close();

    for ($i = 0; $i < count($pages); $i++) {
        $page = $pages[$i];
        if ($args->isAdmin || $page['author'] === $args->username) {
            if ($page['isParent'] === '1')
                $options .= '<option value="' . $page['id'] . '">' . strtoupper($page['title']) . '</option>';
            else
                $options .= '<option value="' . $page['id'] . '">' . $page['title'] . '</option>';
        }
    }

    return loadForm('page/html/delete', [
        'pages' => $options
    ]);
}

function removePage(stdClass $args): Reply
{
    $db = new db();
    $db->open($args->database);

    if ($db->delete('page', $db->name('id') . '=' . $args->pageId)) {
        deletePageResources($db, $args->key, $args->pageId);
    }

    // ensure that we returns to an existing page
    $firstId = dbPages::first($db);

    $db->close();
    return new Reply(true, $firstId);
}

function deletePageResources(Db $db, $folder, $pageId)
{
    $contents = $db->select('content', ['html'], $db->name('pageId') . '=' . $pageId);
    if ($contents) {
        // for all sections in page
        foreach ($contents as $content) {
            $resources = parseContentResources($content['html']);
            // for everthing that has a 'src=.....'
            if (count($resources) > 0) {
                foreach ($resources as $resource) {
                    // is it a file 
                    if (is_file($resource)) {
                        // delete file
                        unlink($resource);
                    }
                }
            }
        }
    }
}

function parseContentResources(string $html): array
{
    $resources = [];
    $index = strpos($html,'src=');
    while( $index !== false ) {
        $srcStart = strpos( $html,'"', $index + 1);
        $srcEnd = strpos( $html,'"', $srcStart+1);
        $src = substr( $html, $srcStart, $srcEnd-$srcStart);
        $expl = explode('/sites', $src);
        if( count($expl) > 1) {
            $resources[] = realpath(__DIR__ . '/../../public/sites' . $expl[1]);
        }
        $index = strpos( $html,'src=', $srcEnd);
    }
    return $resources;
}


?>