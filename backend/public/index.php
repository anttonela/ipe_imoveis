<?php

require __DIR__ . '/../vendor/autoload.php';

use app\Home\AdicionarProduto;
use app\Home\CardInformacoes;
use app\Models\PegandoDados;
use routes\Routes;

$salvar = new PegandoDados();
$salvar->enviandoParaJson();