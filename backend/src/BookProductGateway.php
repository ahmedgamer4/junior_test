<?php

class BookProductGateway extends ProductGateway
{
  public function create(array $data): string
  {
    $sql = "INSERT INTO product (name, price, sku, weight)
                VALUES (:name, :price, :sku, :weight)";

    $stmt = $this->conn->prepare($sql);

    $stmt->bindValue(":name", $data["name"], PDO::PARAM_STR);
    $stmt->bindValue(":sku", $data["sku"] ?? 'placeholder', PDO::PARAM_STR);
    $stmt->bindValue(":price", $data["price"] ?? 0, PDO::PARAM_INT);
    $stmt->bindValue(":weight", $data["weight"], PDO::PARAM_INT);

    $stmt->execute();

    return $this->conn->lastInsertId();
  }
}