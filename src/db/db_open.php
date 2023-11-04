<?php

require_once __DIR__ . '/../config.php';

function db_open(string $database ) : mysqli | null {
        
    $db = mysqli_connect(DB_HOST, DB_USER, DB_PASSW);
    if ($db === null) {
        return null;
    }

    mysqli_query($db, 'CREATE DATABASE IF NOT EXISTS ' . $database);
    $db->close();

    $db = mysqli_connect(DB_HOST, DB_USER, gethostname() === DEV_HOSTNAME ? DB_PASSW_DEVEL : DB_PASSW);
    if ($db->connect_error) {
        return null;
    }

    mysqli_query($db, 'USE ' . $database);
    return $db;
}

