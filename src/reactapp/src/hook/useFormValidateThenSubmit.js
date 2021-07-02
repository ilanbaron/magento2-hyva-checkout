import { object as YupObject } from 'yup';

import {
  focusOnFormErrorElement,
  prepareFormSectionErrorMessage,
} from '../utils/form';
import { _isObjEmpty } from '../utils';
import useAppContext from './useAppContext';

export default function useFormValidateThenSubmit({
  formId,
  formikData,
  submitHandler,
  validationSchema,
}) {
  const [, { setErrorMessage }] = useAppContext();
  const { formSectionErrors, isFormSectionTouched, formSectionValues } =
    formikData || {};

  return () => {
    if (isFormSectionTouched && !_isObjEmpty(formSectionErrors)) {
      setErrorMessage(
        prepareFormSectionErrorMessage(formId, formSectionErrors)
      );
      focusOnFormErrorElement(formId, formSectionErrors);

      return;
    }

    const validationRules = YupObject().shape(validationSchema);
    validationRules.validate(formSectionValues).then(valid => {
      if (valid) {
        submitHandler();
      }
    });
  };
}
