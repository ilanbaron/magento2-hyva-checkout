import { useContext } from 'react';
import paymentConfig from '../utility/paymentConfig';
import usePaymentMethodFormContext from '../../paymentMethod/hooks/usePaymentMethodFormContext';
import { __ } from '../../../i18n';
import AppContext from '../../../context/App/AppContext';

export default function usePayone({ values }) {
  const { submitHandler } = usePaymentMethodFormContext();
  const [, appActions] = useContext(AppContext);
  const {
    setSuccessMessage,
    setErrorMessage,
    setPageLoader,
    setMessage,
  } = appActions;

  const handleCreditcardCheck = () => {
    setPageLoader(true);
    setMessage(false);
    // PayOne Request if the data is valid
    if (window.iframes.isComplete()) {
      window.processPayoneResponseCCHosted = response => {
        processPayoneResponseCCHosted(response);
      };
      window.iframes.creditCardCheck('processPayoneResponseCCHosted'); // Perform "CreditCardCheck" to create and get a PseudoCardPan; then call your function "payCallback"
    } else {
      setErrorMessage(__('Please complete the data'));
    }
    setPageLoader(false);
  };

  const isInt = value => value.length > 0 && typeof value === 'number';

  const isMinValidityCorrect = sExpireDate => {
    if (isInt(paymentConfig.fieldConfig.fields.ccMinValidity)) {
      const oExpireDate = new Date(
        parseInt(`20${parseInt(sExpireDate.substring(0, 2), 10)}`, 10),
        parseInt(sExpireDate.substring(2, 4), 10),
        1,
        0,
        0,
        0
      );
      oExpireDate.setSeconds(oExpireDate.getSeconds() - 1);

      const oMinValidDate = new Date();
      oMinValidDate.setDate(
        parseInt(oMinValidDate.getDate().toString(), 10) +
          parseInt(paymentConfig.fieldConfig.fields.ccMinValidity, 10)
      );

      if (oExpireDate < oMinValidDate) {
        return false;
      }
    }

    return true;
  };

  const processPayoneResponseCCHosted = response => {
    if (response.status === 'VALID') {
      if (!isMinValidityCorrect(response.cardexpiredate)) {
        setErrorMessage(__('Invalid expiration date.'));
        return;
      }
      setSuccessMessage(__('Credit card added successfully'));
      // TODO Display the CC instead the form?
      submitHandler(values);
    } else if (response.status === 'INVALID') {
      setErrorMessage(__(response.errormessage));
    } else if (response.status === 'ERROR') {
      setErrorMessage(__(response.errormessage));
    }
    setPageLoader(false);
  };

  return {
    handleCreditcardCheck,
  };
}
