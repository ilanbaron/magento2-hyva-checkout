<?php
declare(strict_types=1);

namespace Hyva\Checkout\ViewModel;

use Magento\Checkout\Model\CompositeConfigProvider;
use Magento\Framework\Serialize\SerializerInterface;
use Magento\Framework\View\Element\Block\ArgumentInterface;

class CheckoutConfigProvider implements ArgumentInterface
{
    /**
     * @var \Magento\Checkout\Model\CompositeConfigProvider
     */
    private $compositeConfigProvider;

    /**
     * @var \Magento\Framework\Serialize\SerializerInterface
     */
    private $serializer;

    /**
     * CheckoutConfigProvider constructor.
     *
     * @param  \Magento\Framework\Serialize\SerializerInterface  $serializer
     * @param  \Magento\Checkout\Model\CompositeConfigProvider  $compositeConfigProvider
     */
    public function __construct(
        SerializerInterface $serializer,
        CompositeConfigProvider $compositeConfigProvider
    ) {
        $this->serializer = $serializer;
        $this->compositeConfigProvider = $compositeConfigProvider;
    }

    public function getConfig(): string
    {
        $checkoutConfig = $this->compositeConfigProvider->getConfig();
        $storeCode = $checkoutConfig['storeCode'];
        $checkoutConfig['payment']['restUrlPrefix'] = "/rest/$storeCode/V1/";

        return $this->serializer->serialize($checkoutConfig['payment']);
    }
}
