<?php
class Factory
{
  private Database $database;

  public function __construct(Database $database)
  {
    $this->database = $database;
  }
  public function makeProduct(array $data)
  {
    if (!empty($data['size'])) {
      return new DVDProductGateway($this->database);
    }
    if (!empty($data['weight'])) {
      return new BookProductGateway($this->database);
    }
    if (!empty($data['dimensions'])) {
      return new FurProductGateway($this->database);
    }
    return new DVDProductGateway($this->database);
  }
}