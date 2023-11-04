<?php

function deleteFiles($dir) {
    if (is_dir($dir)) {
        $files = scandir($dir);
        foreach ($files as $file) {
            if ($file != "." && $file != "..") {
                $filePath = $dir . DIRECTORY_SEPARATOR . $file;
                if (is_dir($filePath)) {
                    // If it's a directory, recursively call the function
                    deleteFiles($filePath);
                } else {
                    // If it's a file, delete it
                    unlink($filePath);
                }
            }
        }
        // After deleting all files, remove the directory itself
        rmdir($dir);
    }
}

?>
