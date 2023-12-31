<?php

namespace app\Models\Home;

use app\Models\Crud\Functions\Select;
use app\Models\Crud\Functions\Update;
use app\Models\Crud\Utilizadores\Banco;

class Entrar extends Banco
{
    private $email;
    private $senha;
    private $url;
    private $arMensagem = [];

    private function setEntrar(): void
    {
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $json_data = file_get_contents("php://input");
            $data = json_decode($json_data, true);

            if ($data === null) {
                http_response_code(400);
                print json_encode(array("error" => "Dados inválidos"));
                return;
            }
        }

        $this->email = $data['email'];
        $this->senha = $data['senha'];
        $this->url = $data['url'];
    }

    private function verificandoEmailValido(): void
    {
        $this->setEntrar();

        if (filter_var($this->email, FILTER_VALIDATE_EMAIL) == false) {
            $this->arMensagem[] = 'E-mail inválido';
            $this->email = null;
            return;
        }
    }

    private function identificandoChave(): array
    {
        $this->setEntrar();

        $urlAtual = $this->url;
        $parteDesejada = '/login/chave/';
        $posicao = strpos($urlAtual, $parteDesejada);
        $urlChave = substr($urlAtual, $posicao + strlen($parteDesejada));

        $resultado = $this->executarFetchAll("UPDATE usuario SET situacao = 2, chave = '' WHERE chave = '{$urlChave}'");
        return $resultado;
    }

    public function verificandoSeCadastroExiste(): void
    {
        $this->setEntrar();
        $this->identificandoChave();

        $arSelect = $this->executarFetchAll("SELECT senha FROM usuario WHERE email = '{$this->email}' and situacao = 2");

        if ($arSelect[0]['senha'] !== $this->senha) {
            $this->arMensagem[] = 'Autenticação falhou, tente novamente';
            return;
        }

        session_start();

        if ($this->email === "arantesimovel@gmail.com") {
            $_SESSION['email'] = "arantesimovel@gmail.com";
            $_SESSION['tipo'] = "administrador";
            $this->arMensagem[] = "Administrador";
        }

        $_SESSION['email'] = $this->email;
        $_SESSION['tipo'] = "usuario";
        $this->arMensagem[] = 'Usuário';
    }

    public function checandoSessao(): bool
    {
        return isset($_SESSION['tipo']) ? true : false;
    }

    public function checandoSessaoAdministrador(): void
    {
        $this->verificandoSeCadastroExiste();

        //        $this->arMensagem[] = 'AQUI';
        /*
        if( isset($_SESSION['tipo'])  )
        {
            return ($_SESSION['tipo'] == 'administrador') ? true : false;
        }*/
    }

    public function imprimindoAviso(): void
    {
        $this->verificandoEmailValido();
        $this->checandoSessaoAdministrador();

        foreach ($this->arMensagem as $mensagem) {
            print json_encode($mensagem);
        }
    }
}
