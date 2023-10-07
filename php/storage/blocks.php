<?php

require_once __DIR__ . '/db.php';

function createBlocks(mysqli $mysqli): void
{

    if (
        dbCreate(
            $mysqli,
            'blocks',
            ['id', 'pageId', 'style', 'html', 'pos', 'public'],
            [
                'INT(11) NOT NULL AUTO_INCREMENT',
                'INT(11) DEFAULT NULL',
                'TEXT DEFAULT NULL',
                'TEXT DEFAULT NULL',
                'INT DEFAULT NULL',
                'TINYINT DEFAULT NULL',

            ]
        )
    ) {

        $pageId = getFirstPageId($mysqli);

        dbInsert(
            $mysqli,
            'blocks',
            ['pageId', 'style', 'html', 'pos', 'public'],
            [
                $pageId,
                sqlString( $mysqli,'text-algin:center'),
                sqlString( $mysqli,'Välkommen till <strong>IceWall</strong>'),
                0,
                sqlBoolean(false)
            ]
        ); // pos
    }
}

function selectBlock(mysqli $mysqli, int $id): array
{
    return dbSelect($mysqli, 'blocks', 
        [ 'pageId', 'style', 'html', 'pos', 'public'], 
        sqlName('id') . '=' . $id);
}

function selectBlocks(mysqli $mysqli, int $pageId): array
{
    return dbSelect($mysqli, 'blocks', 
        ['id', 'pageId', 'style', 'html', 'pos', 'public'], 
        sqlName('pageId') . '=' . $pageId, sqlName('pos') . ' asc');
}

function insertBlock(mysqli $mysqli, $values): int
{
    return dbInsert($mysqli, 'blocks', [ 'pageId', 'style', 'html', 'pos', 'public'], $values);
}

function updateBlock(mysqli $mysqli, $id, $values): int
{
    return dbUpdate($mysqli, 'blocks', 
        ['pageId', 'style', 'html', 'pos', 'public'], $values, sqlName('id') . '=' . $id);
}

function deleteBlock(mysqli $mysqli, $id): void
{
    dbDelete($mysqli, 'blocks', sqlName('id') . '=' . $id);
}

function deletePageBlocks(mysqli $mysqli, $pageId): void
{
    dbDelete($mysqli, 'blocks', sqlName('pageId') . '=' . $pageId);
}
