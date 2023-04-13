<?php

class DVDProductGateway extends ProductGateway
{
  public function create(array $data): string
  {
    $sql = "INSERT INTO product (name, price, sku, size)
                VALUES (:name, :price, :sku, :size)";

    $stmt = $this->conn->prepare($sql);

    $stmt->bindValue(":name", $data["name"], PDO::PARAM_STR);
    $stmt->bindValue(":sku", $data["sku"] ?? 'placeholder', PDO::PARAM_STR);
    $stmt->bindValue(":size", $data["size"] ?? 0, PDO::PARAM_INT);
    $stmt->bindValue(":price", $data["price"] ?? 0, PDO::PARAM_INT);

    $stmt->execute();

    return $this->conn->lastInsertId();
  }
}