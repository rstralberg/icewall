<?php
require_once __DIR__ . '/../generators/navbar.php';

function onNavbar( stdClass|null $args) : Reply {
    return generate_navbar($args->theme, $args?$args->username:null);
}
?>