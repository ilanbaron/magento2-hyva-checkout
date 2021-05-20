import paymentConfig from '../utility/paymentConfig';
import usePaymentMethodFormContext from '../../paymentMethod/hooks/usePaymentMethodFormContext';

export default function usePayone({ values }) {
  const { submitHandler } = usePaymentMethodFormContext();

  const handleCreditcardCheck = () => {
    // PayOne Request if the data is valid
    if (window.iframes.isComplete()) {
      window.processPayoneResponseCCHosted = response => {
        processPayoneResponseCCHosted(response);
      };
      window.iframes.creditCardCheck('processPayoneResponseCCHosted'); // Perform "CreditCardCheck" to create and get a PseudoCardPan; then call your function "payCallback"
    }
    // TODO error handler
    /* this.messageContainer.addErrorMessage({
         message: $t('Please enter complete data.'),
         }); */
  };

  const isInt = value =>
    value.length > 0 &&
    !Number.isNaN(value) &&
    parseInt(Number(value)) === value &&
    !Number.isNaN(parseInt(value, 10));

  const isMinValidityCorrect = sExpireDate => {
    if (isInt(paymentConfig.fieldConfig.fields.ccMinValidity)) {
      const oExpireDate = new Date(
        `20${sExpireDate.substring(0, 2)}`,
        parseInt(sExpireDate.substring(2, 4)),
        1,
        0,
        0,
        0
      );
      oExpireDate.setSeconds(oExpireDate.getSeconds() - 1);

      const oMinValidDate = new Date();
      oMinValidDate.setDate(
        parseInt(oMinValidDate.getDate()) +
          parseInt(paymentConfig.fieldConfig.fields.ccMinValidity)
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
        console.log(
          'This transaction could not be performed. Please select another payment method.'
        ); // TODO Error handler
        return;
      }
      // TODO Display the CC instead the form?
      submitHandler(values);
    } else if (response.status === 'INVALID') {
      /*      this.messageContainer.addErrorMessage({
             message: $t(response.errormessage),
             }); */
      console.log(response.errormessage); // TODO Error handler
    } else if (response.status === 'ERROR') {
      /*      this.messageContainer.addErrorMessage({
             message: $t(response.errormessage),
             }); */
      console.log(response.errormessage); // TODO Error handler
    }
  };

  return {
    handleCreditcardCheck,
  };
}
