<?php

require_once __DIR__ . '/db.php';
require_once __DIR__ . '/../config.php';

function createPages(mysqli $mysqli): void
{

    if (
        dbCreate($mysqli, 'pages', [
            'id',
            'title',
            'parentId',
            'isParent',
            'author',
            'showTitle',
            'pos',
            'public'
        ], [
            'INT(11) NOT NULL AUTO_INCREMENT',
            'VARCHAR(60) DEFAULT NULL',
            'INT(11) DEFAULT NULL',
            'TINYINT DEFAULT NULL',
            'VARCHAR(120) DEFAULT NULL',
            'TINYINT DEFAULT NULL',
            'INT DEFAULT NULL',
            'TINYINT DEFAULT NULL'
        ])
    ) {

        dbInsert($mysqli, 'pages', [
            'title',
            'parentId',
            'isParent',
            'author',
            'showTitle',
            'pos',
            'public'
        ], [
            sqlString( $mysqli, 'Start'),
            0,
            sqlBoolean(false),
            sqlString( $mysqli, DEFAULT_USERNAME),
            sqlBoolean(true),
            0,
            sqlBoolean(false)
        ]); 
    }
}

function selectPage(mysqli $mysqli, int|null $id): array
{
    if( $id === null) {
        $id = getFirstPageId($mysqli);
    }
    return dbSelect($mysqli, 'pages', [
        'id',
        'title',
        'parentId',
        'isParent',
        'author',
        'showTitle',
        'pos',
        'public'
    ], sqlName('id') . '=' . $id);
}

function selectPages(mysqli $mysqli): array
{
    return dbSelect($mysqli, 'pages', [
        'id',
        'title',
        'parentId',
        'isParent',
        'author',
        'showTitle',
        'pos',
        'public'
    ], null, sqlName('pos') . ' asc');
}

function selectChildPages(mysqli $mysqli, $id): array
{
    return dbSelect($mysqli, 'pages', [
        'id',
        'title',
        'parentId',
        'isParent',
        'author',
        'showTitle',
        'pos',
        'public'
    ], sqlName('parentId') . '=' . $id, sqlName('pos') . ' asc');
}

function insertPage(mysqli $mysqli, $values): int
{
    return dbInsert($mysqli, 'pages', [
        'title',
        'parentId',
        'isParent',
        'author',
        'showTitle',
        'pos',
        'public'
    ], $values);
}

function updatePage(mysqli $mysqli, $id, $values): int
{
    return dbUpdate($mysqli, 'pages', [
        'title',
        'parentId',
        'isParent',
        'author',
        'showTitle',
        'pos',
        'public'
    ], $values, sqlName('id') . '=' . $id);
}

function updatePagePos(mysqli $mysqli, $pages): void
{   
    for($i=0; $i < count($pages); $i++) {
        $page = $pages[$i];
        dbUpdate($mysqli, 'pages', ['pos'], [$page->pos], sqlName('id') . '=' . $page->pageId);
    }
}
function updatePageParent(mysqli $mysqli, $pageId, $parentId): void
{   
    dbUpdate($mysqli, 'pages', ['parentId'], [$parentId], sqlName('id') . '=' . $pageId);
}

function updatePageTitle(mysqli $mysqli, int $pageId, string $title): void
{   
    dbUpdate($mysqli, 'pages', ['title'], [sqlString( $mysqli, $title)], sqlName('id') . '=' . $pageId);
}

function updateShowPageTitle(mysqli $mysqli, int $pageId, bool $show) : void {
    dbUpdate($mysqli, 'pages', ['showTitle'], [sqlBoolean($show)], sqlName('id') . '=' . $pageId);
}

function deletePage(mysqli $mysqli, $id): void
{
    dbDelete($mysqli, 'pages', sqlName('id') . '=' . $id);
}

function getFirstPageId(mysqli $mysqli)
{
    $pages = dbSelect(
        $mysqli,
        'pages', ['id'],
        sqlName('isParent') . '=' . sqlBoolean(false) . ' AND ' .
        sqlName('public') . '=1' .  ' AND ' .
        sqlName('parentId') . '=0',
        sqlName('pos') . ' asc',
        'LIMIT 1'
    );
    if( !$pages) {
        $pages = dbSelect(
            $mysqli,
            'pages', ['id'],
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
        'pages',
        [
            'id',
            'title',
            'parentId',
            'isParent',
            'author',
            'showTitle',
            'pos',
            'public'
        ],
        $where,
        sqlName('pos') . ' asc'
    );
    return $pages;
}

?>