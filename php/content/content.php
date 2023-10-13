<?php

require_once __DIR__ . '/../utils/db.php';
require_once __DIR__ . '/content.php';
require_once __DIR__ . '/../page/page.php';



const ContentCols = [
    'pageId', 
    'style', 
    'html', 
    'pos', 
    'public'
];

function createContents(mysqli $mysqli): void
{
    if (
        dbCreate(
            $mysqli,
            'content',
            array_merge(['id'], ContentCols), [
                'INT(11) NOT NULL AUTO_INCREMENT',
                'INT(11) NOT NULL DEFAULT 0',
                'TEXT NOT NULL DEFAULT \'text-align:center\'',
                'TEXT NOT NULL DEFAULT \'Välkommen till <strong>IceWall</strong>\'',
                'TINYINT NOT NULL DEFAULT 0',
                'TINYINT NOT NULL DEFAULT 1',
            ]
        )
    ) {

        $ContentId = dbAddDefaultRow($mysqli, 'content');
        $pageId = getFirstPageId($mysqli);
        dbUpdate($mysqli, 'content', ['pageId'], [$pageId], 'id=' . $ContentId);
    }
}

function selectContent(mysqli $mysqli, int $id): array
{
    return dbSelect($mysqli, 'content', array_merge(['id'], ContentCols),
        sqlName('id') . '=' . $id);
}

function selectContents(mysqli $mysqli, int $pageId): array
{
    return dbSelect($mysqli, 'content', array_merge(['id'], ContentCols),
        sqlName('pageId') . '=' . $pageId, sqlName('pos') . ' asc');
}

function insertContent(mysqli $mysqli, $values): int
{
    return dbInsert($mysqli, 'content', ContentCols, $values);
}

// function updateContent(mysqli $mysqli, $id, $values): int
// {
//     return dbUpdate($mysqli, 'content', 
//         ContentCols, $values, sqlName('id') . '=' . $id);
// }

function updateContent(mysqli $mysqli, $cols, $values, $id) : bool {
    return dbUpdate($mysqli, 'content', $cols, $values, 'id='.$id) ;
}

function deleteContent(mysqli $mysqli, $id): void
{
    dbDelete($mysqli, 'content', sqlName('id') . '=' . $id);
}

function deletePageContents(mysqli $mysqli, $pageId): void
{
    dbDelete($mysqli, 'content', sqlName('pageId') . '=' . $pageId);
}


function getContent(stdClass|null $args) : Reply {

    if( $args === null ) return new Reply('error', 'Argument saknas vid hämtning av Content');
    $mysqli = dbConnect();
    $page = selectPage($mysqli, $args->pageId);
    
    $contents = selectContents($mysqli, $args->pageId);
    dbDisonnect($mysqli);

    if( !$contents ) {
        return new Reply('error', 'Sidan "' . $page['title'] . '" saknar innehåll');
    }
    else {
        $html = '';
        foreach ($contents as $content) {
            if( $content['public']==='1' || ($args->username && strlen($args->username)>0))
            $html .= generateContent($content);
        }
        return new Reply('ok', $html);
    }
}

function generateContent( array $content): string  {

    $html = '<section class="content-item" id="sec-' . $content['id'] . '"'; 
    if( strlen($content['style']) > 0 ) {
        $html .= ' style="' . $content['style'] . '"' ;
    }
    $html.= 'pub="'. ($content['public']==='1'?'true':'false') .'" ';
    $html.= ' onmousedown="contentSelected(\'sec-'.$content['id'].'\')">';
    $html.= $content['html'];
    $html.= '</section>';
    return $html;
}

?>