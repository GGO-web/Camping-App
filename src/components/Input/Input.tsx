import React, { useCallback } from 'react';

import { FormikProps } from 'formik';

import { Colors } from 'react-native-ui-lib';
import { TextField, TextFieldProps } from 'react-native-ui-lib/src/incubator';

import { StyleProp, TextStyle, ViewStyle } from 'react-native';
import { globalStyles } from '../../styles/global';

export function Input({
  formik,
  fieldName,
  label,
  value,
  fieldStyles = {},
  validate = true,
  onChangeFunction,
  labelStyles,
  ...inputAttributes
}: {
  formik: FormikProps<any>,
  fieldName: string;
  label: string;
  value?: string;
  fieldStyles?: {};
  validate?: boolean;
  onChangeFunction?: Function,
  labelStyles?: StyleProp<ViewStyle & TextStyle | any>,
  inputAttributes?: TextFieldProps;
}) {
  const getFieldStyles = () => {
    switch (true) {
      case !formik.touched[fieldName]:
        return [];
      case formik.touched[fieldName] && !validate:
        return globalStyles.isError;
      case Boolean(formik.errors[fieldName]):
        return globalStyles.isError;
      default:
        return globalStyles.isValid;
    }
  };

  const getInputStyles = () => {
    switch (true) {
      case !validate && formik.errors[fieldName]:
        return globalStyles.isError;
      case validate && !formik.errors[fieldName]:
        return globalStyles.isValid;
      default:
        return { color: Colors.dark };
    }
  };

  return (
    <TextField
      migrate
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
      labelStyle={{
        ...globalStyles.text,
        ...globalStyles.label,
        ...(labelStyles as any),
      }}
      autoCapitalize="none"
      fieldStyle={{
        ...globalStyles.text,
        ...globalStyles.input,
        ...fieldStyles,
        ...(getFieldStyles()),
      }}
      onChange={useCallback(
        () => formik.setFieldTouched(fieldName, true, true),
        [formik.touched[fieldName]],
      )}
      enableErrors
      validateOnChange
      validateOnBlur
      onBlur={() => formik.handleBlur(fieldName)}
      validate={[() => false]}
      validationMessage={[formik.errors[fieldName]]}
      style={getInputStyles()}
      {...inputAttributes}
    />
  );
}
