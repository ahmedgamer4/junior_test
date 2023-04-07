<?php

class ProductGateway
{
  private PDO $conn;

  public function __construct(Database $database)
  {
    $this->conn = $database->connect();
  }

  public function getAll(): array
  {
    $sql = "SELECT *
                FROM product";

    $stmt = $this->conn->query($sql);

    $data = [];

    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
      $data[] = $row;
    }

    return $data;
  }

  public function create(array $data): string
  {
    $sql = "INSERT INTO product (name, price, sku, size, dimensions, weight)
                VALUES (:name, :price, :sku, :size, :dimensions, :weight)";

    $stmt = $this->conn->prepare($sql);

    $stmt->bindValue(":name", $data["name"], PDO::PARAM_STR);
    $stmt->bindValue(":sku", $data["sku"] ?? 'placeholder', PDO::PARAM_STR);
    $stmt->bindValue(":size", $data["size"] ?? 0, PDO::PARAM_INT);
    $stmt->bindValue(":price", $data["price"] ?? 0, PDO::PARAM_INT);
    $stmt->bindValue(":dimensions", $data["dimensions"], PDO::PARAM_STR);
    $stmt->bindValue(":weight", $data["weight"], PDO::PARAM_INT);

    $stmt->execute();

    return $this->conn->lastInsertId();
  }

  public function get(string $id): array|false
  {
    $sql = "SELECT *
                FROM product
                WHERE id = :id";

    $stmt = $this->conn->prepare($sql);

    $stmt->bindValue(":id", $id, PDO::PARAM_INT);

    $stmt->execute();

    $data = $stmt->fetch(PDO::FETCH_ASSOC);

    return $data;
  }

  public function delete(string $id): int
  {
    $sql = "DELETE FROM product
                WHERE id = :id";

    $stmt = $this->conn->prepare($sql);

    $stmt->bindValue(":id", $id, PDO::PARAM_INT);

    $stmt->execute();

    return $stmt->rowCount();
  }
}