import React, { useCallback, useMemo, useState } from 'react';
import { node } from 'prop-types';
import { Formik } from 'formik';
import { object as YupObject } from 'yup';

import CheckoutFormContext from './CheckoutFormContext';
import useCartContext from '../../hook/useCartContext';
import useAppContext from '../../hook/useAppContext';
import { config } from '../../config';
import LocalStorage from '../../utils/localStorage';

function prepareFormInitValues(sections) {
  const initValues = {};
  sections.forEach(section => {
    initValues[section.id] = section.initialValues;
  });
  return initValues;
}

function prepareFormValidationSchema(sections, sectionId) {
  const schemaRules = {};

  if (sectionId) {
    const section = sections.find(sec => sec.id === sectionId);
    schemaRules[sectionId] = YupObject().shape(section.validationSchema);

    return YupObject().shape(schemaRules);
  }

  sections.forEach(section => {
    schemaRules[section.id] = YupObject().shape(section.validationSchema);
  });
  return YupObject().shape(schemaRules);
}

/**
 * Provider that wraps the entire checkout form
 */
function CheckoutFormProvider({ children }) {
  /**
   * Represent which form section is active at the moment
   */
  const [activeForm, setActiveForm] = useState(false);

  /**
   * Holds individual form sections which constitutes the entire checkout-form-formik
   */
  const [sections, updateSections] = useState([]);

  const [paymentActionList, setPaymentActions] = useState({});

  const {
    placeOrder,
    selectedShippingMethod,
    selectedPaymentMethod,
  } = useCartContext();
  const [, { setPageLoader }] = useAppContext();

  const registerPaymentAction = useCallback(
    (paymentMethodCode, paymentMethodAction) => {
      setPaymentActions(actions => ({
        ...actions,
        [paymentMethodCode]: paymentMethodAction,
      }));
    },
    [setPaymentActions]
  );

  /**
   * This will register individual form sections to the checkout-form-formik
   */
  const registerFormSection = useCallback(section => {
    updateSections(prevSections => [...prevSections, section]);
  }, []);

  const formSubmit = async values => {
    try {
      setPageLoader(true);
      const order = await placeOrder(
        values,
        paymentActionList,
        selectedShippingMethod,
        selectedPaymentMethod
      );

      if (order && order.redirectUrl) {
        LocalStorage.clearCheckoutStorage();
        window.location.replace(`${config.baseUrl}${order.redirectUrl}`);
      }
    } catch (error) {
      setPageLoader(false);
    }
  };

  const context = useMemo(
    () => ({
      activeFormSection: activeForm,
      setActiveFormSection: setActiveForm,
      registerFormSection,
    }),
    [activeForm, registerFormSection]
  );

  /**
   * Init value of checkout-form-formik
   *
   * It will be the combined object of each individual form sections which
   * are registered to this provider.
   *
   * So the whole initValues would be represented like:
   * {
   *    [form_section_id]: { ...form_section_init_vallues},
   *    [form_section_id]: { ...form_section_init_vallues},
   * }
   */
  const formInitialValues = prepareFormInitValues(sections);

  /**
   * ValidationSchema of checkout-form-formik
   *
   * If there is no activeForm, then the validationSchema equals to the combined
   * validationSchema of each individual form section which are registered with
   * this provider
   *
   * If there is a valid activeForm, then the validationSchema represent the
   * validationSchema of the active form section.
   */
  const formValidationSchema = prepareFormValidationSchema(
    sections,
    activeForm
  );

  return (
    <CheckoutFormContext.Provider
      value={{
        ...context,
        checkoutFormValidationShema: formValidationSchema,
        submitHandler: formSubmit,
        registerPaymentAction,
      }}
    >
      <Formik
        enableReinitialize
        initialValues={formInitialValues}
        validationSchema={formValidationSchema}
        onSubmit={formSubmit}
      >
        {children}
      </Formik>
    </CheckoutFormContext.Provider>
  );
}

CheckoutFormProvider.propTypes = {
  children: node.isRequired,
};

export default CheckoutFormProvider;
