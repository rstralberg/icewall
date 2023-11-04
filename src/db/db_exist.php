<?php

require_once __DIR__ . '/../config.php';

function db_exist(string $dbName): bool
{
    $mysqli = mysqli_connect(DB_HOST, DB_USER, gethostname() === DEV_HOSTNAME ? DB_PASSW_DEVEL : DB_PASSW);
    if ($mysqli === null) {
        throw new Exception('MySQL connection failed');
    }

    $exist = false;
    try {
        $exist = mysqli_select_db($mysqli, $dbName) !== null;
    } catch (Exception $e) {
    }
    mysqli_close($mysqli);
    return $exist;
}
