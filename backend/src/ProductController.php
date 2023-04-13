<?php

class ProductController
{
  private Factory $factory;
  private ProductGateway $gateway;
  // public function __construct(private ProductGateway $gateway)
  // {
  // }
  public function __construct($factory)
  {
    $this->factory = $factory;
  }

  public function createProduct()
  {
    $this->gateway = $this->factory->makeProduct(['size' => 0]);
  }

  public function processRequest(string $method, ?string $id): void
  {
    $this->gateway = $this->factory->makeProduct(['size' => 0]);
    if ($id) {
      $this->processResourceRequest($method, $id);
    } else {

      $this->processCollectionRequest($method);
    }
  }

  private function processResourceRequest(string $method, string $id): void
  {
    $this->createProduct();
    $product = $this->gateway->get($id);

    if (!$product) {
      http_response_code(404);
      echo json_encode(["message" => "Product not found"]);
      return;
    }

    switch ($method) {
      case "GET":
        echo json_encode($product);
        break;

      case "DELETE":
        $rows = $this->gateway->delete($id);

        echo json_encode([
          "message" => "Product $id deleted",
          "rows" => $rows
        ]);
        break;

      default:
        http_response_code(405);
        header("Allow: GET, PATCH, DELETE");
    }
  }

  private function processCollectionRequest(string $method): void
  {
    switch ($method) {
      case "GET":
        echo json_encode($this->gateway->getAll());
        break;

      case "POST":
        $data = (array) json_decode(file_get_contents("php://input"), true);

        $this->gateway = $this->factory->makeProduct($data);

        $errors = $this->getValidationErrors($data);

        if (!empty($errors)) {
          http_response_code(422);
          echo json_encode(["errors" => $errors]);
          break;
        }

        $id = $this->gateway->create($data);

        http_response_code(201);
        echo json_encode([
          "message" => "Product created",
          "id" => $id
        ]);
        break;

      default:
        http_response_code(405);
        header("Allow: GET, POST");
    }
  }

  private function getValidationErrors(array $data, bool $is_new = true): array
  {
    $errors = [];

    if ($is_new && empty($data["name"])) {
      $errors[] = "name is required";
    }

    if ($is_new && empty($data["sku"])) {
      $errors[] = "sku is required";
    }

    if (array_key_exists("price", $data)) {
      if (filter_var($data["price"], FILTER_VALIDATE_INT) === false) {
        $errors[] = "price must be an integer";
      }
    }

    return $errors;
  }
}