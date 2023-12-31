<?php

namespace routes;

use app\Models\Home\AlterarProduto;
use app\Models\Home\ApagarProduto;
use app\Models\Home\CorpoJson;
use app\Models\Home\CriarConta;
use app\Models\Home\Entrar;
use app\Models\Home\Filtro;
use app\Models\Home\IdModal;
use app\Models\Home\NovoProduto;
use app\Models\Home\RecuperarSenha;

class Routes extends CorpoJson
{
    public function apagar(): void
    {
        $this->cabecalho();

        http_response_code(200);

        $apagar = new ApagarProduto();
        $apagar->apagandoProduto();
    }

    public function alterar(): void
    {
        $this->cabecalho();

        http_response_code(200);

        $alter = new AlterarProduto();
        $alter->alterandoDadosDoProduto();
    }

    public function filtro(): void
    {
        $filtro = new Filtro();
        $filtro->filtro();
    }

    public function imoveis(): void
    {
        print json_encode($this->select("Imóvel"));
    }

    public function maquinasAgricolas(): void
    {
        print json_encode($this->select("Máquinas Agrícolas"));
    }

    public function outros(): void
    {
        print json_encode($this->select("Outros"));
    }

    public function novoProduto(): void
    {
        $this->cabecalho();

        http_response_code(200);

        $novoImovel = new NovoProduto();
        $novoImovel->novoProduto();
    }

    public function imagem(): void
    {
        $this->cabecalho();

        http_response_code(200);

        $novoProduto = new NovoProduto();
        $novoProduto->salvandoImagem();
    }

    public function criarConta(): void
    {
        $this->cabecalho();

        http_response_code(200);

        $criarConta = new CriarConta();
        $criarConta->enviandoEmail();
    }

    public function checandoSessao(): void
    {
        $this->cabecalho();

        http_response_code(200);

        $check = new Entrar();
        $check->checandoSessao();
    }

    public function checandoSessaoAdministrador(): void
    {
        $this->cabecalho();

        http_response_code(200);

        $check = new Entrar();
        $check->checandoSessaoAdministrador();
    }

    public function login(): void
    {
        $this->cabecalho();

        http_response_code(200);

        $login = new Entrar();
        $login->imprimindoAviso();
    }

    public function modal(): void
    {
        $this->cabecalho();

        http_response_code(200);

        $modal = new IdModal();
        $modal->abrindoModalDoId();
    }

    public function recuperarSenha(): void
    {
        $this->cabecalho();

        http_response_code(200);

        $modal = new RecuperarSenha();
        $modal->enviandoEmail();
    }

    public function confirmarCodigo(): void
    {
        $this->cabecalho();

        http_response_code(200);

        $modal = new RecuperarSenha();
        $modal->confirmandoSeCodigoEstaCorreto();
    }

    public function novaSenha(): void
    {
        $this->cabecalho();

        http_response_code(200);

        $modal = new RecuperarSenha();
        $modal->salvandoNovaSenha();
    }
}
