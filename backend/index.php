<?php
declare(strict_types=1);

spl_autoload_register(function ($class) {
    require __DIR__ . "/src/$class.php";
});

set_error_handler("ErrorHandler::handleError");
set_exception_handler("ErrorHandler::handleException");

// header('Access-Control-Allow-Origin: *');
// header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
// header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');

$parts = explode("/", $_SERVER["REQUEST_URI"]);

if ($parts[1] == "products") {
    header("Content-type: application/json; charset=UTF-8");
    $id = $parts[2] ?? null;

    $database = new Database("localhost", "product_db", "root", "ahmedalseidy");

    $gateway = new ProductGateway($database);

    $controller = new ProductController($gateway);

    $controller->processRequest($_SERVER["REQUEST_METHOD"], $id);
} else {
    ?>
    <!DOCTYPE html>
    <html>

    <head>
        <title>My React App</title>
        <script type="module" crossorigin src="./dist/assets/index-141f64aa.js"></script>
        <link rel="stylesheet" href="./dist/assets/index-4bb23c53.css">
    </head>

    <body>
        <div class="bg-slate-900" id="root"></div>
    </body>

    </html>
    <?php
    exit;
}