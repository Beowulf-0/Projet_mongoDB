<?php
require 'vendor/autoload.php';

class Database {
    private $client;
    private $database;

    public function __construct() {
        try {
            // Connexion à MongoDB
            $this->client = new MongoDB\Client("mongodb://localhost:27017");
            $this->database = $this->client->vacation_booking;
        } catch (MongoDB\Driver\Exception\Exception $e) {
            echo "Erreur de connexion à MongoDB: " . $e->getMessage();
        }
    }

    public function getDatabase() {
        return $this->database;
    }
}