<?php

require_once __DIR__ . '/db.php';
require_once __DIR__ . '/content.php';
require_once __DIR__ . '/page.php';
require_once __DIR__ . '/sites.php';


const ContentCols = [
    'pageId',
    'html',
    'pos',
    'public'
];

function initializeContent(Db $db, $sitename): void
{
    if (
        $db->createTable(
            'content',[
                'pageId',
                'html',
                'pos',
                'public'
            ],
            [
                'INT(11) NOT NULL DEFAULT 0',
                'TEXT NOT NULL DEFAULT \'Välkommen till <strong>' . $sitename . '</strong>\'',
                'TINYINT NOT NULL DEFAULT 0',
                'TINYINT NOT NULL DEFAULT 1'
            ]
        )
    ) {

        $contentId = $db->addDefaultRow('content');
        $pageId = $db->select('page', ['id'], null, $db->name('pos').' ASC', 'LIMIT 1')[0]['id'];
        $db->update('content', ['pageId'], [$pageId], 'id=' . $contentId);
    }
}

// function selectContent(Db $db, int $id): array
// {
//     return $db->select(
//         'content',
//         array_merge(['id'], ContentCols),
//         $db->name('id') . '=' . $id
//     );
// }

// function selectContents(Db $db, int $pageId): array
// {
//     return $db->select(
//         'content',
//         array_merge(['id'], ContentCols),
//         $db->name('pageId') . '=' . $pageId,
//         $db->name('pos') . ' asc'
//     );
// }

// function insertContent(Db $db, $values): int
// {
//     return $db->insert('content', ContentCols, $values);
// }

// // function updateContent(Db $db, $id, $values): int
// // {
// //     return $db->update( 'content', 
// //         ContentCols, $values, $db->name('id') . '=' . $id);
// // }

// function updateContent(Db $db, $cols, $values, $id): bool
// {
//     return $db->update('content', $cols, $values, 'id=' . $id);
// }

// function deleteContent(Db $db, $id): void
// {
//     $db->delete('content', $db->name('id') . '=' . $id);
// }

// function deletePageContents(Db $db, $pageId): void
// {
//     $db->delete('content', $db->name('pageId') . '=' . $pageId);
// }


// function getContent(stdClass $args): Reply
// {
//     $argError = argError('getContent',$args, [
//         'pageId' => $args->pageId,
//         'username' => $args->username        
//     ]);
//     if($argError) return $argError;

//     $db = new Db($args->database);
//     $db->open();

//     $page = selectPage($db, $args->pageId);
//     $contents = selectContents($db, $args->pageId);

//     $db->close();

//     if (!$contents) {
//         return new Reply(false, 'Sidan ' . $page['title'] . ' är tom');
//     } else {
//         $html = '';
//         foreach ($contents as $content) {
//             if ($content['public'] === '1' || ($args->username && strlen($args->username) > 0))
//                 $html .= generateContent($content);
//         }
//         return new Reply(true, $html);
//     }
// }

// function generateContent(array $content): string
// {

//     $html = '<section class="content-item" id="sec-' . $content['id'] . '"';
//     $html .= 'pub="' . ($content['public'] === '1' ? 'true' : 'false') . '" ';
//     $html .= ' onmousedown="contentSelected(\'sec-' . $content['id'] . '\')">';
//     $html .= $content['html'];
//     $html .= '</section>';
//     return $html;
// }

// function getContentPublic(stdClass $args): Reply
// {
//     $db = new Db($args->database);
//     $db->open();

//     $contents = $db->select('content', ['public'], $db->name('id') . '=' . $args->id);
//     $lastError = $db->lastError();
//     $db->close();

//     if (!$contents)
//         return new Reply(false, $lastError);
//     else {
//         $content = $contents[0];
//         return new Reply(true, $content['public']);
//     }
// }

// function content():string {
//     return loadHTML(__DIR__. '/html/content.html');
// }



?>