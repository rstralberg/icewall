<?php 

require_once __DIR__ . '/../utils/strings.php';

function sqlString( mysqli $mysqli, string $str) : string {
    return surround(mysqli_real_escape_string($mysqli,$str),'\'');
}

function sqlBoolean(bool $v) : int {
    return $v?1:0;
}

function sqlName(string $str) : string {
    return surround($str, '`');
}

function dbConnect(): mysqli
{
	$myscli = mysqli_connect(DB_HOST, DB_USER, gethostname() === DEV_HOSTNAME ? DB_PASSW_DEVEL : DB_PASSW);
    if ($myscli === null) {
		throw new Exception('MySQL connection failed');
	}

	mysqli_query($myscli, 'CREATE DATABASE IF NOT EXISTS ' . DB_DATABASE);
	$myscli->close();
	
	$myscli = mysqli_connect(DB_HOST, DB_USER, gethostname() === DEV_HOSTNAME ? DB_PASSW_DEVEL : DB_PASSW);
	if ($myscli->connect_error) {
		throw new Exception( 'Failed to open database ' . DB_DATABASE . ': ' . $myscli->connect_error);
	}

	mysqli_query($myscli, 'USE ' . DB_DATABASE);
	return $myscli;
}

function dbDisonnect(mysqli $mysqli) : void {
    if( $mysqli ) mysqli_close($mysqli);
}

// returns true if table was created
function dbCreate(mysqli $mysqli, 
    string $table, 
    array $cols,
    array $defs ) : bool {
    
    if( !dbTableExist($mysqli, $table) ) {
        
        $query = 'CREATE TABLE ' . sqlName($table) . '(';
        for( $i=0; $i < count($defs); $i++) {
            $query .= sqlName($cols[$i]) . ' ' . $defs[$i] . ',';
        }
        $query.= 'PRIMARY KEY (' . sqlName('id') . ') ';
        $query.= ') ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_swedish_ci';
        
        return mysqli_query($mysqli, $query);
    }
    return false;
}

function dbTableExist(mysqli $mysqli, string $table): bool
{
	$query = 'SELECT count(*) FROM information_schema.tables WHERE table_schema = "' . DB_DATABASE . '" AND table_name = "' . $table . '"';
	try {
		$res = mysqli_query($mysqli, $query);
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

function dbSelect(mysqli $mysqli, 
    string $table, 
    array $cols, 
    string $where = null, 
    string $order = null, 
    string $opt = null ) : array | bool {

    $query = 'SELECT ';

    foreach ($cols as $col) {
        $query .= sqlName($col) . ',';
    }
    $query = trimEnd($query,1);
    $query .= ' FROM ' . sqlName($table) ;
    if( $where ) $query .= ' WHERE ' . $where ;
    if( $order ) $query .= ' ORDER BY ' . $order ;
    if( $opt ) $query .= ' ' . $opt;

    $result = mysqli_query($mysqli, $query );
    if( $result === false ) return false;

    $rows = array();
    while ($record = mysqli_fetch_assoc($result)) {
		array_push($rows, $record);
	}
	return $rows;
}

function dbInsert( mysqli $mysqli, 
    string $table, 
    array $cols, 
    array $values ) : int | bool {

    $query = 'INSERT INTO ' . sqlName($table) . ' (';
    
    for( $i=0; $i < count($cols); $i++ ) {
        $query .= sqlName($cols[$i]) . ',';
    }
    $query = trimEnd($query,1);
    $query.= ') VALUES (';
    for( $i=0; $i < count($values); $i++ ) {
        $query .= $values[$i] . ',';
    }
    $query = trimEnd($query,1);
    $query .= ')';

    $result = mysqli_query($mysqli, $query );
    if( $result === false ) return false;
    return $mysqli->insert_id;
}

function dbUpdate( mysqli $mysqli, 
    string $table, 
    array $cols, 
    array $values,
    string $where ) : bool {
    
    $query = 'UPDATE ' . sqlName($table) . ' SET ';

    $values = array_values($values);
    for( $i=0; $i < count($cols); $i++ ) {
        $query .= sqlName($cols[$i]) . '=' . $values[$i] . ',';
    }
    $query = trimEnd($query,1);
    $query.= ' ';
    $query.= 'WHERE ' . $where;

    return mysqli_query($mysqli, $query );
}

function dbDelete( mysqli $mysqli, 
    string $table, 
    string $where ) : bool {
    
    $query = 'DELETE FROM ' . sqlName($table) . ' ';
    $query.= 'WHERE ' . $where;

    return mysqli_query($mysqli, $query);
}

?>