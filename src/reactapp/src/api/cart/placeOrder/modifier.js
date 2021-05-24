import _get from 'lodash.get';

export default function modifyPlaceOrder(result) {
  const orderNumber = _get(result, 'data.placeOrder.order', {});

  return {
    orderNumber,
    redirectUrl: '/checkout/onepage/success',
  };
}
