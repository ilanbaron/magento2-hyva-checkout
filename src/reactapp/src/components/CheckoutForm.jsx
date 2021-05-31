import React, { useEffect } from 'react';

import Message from './common/Message';
import PageLoader from './common/Loader';
import Login from './login';
import { AddressWrapper } from './address';
import BillingAddress from './billingAddress';
import ShippingAddress from './shippingAddress';
import CartItemsForm from './items';
import ShippingMethodsForm from './shippingMethod';
import PaymentMethod from './paymentMethod';
import Totals from './totals';
import PlaceOrder from './PlaceOrder';
import CheckoutFormWrapper from './CheckoutFormWrapper';
import useCartContext from '../hook/useCartContext';
import useAppContext from '../hook/useAppContext';

function FormStep({ children, className }) {
  return <div className={className}>{children}</div>;
}

function CheckoutForm() {
  const { orderId, getGuestCartInfo } = useCartContext();
  const [{ pageLoader }, { setPageLoader }] = useAppContext();

  useEffect(() => {
    (async () => {
      setPageLoader(true);
      await getGuestCartInfo();
      setPageLoader(false);
    })();
  }, [getGuestCartInfo, setPageLoader]);

  if (orderId) {
    return (
      <div className="flex flex-col items-center justify-center mx-10 my-10">
        <h1 className="text-2xl font-bold">Order Details</h1>
        <div className="flex flex-col items-center justify-center mt-4 space-y-3">
          <div>Your order is placed.</div>
          <div>{`Order Number: #${orderId}`}</div>
        </div>
      </div>
    );
  }

  return (
    <CheckoutFormWrapper>
      <Message />
      <div
        className={`${
          pageLoader ? 'hidden' : 'flex flex-col flex-wrap my-6 md:flex-row'
        }`}
      >
        <div className="w-full mb-4">
          <Login />
        </div>

        <div className="w-full mb-4">
          <div className="grid md:grid-cols-2 md:gap-2">
            <AddressWrapper>
              <ShippingAddress />
              <BillingAddress />
            </AddressWrapper>
          </div>
        </div>

        <div className="w-full mb-4">
          <CartItemsForm />
        </div>

        <div className="w-full mb-4 space-y-2">
          <ShippingMethodsForm />
          <PaymentMethod />
        </div>

        <div className="w-full mb-4 space-y-2">
          <Totals />
          <PlaceOrder />
        </div>
      </div>
      {pageLoader && <PageLoader />}
    </CheckoutFormWrapper>
  );
}

export default CheckoutForm;
