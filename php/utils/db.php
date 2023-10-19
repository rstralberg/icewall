<?php

require_once __DIR__ . '/../utils/strings.php';
require_once __DIR__ . '/../site/site.php';

class Db
{
    private mysqli $mysqli;
    private string $dbUser;
    private string $dbPassword;
    public string $dbDatabase;

    public function __construct(string|null $key=null)
    {

        $this->dbUser = DB_USER;
        $this->dbPassword = gethostname() === DEV_HOSTNAME ? DB_PASSW_DEVEL : DB_PASSW;
        $this->dbDatabase = DB_DATABASE;
        $this->open();
        $this->createTable('sites', [
            'id',
            'key',
            'name',
            'url',
            'owner',
            'logo',
            'admin',
            'email',
            'dbUser',
            'dbDatabase',
            'dbPassword'
        ], [
            'INT(11) NOT NULL AUTO_INCREMENT',
            // id
            'VARCHAR(64) NOT NULL',
            // key
            'VARCHAR(128) NOT NULL',
            // name
            'VARCHAR(256) NOT NULL',
            // url
            'VARCHAR(256) NOT NULL',
            // owner
            'VARCHAR(256) NOT NULL',
            // logo
            'VARCHAR(128) NOT NULL',
            // admin
            'VARCHAR(128) NOT NULL',
            // email
            'VARCHAR(128) NOT NULL',
            // dbUser
            'VARCHAR(128) NOT NULL',
            // dbDatabase
            'VARCHAR(128) NOT NULL' // dbPassword
        ]);

        if( $key ) {
            $sites = $this->select('sites', [
                'name',
                'url',
                'owner',
                'logo',
                'admin',
                'email',
                'dbUser',
                'dbDatabase',
                'dbPassword'
            ], $this->name('key').'='.$this->string($key));
            if( !$sites ) {
                die( 'Can\'t open database for site key "'.$key.'"');
            }
            $site = $sites[0];
            $this->close();
            $this->dbDatabase = $site['dbDatabase'];
            $this->dbUser = $site['dbUser'];
            $this->dbPassword = $site['dbPassword'];
        }
    }   

    static function databaseExist(string $dbName): bool
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


    function open(): bool
    {
        $this->mysqli = mysqli_connect(DB_HOST, $this->dbUser, $this->dbPassword);
        if ($this->mysqli === null) {
            throw new Exception('MySQL connection failed');
        }

        mysqli_query($this->mysqli, 'CREATE DATABASE IF NOT EXISTS ' . $this->dbDatabase);
        $this->mysqli->close();

        $this->mysqli = mysqli_connect(DB_HOST, DB_USER, gethostname() === DEV_HOSTNAME ? DB_PASSW_DEVEL : DB_PASSW);
        if ($this->mysqli->connect_error) {
            throw new Exception('Failed to open database ' . $this->dbDatabase . ': ' . $this->mysqli->connect_error);
        }

        mysqli_query($this->mysqli, 'USE ' . $this->dbDatabase);

        return $this->mysqli !== null;
    }

    function close(): void
    {
        if ($this->mysqli)
            mysqli_close($this->mysqli);
    }

    // returns true if table was created
    function createTable(
        string $table,
        array $cols,
        array $defs
    ): bool {

        if (!$this->tableExist($table)) {

            $query = 'CREATE TABLE ' . $this->name($table) . '(';
            for ($i = 0; $i < count($defs); $i++) {
                $query .= $this->name($cols[$i]) . ' ' . $defs[$i] . ',';
            }
            $query .= 'PRIMARY KEY (' . $this->name('id') . ') ';
            $query .= ') ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_swedish_ci';

            return mysqli_query($this->mysqli, $query);
        }
        return false;
    }

    function tableExist(string $table): bool
    {
        $query = 'SELECT count(*) FROM information_schema.tables WHERE table_schema = "' . $this->dbDatabase . '" AND table_name = "' . $table . '"';
        try {
            $res = mysqli_query($this->mysqli, $query);
        } catch (Exception $e) {
            echo ('PHP: Database execption  [' . $query . '] ' . '<br>' . $e->getMessage());
            echo ('PHP: Error [' . $e->getMessage() . ']');
            return false;
        }
        if ($res === false)
            return false;

        if (mysqli_num_rows($res) === 0)
            return false;
        $data = mysqli_fetch_assoc($res);

        if ($data === null)
            return false;

        return $data['count(*)'] > 0;
    }

    function select(
        string $table,
        array $cols,
        string $where = null,
        string $order = null,
        string $opt = null
    ): array|bool {

        $query = 'SELECT ';

        foreach ($cols as $col) {
            $query .= $this->name($col) . ',';
        }
        $query = trimEnd($query, 1);
        $query .= ' FROM ' . $this->name($table);
        if ($where)
            $query .= ' WHERE ' . $where;
        if ($order)
            $query .= ' ORDER BY ' . $order;
        if ($opt)
            $query .= ' ' . $opt;

        $result = mysqli_query($this->mysqli, $query);
        if ($result === false)
            return false;

        $rows = array();
        while ($record = mysqli_fetch_assoc($result)) {
            array_push($rows, $record);
        }
        return $rows;
    }

    function insert(
        string $table,
        array $cols,
        array $values
    ): int|bool {

        $query = 'INSERT INTO ' . $this->name($table) . ' (';

        for ($i = 0; $i < count($cols); $i++) {
            $query .= $this->name($cols[$i]) . ',';
        }
        $query = trimEnd($query, 1);
        $query .= ') VALUES (';
        for ($i = 0; $i < count($values); $i++) {
            $query .= $values[$i] . ',';
        }
        $query = trimEnd($query, 1);
        $query .= ')';

        $result = mysqli_query($this->mysqli, $query);
        if ($result === false)
            return false;
        return $this->mysqli->insert_id;
    }

    function addDefaultRow(string $table): int
    {
        mysqli_query($this->mysqli, 'INSERT INTO ' . $this->name($table) . '() VALUES ()');
        return $this->mysqli->insert_id;
    }

    function update(
        string $table,
        array $cols,
        array $values,
        string $where
    ): bool {

        $query = 'UPDATE ' . $this->name($table) . ' SET ';

        $values = array_values($values);
        for ($i = 0; $i < count($cols); $i++) {
            $query .= $this->name($cols[$i]) . '=' . $values[$i] . ',';
        }
        $query = trimEnd($query, 1);
        $query .= ' ';
        $query .= 'WHERE ' . $where;

        return mysqli_query($this->mysqli, $query);
    }

    function delete(
        string $table,
        string $where
    ): bool {

        $query = 'DELETE FROM ' . $this->name($table) . ' ';
        $query .= 'WHERE ' . $where;

        return mysqli_query($this->mysqli, $query);
    }

    function where(string $col, string $value): string
    {
        return $this->name($col) . '=' . $this->string($value);
    }

    function were(string $col, int $value): string
    {
        return $this->name($col) . '=' . $value;
    }

    function string(string $str): string
    {
        return surround(mysqli_real_escape_string($this->mysqli, $str), '\'');
    }

    function bool(bool $v): int
    {
        return $v ? 1 : 0;
    }

    function name(string $str): string
    {
        return surround($str, '`');
    }

    function lastError(): string
    {
        return mysqli_error($this->mysqli);
    }


}

?>