<?php
declare(strict_types=1);

namespace Hyva\Checkout\ViewModel;

use Magento\Checkout\Model\CompositeConfigProvider;
use Magento\Framework\Serialize\SerializerInterface;
use Magento\Framework\View\Element\Block\ArgumentInterface;
use Payone\Core\Model\ConfigProvider;

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
     * @var \Payone\Core\Model\ConfigProvider
     */
    private $payOneConfigProvider;

    public function __construct(
        SerializerInterface $serializer,
        CompositeConfigProvider $compositeConfigProvider,
        ConfigProvider $payOneConfigProvider
    ) {
        $this->serializer = $serializer;
        $this->compositeConfigProvider = $compositeConfigProvider;
        $this->payOneConfigProvider = $payOneConfigProvider;
    }

    public function getConfig(): string
    {
        return $this->serializer->serialize($this->payOneConfigProvider->getConfig());
//        $checkoutConfig = $this->compositeConfigProvider->getConfig();
//        return $this->serializer->serialize($checkoutConfig['payment']);


//        try {
//            $checkoutConfig = $this->compositeConfigProvider->getConfig();
//            return $this->serializer->serialize($checkoutConfig['payment']);
//        } catch (\Exception $exception) {
//            return $this->serializer->serialize([]);
//        }
    }
}
