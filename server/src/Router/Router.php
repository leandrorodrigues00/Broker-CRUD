<?php

namespace App\Router;

use App\Controller\CorretorController;
use App\Response\JsonResponse;

class Router
{
    private $requestMethod;
    private $uri;
    private $routes;

    private $corretorController;

    public function __construct($requestMethod, $uri)
    {
        $this->requestMethod = $requestMethod;
        $this->uri = $uri;
        $this->corretorController = new CorretorController();
        $this->routes();
    }

    public function run()
    {
        try {
            $ponte = $this->procurarPonte();

            if ($ponte) {
                echo $ponte();
            } else {
                header("HTTP/1.1 404 Página não encontrada");
                echo json_encode(["error" => "Not Found"]);
            }
        } catch (\Exception $e) {
            header("HTTP/1.1 500 Erro interno do Servidor");
            echo json_encode(["error" => $e->getMessage()]);
        }
    }

    private function routes()
    {
        header("Content-Type: application/json");
        header("Access-Control-Allow-Origin: *");
        header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
        header(
            "Access-Control-Allow-Headers: Authorization, Content-Type, ngrok-skip-browser-warning"
        );
        header("Cache-Control: no-cache, no-store, must-revalidate");
        if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
            header("Access-Control-Allow-Origin: *");
            header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
            header(
                "Access-Control-Allow-Headers: Authorization, Content-Type, ngrok-skip-browser-warning"
            );
            header("HTTP/1.1 200 OK");
            exit();
        }

        $this->routes = [
            "GET" => [
                "/corretores" => function () {
                    $corretores = $this->corretorController->index();
                    $data = [
                        "status" => true,
                        "mensagem" => "corretores recuperados com sucesso",
                        "usuarios" => $corretores,
                    ];
                    return JsonResponse::make($data, 200);
                },

                "/corretores/{id}" => function ($id) {
                    header("Content-Type: application/json");
                    $corretor = $this->corretorController->getById($id);

                    return JsonResponse::make($corretor, 200);
                },
            ],

            "POST" => [
                "/corretores" => function () {
                    $body = json_decode(file_get_contents("php://input"), true);
                    $corretor = $this->corretorController->store($body);

                    if ($corretor["status"] === false) {
                        return JsonResponse::make($corretor, 400); // 400 Bad Request
                    }

                    return JsonResponse::make($corretor, 201); // 201 Created
                },
            ],

            "DELETE" => [
                "/corretores/{id}" => function ($id) {
                    $response = $this->corretorController->delete($id);
                    return JsonResponse::make($response, 200);
                },
            ],

            "PUT" => [
                "/corretore/{id}" => function ($id) {
                    header("Content-Type: application/json");
                    $body = json_decode(file_get_contents("php://input"), true);
                    $corretor = $this->corretorController->update($id, $body);
                    if (!$corretor) {
                        $data = [
                            "status" => false,
                            "mensagem" => "Corretor não encontrado",
                            "descricao" => "",
                            "usuario" => "",
                        ];
                        return JsonResponse::make($data, 200);
                    }
                    $data = [
                        "status" => true,
                        "mensagem" => "Corretor atualizado com sucesso",
                        "descricao" => "",
                        "usuario" => $id,
                    ];
                    return JsonResponse::make($data, 200);
                },
            ],
        ];
    }

    private function procurarPonte()
    {
        foreach ($this->routes[$this->requestMethod] as $route => $ponte) {
            $routePattern = preg_replace("/\{.*\}/", "([^/]+)", $route);
            if (preg_match("@^$routePattern$@", $this->uri, $matches)) {
                array_shift($matches);
                return function () use ($ponte, $matches) {
                    return call_user_func_array($ponte, $matches);
                };
            }
        }

        return false;
    }
}
