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
function createPage(mysqli $mysqli): void
{

    if (
        dbCreate($mysqli, 'page', array_merge(['id'], PageCols), [
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
        dbAddDefaultRow($mysqli, 'page');
    }
}

function selectPage(mysqli $mysqli, int|null $id): array
{
    if( $id === null) {
        $id = getFirstPageId($mysqli);
    }
    return dbSelect($mysqli, 'page', array_merge(['id'],PageCols), sqlName('id') . '=' . $id);
}

function selectPages(mysqli $mysqli): array
{
    return dbSelect($mysqli, 'page', array_merge(['id'],PageCols), null, sqlName('pos') . ' asc');
}

function selectChildPages(mysqli $mysqli, $id): array
{
    return dbSelect($mysqli, 'page', array_merge(['id'],PageCols), sqlName('parentId') . '=' . $id, sqlName('pos') . ' asc');
}

function insertPage(mysqli $mysqli, $values): int
{
    return dbInsert($mysqli, 'page', PageCols, $values);
}

function updatePage(mysqli $mysqli, $id, $values): int
{
    return dbUpdate($mysqli, 'page', PageCols, $values, sqlName('id') . '=' . $id);
}

function updatePagePos(mysqli $mysqli, $positions): void
{   
    for($i=0; $i < count($positions); $i++) {
        $position = $positions[$i];
        dbUpdate($mysqli, 'page', ['pos'], [$position->pos], sqlName('id') . '=' . $position->id);
    }
}
function updatePageParent(mysqli $mysqli, $pageId, $parentId): void
{   
    dbUpdate($mysqli, 'page', ['parentId'], [$parentId], sqlName('id') . '=' . $pageId);
}

function updatePagePublic(mysqli $mysqli, $pageId, $pub): void
{   
    dbUpdate($mysqli, 'page', ['public'], [sqlBoolean($pub)], sqlName('id') . '=' . $pageId);
}
function updatePageTitle(mysqli $mysqli, int $pageId, string $title): void
{   
    dbUpdate($mysqli, 'page', ['title'], [sqlString( $mysqli, $title)], sqlName('id') . '=' . $pageId);
}

function updateShowPageTitle(mysqli $mysqli, int $pageId, bool $show) : void {
    dbUpdate($mysqli, 'page', ['showTitle'], [sqlBoolean($show)], sqlName('id') . '=' . $pageId);
}

function deletePage(mysqli $mysqli, $id): void
{
    dbDelete($mysqli, 'page', sqlName('id') . '=' . $id);
}

function getFirstPageId(mysqli $mysqli)
{
    $pages = dbSelect(
        $mysqli,
        'page', ['id'],
        sqlName('isParent') . '=' . sqlBoolean(false) . ' AND ' .
        sqlName('public') . '=1' .  ' AND ' .
        sqlName('parentId') . '=0',
        sqlName('pos') . ' asc',
        'LIMIT 1'
    );
    if( !$pages) {
        $pages = dbSelect(
            $mysqli,
            'page', ['id'],
            sqlName('isParent') . '=' . sqlBoolean(false) . ' AND ' .
            sqlName('parentId') . '=0',
            sqlName('pos') . ' asc',
            'LIMIT 1'
        );
    }
    return $pages ? $pages[0]['id'] : -1;
}

function selectPageGroup(mysqli $mysqli, string $where) : array {
    $pages = dbSelect(
        $mysqli,
        'page',
        array_merge(['id'], PageCols),
        $where,
        sqlName('pos') . ' asc'
    );
    return $pages;
}

?>