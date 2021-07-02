import React, { useMemo } from 'react';
import _get from 'lodash.get';
import { useFormikContext } from 'formik';

import BillingAddressMemorized from './BillingAddressMemorized';
import { BILLING_ADDR_FORM } from '../../config';
import useFormikMemorizer from '../../hook/useFormikMemorizer';

const regionField = `${BILLING_ADDR_FORM}.region`;
const countryField = `${BILLING_ADDR_FORM}.country`;

/**
 * Entry point Billing Address Form Section
 *
 * We are preparing any data related to formik state here and memorizing it.
 * After that, these info will be fed to all other child components.
 *
 * So child components DO NOT access formik states using `useFormikContext` hook
 * inside them unless it is totally unavoidable.
 *
 * Using useFormikContext hook render the component almost always. So use the
 * memorized data here inside the child components.
 */
function BillingAddress() {
  const { values } = useFormikContext();
  const formSectionData = useFormikMemorizer(BILLING_ADDR_FORM);
  const selectedRegion = _get(values, regionField);
  const selectedCountry = _get(values, countryField);
  const { formSectionValues, isFormSectionTouched } = formSectionData;

  const billingFormikData = useMemo(
    () => ({
      ...formSectionData,
      selectedRegion,
      selectedCountry,
      billingValues: formSectionValues,
      isBillingAddressTouched: isFormSectionTouched,
    }),
    [
      selectedRegion,
      formSectionData,
      selectedCountry,
      formSectionValues,
      isFormSectionTouched,
    ]
  );

  return <BillingAddressMemorized formikData={billingFormikData} />;
}

export default BillingAddress;
