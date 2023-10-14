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
    'style'
];
function createPage(Db $db): void
{

    if (
        $db->createTable( 'page', array_merge(['id'], PageCols), [
            'INT(11) NOT NULL AUTO_INCREMENT',
                        'VARCHAR(60) NOT NULL DEFAULT \'Start\'',
            'INT(11) NOT NULL DEFAULT 0',
            'TINYINT NOT NULL DEFAULT 0',
            'VARCHAR(120) NOT NULL DEFAULT \''.DEFAULT_USERNAME.'\'',
            'TINYINT NOT NULL DEFAULT 1',
            'TINYINT NOT NULL DEFAULT 0',
            'TINYINT NOT NULL DEFAULT 1',
            'VARCHAR(64) NOT NULL DEFAULT \'Standard\'',
        ])
    ) {
        $db->addDefaultRow( 'page');
    }
}

function selectPage(Db $db, int|null $id): array
{
    if( $id === null) {
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
    return $db->insert( 'page', PageCols, $values);
}

function updatePage(Db $db, $id, $values): int
{
    return $db->update( 'page', PageCols, $values, $db->name('id') . '=' . $id);
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

function getFirstPageId(Db $db)
{
    $pages = $db->select(
        'page', ['id'],
        $db->name('isParent') . '=' . $db->bool(false) . ' AND ' .
        $db->name('public') . '=1' .  ' AND ' .
        $db->name('parentId') . '=0',
        $db->name('pos') . ' asc',
        'LIMIT 1'
    );
    if( !$pages) {
        $pages = $db->select(
            'page', ['id'],
            $db->name('isParent') . '=' . $db->bool(false) . ' AND ' .
            $db->name('parentId') . '=0',
            $db->name('pos') . ' asc',
            'LIMIT 1'
        );
    }
    return $pages ? $pages[0]['id'] : -1;
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