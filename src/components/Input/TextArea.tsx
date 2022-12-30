import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';

import { Colors, TextFieldProps, Typography } from 'react-native-ui-lib';

import { FormikProps } from 'formik';

import { Input } from './Input';

export function TextArea({
  formik,
  fieldName,
  placeholder,
  inputStyles,
  numberOfLines,
  ...inputAttributes
}: {
  formik: FormikProps<any>,
  fieldName: string,
  placeholder?: string,
  inputStyles?: StyleProp<ViewStyle>,
  numberOfLines?: number,
  inputAttributes?: TextFieldProps;
}) {
  return (
    <Input
      formik={formik}
      fieldName={fieldName}
      label=""
      {...{
        fieldStyle: {
          padding: 0,
        },
        caretHidden: false,
        placeholder,
        placeholderTextColor: Colors.gray300,
        floatingPlaceholderStyle: {
          ...Typography.paragraph2,
        },
        style: {
          ...Typography.paragraph2,
          color: Colors.gray700,
          textAlignVertical: 'top',
          padding: 0,
          ...(inputStyles as any),
        },
        numberOfLines: numberOfLines || 10,
        multiline: true,
        enablesReturnKeyAutomatically: true,
        enableErrors: false,
        autoCapitalize: 'sentences',
        underlineColorAndroid: 'rgba(255,255,255,0)',
        ...inputAttributes,
      }}
    />
  );
}
