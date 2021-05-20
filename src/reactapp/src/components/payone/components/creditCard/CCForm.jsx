import React from 'react';

import SelectInput from '../../../common/Form/SelectInput';
import TextInput from '../../../common/Form/TextInput';
import CCIframe from './CCIframe';
import paymentConfig from '../../utility/paymentConfig';

const cardTypeOptions = paymentConfig.availableCardTypes.map(
  ({ id, title }) => ({ value: id, label: title })
);

function CCForm() {
  return (
    <div className="w-full">
      {!paymentConfig.isAutoCardtypeDetectionEnabled && (
        <SelectInput name="payment.cc_type" options={cardTypeOptions} />
      )}
      <TextInput label="First Name" name="payment.cc_firstname" />
      <TextInput label="Last Name" name="payment.cc_lastname" />
      <CCIframe />
    </div>
  );
}

export default CCForm;
