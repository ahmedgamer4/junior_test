<?php

abstract class ProductGateway
{
  protected PDO $conn;

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

  abstract public function create(array $data): string;

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