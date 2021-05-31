/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/label-has-for */
import React from 'react';
import _get from 'lodash.get';
import { ErrorMessage, Field, useField } from 'formik';
import { bool, string } from 'prop-types';

function TextInput({
  id,
  name,
  label,
  helpText,
  required,
  placeholder,
  className,
  width,
  ...rest
}) {
  const inputId = id || name;
  const [, meta] = useField(name) || [];
  const hasError = !!_get(meta, 'error', false);
  const hasTouched = !!_get(meta, 'touched', false);

  return (
    <div className="my-3 form-control">
      <div className="flex items-center justify-between">
        <label htmlFor={inputId} className="label">
          {label}
          {required && <span className="text-red">*</span>}
        </label>
        <div className="text-xs text-gray-light" id={`${inputId}-help`} tabIndex="-1">
          {helpText}
        </div>
      </div>
      <Field
        {...rest}
        name={name}
        id={inputId}
        placeholder={placeholder}
        className={`form-input ${className} ${hasError ? 'invalid' : ''} ${
          !hasError && hasTouched ? 'valid' : ''
        } ${width || 'w-full'}`}
        aria-describedby={`${inputId}-feedback ${inputId}-help`}
      />
      <div
          id={`${inputId}-feedback`}
          aria-live="polite"
          className="text-sm text-gray-light italic"
      >
        <ErrorMessage name={name}>
          {msg => msg.replace('%1', label)}
        </ErrorMessage>
      </div>
    </div>
  );
}

TextInput.propTypes = {
  id: string,
  name: string.isRequired,
  label: string,
  helpText: string,
  placeholder: string,
  required: bool,
  width: string,
  className: string,
};

TextInput.defaultProps = {
  id: '',
  label: '',
  width: '',
  helpText: '',
  required: false,
  placeholder: '',
  className: '',
};

export default TextInput;
