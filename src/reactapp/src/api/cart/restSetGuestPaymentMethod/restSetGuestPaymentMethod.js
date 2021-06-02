import sendRequest from '../../sendRequest';
import LocalStorage from '../../../utils/localStorage';
import RootElement from '../../../utils/rootElement';

export default async function restSetGuestPaymentMethod(paymentData) {
  const cartId = LocalStorage.getCartId();
  const { restUrlPrefix } = RootElement.getPaymentConfig();
  const setPaymentMethodUrl = `${restUrlPrefix}guest-carts/${cartId}/payment-information`;

  return sendRequest(paymentData, setPaymentMethodUrl);
}
