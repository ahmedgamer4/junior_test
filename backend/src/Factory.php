<?php

class Factory
{
  private Database $database;
  private array $product_types;

  public function __construct(Database $database)
  {
    $this->database = $database;
    $this->product_types = [
      'size' => DVDProductGateway::class,
      'dimensions' => FurProductGateway::class,
      'weigth' => BookProductGateway::class,
    ];
  }
  public function makeProduct(array $data)
  {
    foreach ($data as $key => $value) {
      if (isset($this->product_types[$key]) && !empty($data[$key])) {
        $productClass = $this->product_types[$key];
        return new $productClass($this->database);
      }
    }

    return new DVDProductGateway($this->database);
  }
}