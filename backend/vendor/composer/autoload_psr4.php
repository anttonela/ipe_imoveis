<?php

// autoload_psr4.php @generated by Composer

$vendorDir = dirname(dirname(__FILE__));
$baseDir = dirname($vendorDir);

return array(
    'routes\\' => array($baseDir . '/routes'),
    'app\\' => array($baseDir . '/app'),
    'Tuupola\\Middleware\\' => array($vendorDir . '/tuupola/callable-handler/src', $vendorDir . '/tuupola/cors-middleware/src'),
    'Tuupola\\Http\\Factory\\' => array($vendorDir . '/tuupola/http-factory/src'),
    'Symfony\\Polyfill\\Php80\\' => array($vendorDir . '/symfony/polyfill-php80'),
    'Symfony\\Polyfill\\Php72\\' => array($vendorDir . '/symfony/polyfill-php72'),
    'Symfony\\Polyfill\\Mbstring\\' => array($vendorDir . '/symfony/polyfill-mbstring'),
    'Symfony\\Polyfill\\Intl\\Normalizer\\' => array($vendorDir . '/symfony/polyfill-intl-normalizer'),
    'Symfony\\Polyfill\\Intl\\Idn\\' => array($vendorDir . '/symfony/polyfill-intl-idn'),
    'Symfony\\Polyfill\\Ctype\\' => array($vendorDir . '/symfony/polyfill-ctype'),
    'Symfony\\Component\\DomCrawler\\' => array($vendorDir . '/symfony/dom-crawler'),
    'Symfony\\Component\\CssSelector\\' => array($vendorDir . '/symfony/css-selector'),
    'Psr\\Log\\' => array($vendorDir . '/psr/log/src'),
    'Psr\\Http\\Server\\' => array($vendorDir . '/psr/http-server-handler/src', $vendorDir . '/psr/http-server-middleware/src'),
    'Psr\\Http\\Message\\' => array($vendorDir . '/psr/http-factory/src', $vendorDir . '/psr/http-message/src'),
    'PHPMailer\\PHPMailer\\' => array($vendorDir . '/phpmailer/phpmailer/src'),
    'Neomerx\\Cors\\' => array($vendorDir . '/neomerx/cors-psr7/src'),
    'GuzzleHttp\\Psr7\\' => array($vendorDir . '/guzzlehttp/psr7/src'),
    'GuzzleHttp\\Promise\\' => array($vendorDir . '/guzzlehttp/promises/src'),
    'GuzzleHttp\\' => array($vendorDir . '/guzzlehttp/guzzle/src'),
);
