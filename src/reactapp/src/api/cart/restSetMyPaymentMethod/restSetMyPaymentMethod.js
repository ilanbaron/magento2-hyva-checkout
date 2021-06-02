import sendRequest from '../../sendRequest';
import RootElement from '../../../utils/rootElement';

export default async function restSetMyPaymentMethod(paymentData) {
  const { restUrlPrefix } = RootElement.getPaymentConfig();
  const setPaymentMethodUrl = `${restUrlPrefix}carts/mine/payment-information`;

  return sendRequest(paymentData, setPaymentMethodUrl);
}
