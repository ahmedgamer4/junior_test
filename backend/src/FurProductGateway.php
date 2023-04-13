<?php

class FurProductGateway extends ProductGateway
{
  public function create(array $data): string
  {
    $sql = "INSERT INTO product (name, price, sku, dimensions)
                VALUES (:name, :price, :sku, :dimensions)";

    $stmt = $this->conn->prepare($sql);

    $stmt->bindValue(":name", $data["name"], PDO::PARAM_STR);
    $stmt->bindValue(":sku", $data["sku"] ?? 'placeholder', PDO::PARAM_STR);
    $stmt->bindValue(":price", $data["price"] ?? 0, PDO::PARAM_INT);
    $stmt->bindValue(":dimensions", $data["dimensions"], PDO::PARAM_STR);

    $stmt->execute();

    return $this->conn->lastInsertId();
  }
}