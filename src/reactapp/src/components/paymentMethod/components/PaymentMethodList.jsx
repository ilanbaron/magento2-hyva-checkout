import React, { Component } from 'react';
import _get from 'lodash.get';
import { useFormikContext } from 'formik';

import Button from '../../common/Button';
import RadioInput from '../../common/Form/RadioInput';
import usePaymentMethodCartContext from '../hooks/usePaymentMethodCartContext';
import usePaymentMethodFormContext from '../hooks/usePaymentMethodFormContext';
import { _objToArray } from '../../../utils';
import { PAYMENT_METHOD_FORM } from '../../../config';
import { __ } from '../../../i18n';
import usePayone from '../../payone/hooks/usePayone';

function PaymentMethodList({ methodRenderers }) {
  const { fields } = usePaymentMethodFormContext();
  const {
    values,
    touched,
    setFieldValue,
    setFieldTouched,
  } = useFormikContext();
  const { handleCreditcardCheck } = usePayone({ values });
  const { methodList } = usePaymentMethodCartContext();
  const buttonDisable = !_get(touched, fields.code);
  const selectedPaymentMethod = _get(values, PAYMENT_METHOD_FORM);

  const handlePaymentMethodSelection = event => {
    const methodSelected = _get(methodList, event.target.value);

    if (methodSelected) {
      setFieldValue(fields.code, methodSelected.code);
      setFieldTouched(fields.code, true);
    }
  };

  return (
    <div className="py-4">
      <ul>
        {_objToArray(methodList).map(method => {
          const MethodRenderer = methodRenderers[method.code];
          return (
            <li key={method.code} className="flex">
              {MethodRenderer ? (
                <MethodRenderer
                  method={method}
                  selected={selectedPaymentMethod}
                  actions={{ change: handlePaymentMethodSelection }}
                />
              ) : (
                <RadioInput
                  label={method.title}
                  name="paymentMethod"
                  value={method.code}
                  onChange={handlePaymentMethodSelection}
                  checked={method.code === selectedPaymentMethod.code}
                />
              )}
            </li>
          );
        })}
      </ul>

      <div className="flex items-center justify-center mt-2">
        <Button
          click={handleCreditcardCheck}
          variant="success"
          disable={buttonDisable}
        >
          {__('Update')}
        </Button>
      </div>
    </div>
  );
}

PaymentMethodList.propTypes = {
  methodRenderers: Component,
};

export default PaymentMethodList;
