import React, { useCallback } from 'react';

import { FormikProps } from 'formik';

import { Colors } from 'react-native-ui-lib';
import { TextField } from 'react-native-ui-lib/src/incubator';

import { globalStyles } from '../../styles/global';

export function Input({
  formik,
  fieldName,
  label,
  value,
  fieldStyles = {},
  validate = true,
  onChangeFunction,
  ...inputAttributes
}: {
  formik: FormikProps<any>,
  fieldName: string;
  label: string;
  value?: string;
  fieldStyles?: {};
  validate?: boolean;
  onChangeFunction?: Function,
  inputAttributes?: any;
}) {
  return (
    <TextField
      label={label}
      onChangeText={(newValue: string) => {
        formik.setFieldValue(fieldName, newValue);

        if (onChangeFunction) onChangeFunction(newValue);
      }}
      value={value || formik.values[fieldName]}
      validationMessageStyle={{
        ...globalStyles.validationMessage,
        ...(!validate ? { marginTop: 0 } : []),
      }}
      labelStyle={{ ...globalStyles.text, ...globalStyles.label }}
      autoCapitalize="none"
      fieldStyle={{
        ...globalStyles.text,
        ...globalStyles.input,
        ...fieldStyles,
        ...(formik.touched[fieldName] && validate
          ? formik.errors[fieldName]
            ? globalStyles.isError
            : globalStyles.isValid
          : []),
      }}
      onChange={useCallback(
        () => formik.setFieldTouched(fieldName, true, true),
        [formik.touched[fieldName]],
      )}
      enableErrors
      validateOnChange
      validateOnBlur
      onBlur={formik.handleBlur(fieldName)}
      validate={[() => false]}
      validationMessage={[formik.errors[fieldName]]}
      style={
        validate
          ? formik.errors[fieldName]
            ? globalStyles.isError
            : globalStyles.isValid
          : { color: Colors.dark }
      }
      {...inputAttributes}
    />
  );
}
