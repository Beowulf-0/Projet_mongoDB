<?php
class Router {
    public static function handleRequest() {
        $uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
        $method = $_SERVER['REQUEST_METHOD'];

        // Add your routes here
        switch($uri) {
            case '/api/test':
                echo json_encode(['message' => 'API is working']);
                break;
            default:
                http_response_code(404);
                echo json_encode(['error' => 'Not found']);
                break;
        }
    }
}