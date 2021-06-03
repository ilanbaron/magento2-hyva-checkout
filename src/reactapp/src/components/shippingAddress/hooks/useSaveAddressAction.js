import { useCallback } from 'react';
import _get from 'lodash.get';

import useShippingAddressWrapper from './useShippingAddressWrapper';
import useShippingAddressAppContext from './useShippingAddressAppContext';
import useShippingAddressFormikContext from './useShippingAddressFormikContext';
import { _emptyFunc, _makePromise } from '../../../utils';
import { CART_SHIPPING_ADDRESS } from '../utility';
import { BILLING_ADDR_FORM, SHIPPING_ADDR_FORM } from '../../../config';
import { __ } from '../../../i18n';
import LocalStorage from '../../../utils/localStorage';

const isSameAsShippingField = `${BILLING_ADDR_FORM}.isSameAsShipping`;

export default function useSaveAddressAction() {
  const { submitHandler } = useShippingAddressFormikContext();
  const {
    isLoggedIn,
    setPageLoader,
    setSuccessMessage,
    setErrorMessage,
    updateCustomerAddress,
  } = useShippingAddressAppContext();
  const {
    editMode,
    selectedAddress,
    regionData,
    setToViewMode,
    customerAddressSelected,
    setSelectedAddress,
    setCustomerAddressSelected,
  } = useShippingAddressWrapper();

  return useCallback(
    async formikValues => {
      try {
        let customerAddressUsed = false;
        const isBillingSame = _get(formikValues, isSameAsShippingField);
        let updateCustomerAddrPromise = _emptyFunc();
        const updateCartAddressPromise = _makePromise(
          submitHandler,
          formikValues
        );

        if (isLoggedIn && customerAddressSelected && editMode) {
          customerAddressUsed = true;
          updateCustomerAddrPromise = _makePromise(
            updateCustomerAddress,
            selectedAddress,
            _get(formikValues, SHIPPING_ADDR_FORM, {}),
            regionData
          );
        }

        if (customerAddressUsed) {
          LocalStorage.saveCustomerAddressInfo(selectedAddress, isBillingSame);
        } else {
          LocalStorage.saveCustomerAddressInfo('', isBillingSame);
          setSelectedAddress(CART_SHIPPING_ADDRESS);
          setCustomerAddressSelected(false);
        }

        setPageLoader(true);
        await Promise.all([
          updateCustomerAddrPromise(),
          updateCartAddressPromise(),
        ]);
        setToViewMode(false);
        setSuccessMessage(__('Shipping address updated successfully'));
        setPageLoader(false);
      } catch (error) {
        console.log({ error });
        setErrorMessage(__('Shipping address update failed. Please try again'));
        setPageLoader(false);
      }
    },
    [
      submitHandler,
      isLoggedIn,
      selectedAddress,
      editMode,
      updateCustomerAddress,
      setSuccessMessage,
      setErrorMessage,
      regionData,
      setToViewMode,
      setPageLoader,
      setSelectedAddress,
      setCustomerAddressSelected,
      customerAddressSelected,
    ]
  );
}
