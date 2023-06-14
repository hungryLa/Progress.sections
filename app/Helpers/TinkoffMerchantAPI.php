<?php

namespace App\Helpers;

use HttpException;

class TinkoffMerchantAPI
{
    private string $api_url;
    private string $terminalKey;
    private string $secretKey;
    private string $paymentId;
    private string $status;
    private string $error;
    private string $response;
    private string $paymentUrl;
    private string $qrUrl;
    private string $params;

    public function __construct($terminalKey, $secretKey)
    {
        $this->api_url = 'https://securepay.tinkoff.ru/v2/';
        $this->terminalKey = $terminalKey;
        $this->secretKey = $secretKey;
    }

    public function __get($name)
    {
        switch ($name) {
            case 'paymentId':
                return $this->paymentId;
            case 'status':
                return $this->status;
            case 'error':
                return $this->error;
            case 'paymentUrl':
                return $this->paymentUrl;
            case 'qrUrl':
                return $this->qrUrl;
            case 'params':
                return $this->params;
            case 'response':
                return htmlentities($this->response);
            default:
                if ($this->response) {
                    if ($json = json_decode($this->response, true)) {
                        foreach ($json as $key => $value) {
                            if (strtolower($name) == strtolower($key)) {
                                return $json[$key];
                            }
                        }
                    }
                }

                return false;
        }
    }

    /**
     * @param $args mixed You could use associative array or url params string
     * @return bool|string
     * @throws HttpException
     */
    public function init(mixed $args): bool|string
    {
        return $this->buildQuery('Init', $args);
    }

    /**
     * @throws HttpException
     */
    public function getState($args)
    {
        return $this->buildQuery('GetState', $args);
    }

    /**
     * @throws HttpException
     */
    public function confirm($args)
    {
        return $this->buildQuery('Confirm', $args);
    }

    /**
     * @throws HttpException
     */
    public function cancel($args)
    {
        return $this->buildQuery('Cancel', $args);
    }

    /**
     * @throws HttpException
     */
    public function charge($args)
    {
        return $this->buildQuery('Charge', $args);
    }

    /**
     * @throws HttpException
     */
    public function addCustomer($args)
    {
        return $this->buildQuery('AddCustomer', $args);
    }

    /**
     * @throws HttpException
     */
    public function getQr($args)
    {
        return $this->buildQuery('GetQr', $args);
    }

    /**
     * @throws HttpException
     */
    public function getQrState($args)
    {
        return $this->buildQuery('GetQrState', $args);
    }

    /**
     * @throws HttpException
     */
    public function getSbpPayTest($args)
    {
        return $this->buildQuery('SbpPayTest', $args);
    }

    /**
     * @throws HttpException
     */
    public function getCustomer($args)
    {
        return $this->buildQuery('GetCustomer', $args);
    }

    /**
     * @throws HttpException
     */
    public function removeCustomer($args)
    {
        return $this->buildQuery('RemoveCustomer', $args);
    }

    /**
     * @throws HttpException
     */
    public function getCardList($args)
    {
        return $this->buildQuery('GetCardList', $args);
    }

    /**
     * @throws HttpException
     */
    public function removeCard($args)
    {
        return $this->buildQuery('RemoveCard', $args);
    }

    /**
     * Builds a query string and call sendRequest method.
     * Could be used to custom API call method.
     *
     * @param string $path API method name
     * @param mixed $args query params
     *
     * @return string|bool
     * @throws HttpException
     */
    public function buildQuery(string $path, mixed $args): string|bool
    {
        $url = $this->api_url;
        if (is_array($args)) {
            if (!array_key_exists('TerminalKey', $args)) {
                $args['TerminalKey'] = $this->terminalKey;
            }
            if (!array_key_exists('Token', $args)) {
                $args['Token'] = $this->_genToken($args);
            }
        }
        $url = $this->_combineUrl($url, $path);


        return $this->_sendRequest($url, $args);
    }

    /**
     * Generates Token
     *
     * @param $args
     * @return string
     */
    private function _genToken($args): string
    {
        $token = '';
        $args['Password'] = $this->secretKey;
        ksort($args);

        foreach ($args as $arg) {
            if (!is_array($arg)) {
                $token .= $arg;
            }
        }
        $token = hash('sha256', $token);

        return $token;
    }

    /**
     * Combines parts of URL. Simply gets all parameters and puts '/' between
     *
     * @return string
     */
    private function _combineUrl(): string
    {
        $args = func_get_args();
        $url = '';
        foreach ($args as $arg) {
            if (is_string($arg)) {
                if ($arg[strlen($arg) - 1] !== '/') $arg .= '/';
                $url .= $arg;
            } else {
                continue;
            }
        }

        return $url;
    }

    /**
     * Main method. Call API with params
     *
     * @param $api_url
     * @param $args
     * @return bool|string
     * @throws HttpException
     */
    private function _sendRequest($api_url, $args): bool|string
    {
        $this->error = '';
        if (is_array($args)) {
            $args = json_encode($args);
        }

        if ($curl = curl_init()) {
            curl_setopt($curl, CURLOPT_URL, $api_url);
            curl_setopt($curl, CURLOPT_FOLLOWLOCATION, true);
            curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
            curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
            curl_setopt($curl, CURLOPT_POST, true);
            curl_setopt($curl, CURLOPT_POSTFIELDS, $args);
            curl_setopt($curl, CURLOPT_HTTPHEADER, array(
                'Content-Type: application/json',
            ));

            $out = curl_exec($curl);
            $this->response = $out;
            $json = json_decode($out);

            if ($json) {
                if (@$json->ErrorCode !== "0") {
                    $this->error = @$json->Details ?? '';
                } else {
                    $this->paymentUrl = @$json->PaymentURL ?? '';
                    $this->paymentId = @$json->PaymentId ?? '';
                    $this->status = @$json->Status ?? '';
                    $this->qrUrl = @$json->Data ?? '';
                    $this->params = @$json->Params[0]->Value ?? '';
                }
            }

            curl_close($curl);

            return $out;

        } else {
            throw new HttpException('Can not create connection to ' . $api_url . ' with args ' . $args, 404);
        }
    }
}
