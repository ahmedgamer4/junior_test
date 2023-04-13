<?php
class Database
{
  public function __construct(
    private string $host,
    private string $databaseName,
    private string $user,
    private string $password
  ) {
  }

  public function connect()
  {
    $dsn = "mysql:host={$this->host};dbname={$this->databaseName};charset=utf8";

    return new PDO($dsn, $this->user, $this->password, [
      PDO::ATTR_EMULATE_PREPARES => false,
      PDO::ATTR_STRINGIFY_FETCHES => false, //
    ]);
  }
}
