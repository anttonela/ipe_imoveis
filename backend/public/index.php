<?php

require __DIR__ . '/../vendor/autoload.php';

use app\Home\AdicionarProduto;
use app\Home\CardInformacoes;

$salvar = new CardInformacoes();
$salvar->pegandoCidade();