<?php

require_once __DIR__ . '/../utils/db.php';
require_once __DIR__ . '/../config.php';

const PageCols = [
    'title',
    'parentId',
    'isParent',
    'author',
    'showTitle',
    'pos',
    'public',
    'wContent',
    'rContent',
    'shContent',
    'bdColContent',
    'bdSizeContent',
    'bgContent',
    'fgContent',
    'fzContent',
    'dContent'
];

function createPage(Db $db): void
{

    if (
        $db->createTable( 'page', array_merge(['id'], PageCols), [
            'INT(11) NOT NULL AUTO_INCREMENT',
            // id
            'VARCHAR(60) NOT NULL DEFAULT \'Start\'',
            // title
            'INT(11) NOT NULL DEFAULT 0',
            // pageId
            'TINYINT NOT NULL DEFAULT 0',
            // isParent
            'VARCHAR(120) NOT NULL DEFAULT \''.DEFAULT_USERNAME.'\'',
            // author
            'TINYINT NOT NULL DEFAULT 1',
            // showTitle
            'TINYINT NOT NULL DEFAULT 0',
            // pos
            'TINYINT NOT NULL DEFAULT 1',
            // public
            'TINYINT NOT NULL DEFAULT 80',
            // wContent'
            'TINYINT NOT NULL DEFAULT 16',
            // rContent'
            'TINYINT NOT NULL DEFAULT 1',
            // shContent'
            'VARCHAR(10) NOT NULL DEFAULT \'#ffffff\'',
            // bdColContent'
            'TINYINT NOT NULL DEFAULT 1',
            // bdSizeContent'
            'VARCHAR(10) NOT NULL DEFAULT \'#404040\'',
            // bgContent'
            'VARCHAR(10) NOT NULL DEFAULT \'#aaaaaa\'',
            // fgContent'
            'FLOAT NOT NULL DEFAULT 1.0',
            // fzContent'
            'TINYINT NOT NULL DEFAULT 3',
            // dContent
        ])
    ) {
        $db->addDefaultRow( 'page');
    }
}

function selectPage(Db $db, int|null $id): array
{
    if( $id === null || $id === 0 ) {
        $id = getFirstPageId($db);
    }
    return $db->select( 'page', array_merge(['id'],PageCols), $db->name('id') . '=' . $id);
}

function selectPages(Db $db): array
{
    return $db->select( 'page', array_merge(['id'],PageCols), null, $db->name('pos') . ' asc');
}

function selectChildPages(Db $db, $id): array
{
    return $db->select( 'page', array_merge(['id'],PageCols), $db->name('parentId') . '=' . $id, $db->name('pos') . ' asc');
}

function insertPage(Db $db, $values): int
{
    $PageThemeDefaults =  [
        80,
        16,
        1,
        $db->string('#ffffff'),
        1,
        $db->string('#404040'),
        $db->string('#aaaaaa'),
        1.0,
        3,
    ];
    $values = array_merge($values, $PageThemeDefaults );
    return $db->insert( 'page', PageCols, $values);
}

function updatePage(Db $db, $cols, $values, $where): int
{
    return $db->update( 'page', $cols, $values, $where);
}

function updatePagePos(Db $db, $positions): void
{   
    for($i=0; $i < count($positions); $i++) {
        $position = $positions[$i];
        $db->update( 'page', ['pos'], [$position->pos], $db->name('id') . '=' . $position->id);
    }
}
function updatePageParent(Db $db, $pageId, $parentId): void
{   
    $db->update( 'page', ['parentId'], [$parentId], $db->name('id') . '=' . $pageId);
}

function updatePagePublic(Db $db, $pageId, $pub): void
{   
    $db->update( 'page', ['public'], [$db->bool($pub)], $db->name('id') . '=' . $pageId);
}
function updatePageTitle(Db $db, int $pageId, string $title): void
{   
    $db->update( 'page', ['title'], [$db->string($title)], $db->name('id') . '=' . $pageId);
}

function updateShowPageTitle(Db $db, int $pageId, bool $show) : void {
    $db->update( 'page', ['showTitle'], [$db->bool($show)], $db->name('id') . '=' . $pageId);
}

function deletePage(Db $db, $id): void
{
    $db->delete( 'page', $db->name('id') . '=' . $id);
}


function selectPageGroup(Db $db, string $where) : array {
    $pages = $db->select(
        'page',
        array_merge(['id'], PageCols),
        $where,
        $db->name('pos') . ' asc'
    );
    return $pages;
}

?>