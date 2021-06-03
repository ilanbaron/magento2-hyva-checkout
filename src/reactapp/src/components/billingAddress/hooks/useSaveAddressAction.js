import { useCallback } from 'react';
import _get from 'lodash.get';

import useBillingAddressWrapper from './useBillingAddressWrapper';
import useBillingAddressAppContext from './useBillingAddressAppContext';
import useBillingAddressFormikContext from './useBillingAddressFormikContext';
import { _emptyFunc, _makePromise } from '../../../utils';
import { BILLING_ADDR_FORM } from '../../../config';
import { CART_BILLING_ADDRESS } from '../utility';
import { __ } from '../../../i18n';
import LocalStorage from '../../../utils/localStorage';

const isSameAsShippingField = `${BILLING_ADDR_FORM}.isSameAsShipping`;

export default function useSaveAddressAction() {
  const { submitHandler } = useBillingAddressFormikContext();
  const {
    isLoggedIn,
    setPageLoader,
    setSuccessMessage,
    setErrorMessage,
    updateCustomerAddress,
  } = useBillingAddressAppContext();
  const {
    editMode,
    selectedAddress,
    regionData,
    setToViewMode,
    customerAddressSelected,
    setSelectedAddress,
    setCustomerAddressSelected,
  } = useBillingAddressWrapper();

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
            _get(formikValues, BILLING_ADDR_FORM, {}),
            regionData
          );
        }

        if (customerAddressUsed) {
          LocalStorage.saveCustomerAddressInfo(selectedAddress, isBillingSame);
        } else {
          LocalStorage.saveCustomerAddressInfo('', isBillingSame);
          setSelectedAddress(CART_BILLING_ADDRESS);
          setCustomerAddressSelected(false);
        }

        setPageLoader(true);
        await Promise.all([
          updateCustomerAddrPromise(),
          updateCartAddressPromise(),
        ]);
        setToViewMode(false);
        setSuccessMessage(__('Billing address updated successfully.'));
        setPageLoader(false);
      } catch (error) {
        console.log({ error });
        setErrorMessage(__('Billing address update failed. Please try again'));
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
