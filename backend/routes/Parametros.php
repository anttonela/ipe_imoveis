<?php

namespace routes;

class Parametros
{
    public function getRequisicaoGet(): string
    {
        $requisicao = $this->capturarGet();

        return $requisicao;
    }

    private function getRequisicaoPost(): string
    {
        $requisicao = $this->capturarPost();

        return $requisicao;
    }

    public function capturarGet(): string
    {
        return json_encode($_GET);
    }

    public function capturarPost(): string
    {
        return json_encode($_POST);
    }
}