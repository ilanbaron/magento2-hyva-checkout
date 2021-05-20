import { useFormikContext } from 'formik';
import { func, shape, string } from 'prop-types';
import React, { useEffect } from 'react';

import RadioInput from '../../../common/Form/RadioInput';
import CCForm from './CCForm';
import CCIframe from './CCIframe';
import SavedCards from './SavedCards';
import paymentConfig from '../../utility/paymentConfig';
import usePaymentMethodFormContext from '../../../paymentMethod/hooks/usePaymentMethodFormContext';

function CreditCard({ method, selected, actions }) {
  const savedData = paymentConfig.useSavedData();
  const isSelected = method.code === selected.code;
  const { setFieldValue } = useFormikContext();
  const { fields } = usePaymentMethodFormContext();
  const selectedCardField = fields.selectedCard;

  // initializing payone iframe
  useEffect(() => {
    if (isSelected) {
      window.iframes = new window.Payone.ClientApi.HostedIFrames(
        paymentConfig.fieldConfig,
        paymentConfig.request
      );
      window.iframes.setCardType('V');
    }
  }, [isSelected]);

  // if saved cards available for customer, then should show card list in the content
  useEffect(() => {
    if (isSelected && savedData) {
      const defaultSavedCard = paymentConfig.savedPaymentData.find(
        payment => Number(payment.is_default) === 1
      );

      if (defaultSavedCard) {
        setFieldValue(selectedCardField, Number(defaultSavedCard.id));
      }
    }
  }, [savedData, isSelected, setFieldValue, selectedCardField]);

  if (!isSelected) {
    return (
      <>
        <RadioInput
          label={method.title}
          name="paymentMethod"
          value={method.code}
          onChange={actions.change}
          checked={isSelected}
        />
        <div className="hidden">
          <CCIframe />
        </div>
      </>
    );
  }

  if (savedData) {
    return (
      <div className="w-full">
        <RadioInput
          label={method.title}
          name="paymentMethod"
          value={method.code}
          onChange={actions.change}
          checked={isSelected}
        />
        <div className="mt-4 ml-4">
          <SavedCards />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div>
        <RadioInput
          label={method.title}
          name="paymentMethod"
          value={method.code}
          onChange={actions.change}
          checked={isSelected}
        />
      </div>
      <CCForm />
    </div>
  );
}

const methodShape = shape({
  title: string.isRequired,
  code: string.isRequired,
});

CreditCard.propTypes = {
  method: methodShape.isRequired,
  selected: methodShape.isRequired,
  actions: shape({ change: func }),
};

export default CreditCard;
