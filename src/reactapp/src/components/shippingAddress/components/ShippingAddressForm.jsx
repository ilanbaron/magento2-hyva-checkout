import React from 'react';

import SelectInput from '../../common/Form/SelectInput';
import TextInput from '../../common/Form/TextInput';
import CancelButton from './shippingAddressForm/CancelButton';
import { SaveButton } from '../../address';
import useShippingAddressFormikContext from '../hooks/useShippingAddressFormikContext';
import useShippingAddressWrapper from '../hooks/useShippingAddressWrapper';
import useCountryState from '../../address/hooks/useCountryState';
import useSaveAddressAction from '../hooks/useSaveAddressAction';
import { __ } from '../../../i18n';

function ShippingAddressForm() {
  const { viewMode } = useShippingAddressWrapper();
  const {
    fields,
    handleFocus,
    isFormValid,
  } = useShippingAddressFormikContext();
  const saveAddress = useSaveAddressAction();
  const { countryOptions, stateOptions, hasStateOptions } = useCountryState({
    fields,
  });

  if (viewMode) {
    return <></>;
  }

  return (
    <>
      <div className="py-2">
        <TextInput
          label={__('Company')}
          name={fields.company}
          type="text"
          placeholder={__('Company')}
          required
          onFocus={handleFocus}
        />
        <TextInput
          label={__('First name')}
          name={fields.firstname}
          type="text"
          placeholder={__('First name')}
          required
          onFocus={handleFocus}
        />
        <TextInput
          label={__('Last name')}
          name={fields.lastname}
          type="text"
          placeholder={__('Last name')}
          required
          onFocus={handleFocus}
        />
        <TextInput
          label={__('Street')}
          name={`${fields.street}[0]`}
          type="text"
          placeholder={__('Street')}
          required
          onFocus={handleFocus}
        />
        <TextInput
          label={__('Postal Code')}
          name={fields.zipcode}
          type="text"
          placeholder="12345"
          required
          onFocus={handleFocus}
        />
        <TextInput
          label={__('City')}
          name={fields.city}
          type="text"
          placeholder={__('City')}
          required
          onFocus={handleFocus}
        />
        {hasStateOptions ? (
          <SelectInput
            label={__('State')}
            name={fields.region}
            required
            options={stateOptions}
            onFocus={handleFocus}
          />
        ) : (
          <TextInput
            label={__('State')}
            name={fields.region}
            type="text"
            placeholder={__('State')}
            required
            onFocus={handleFocus}
          />
        )}
        <SelectInput
          label={__('Country')}
          name={fields.country}
          required
          options={countryOptions}
          onFocus={handleFocus}
        />
        <TextInput
          label={__('Phone')}
          name={fields.phone}
          type="tel"
          placeholder="+32 000 000 000"
          required
          onFocus={handleFocus}
        />
      </div>

      <div className="flex items-center justify-around mt-2">
        <CancelButton />
        <SaveButton isFormValid={isFormValid} actions={{ saveAddress }} />
      </div>
    </>
  );
}

export default ShippingAddressForm;
