<?php

function db_create_database(string $database) : bool {

    $db = mysqli_connect(DB_HOST, DB_USER, DB_PASSW);
    if ($db === null) {
        return false;
    }

    mysqli_query($db, 'CREATE DATABASE IF NOT EXISTS ' . $database);
    $db->close();

    $db = mysqli_connect(DB_HOST, DB_USER, gethostname() === DEV_HOSTNAME ? DB_PASSW_DEVEL : DB_PASSW);
    if ($db->connect_error) {
        return false;
    }
    $db->close();
    return true;
}