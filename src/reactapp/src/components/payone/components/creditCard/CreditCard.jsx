import { func, shape, string } from 'prop-types';
import React, { useEffect } from 'react';

import RadioInput from '../../../common/Form/RadioInput';
import SelectInput from '../../../common/Form/SelectInput';
import TextInput from '../../../common/Form/TextInput';
import paymentConfig from '../../utility/paymentConfig';

const cardTypeOptions = paymentConfig.availableCardTypes.map(
  ({ id, title }) => ({ value: id, label: title })
);
function CreditCard({ method, selected, actions }) {
  const isSelected = method.code === selected.code;

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

  const iframeHtml = (
    <>
      <div>
        <label className="md:text-sm">Credit Card Number</label>
        <div id="cardpan" className="inputIframe"></div>
      </div>

      <div>
        <label className="md:text-sm">Expiration Date</label>
        <div className="flex justify-between">
          <div className="w-2/5" id="cardexpiremonth"></div>
          <div className="w-2/5" id="cardexpireyear"></div>
        </div>
      </div>

      <div>
        <label className="md:text-sm">Card Verification Number</label>
        <div id="cardcvc2" className="inputIframe"></div>
      </div>
    </>
  );

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
        <div className="hidden">{iframeHtml}</div>
      </>
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
      <div className="w-full">
        <SelectInput name="payment.cc_type" options={cardTypeOptions} />
        <TextInput label="First Name" name="payment.cc_firstname" />
        <TextInput label="Last Name" name="payment.cc_lastname" />
        <TextInput
          type="number"
          label="First Name"
          name="payment.cc_firstname"
        />
        {iframeHtml}
      </div>
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
