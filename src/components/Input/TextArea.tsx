import React from 'react';
import { ScrollView, StyleProp, ViewStyle } from 'react-native';

import { Colors, TextFieldProps, Typography } from 'react-native-ui-lib';

import { FormikProps } from 'formik';

import { Input } from './Input';

export function TextArea({
  formik,
  fieldName,
  placeholder,
  inputStyles,
  maxLength,
  ...inputAttributes
}: {
  formik: FormikProps<any>,
  fieldName: string,
  placeholder?: string,
  inputStyles?: StyleProp<ViewStyle>,
  maxLength?: number,
  inputAttributes?: TextFieldProps;
}) {
  return (
    <Input
      formik={formik}
      fieldName={fieldName}
      label=""
      {...{
        fieldStyle: {},
        caretHidden: false,
        placeholder,
        placeholderTextColor: Colors.dark,
        floatingPlaceholderStyle: {
          ...Typography.paragraph2,
        },
        style: {
          ...Typography.paragraph2,
          color: Colors.gray700,
          textAlignVertical: 'top',
          ...(inputStyles as any),
        },
        numberOfLines: 10,
        multiline: true,
        enablesReturnKeyAutomatically: true,
        enableErrors: false,
        autoCapitalize: 'sentences',
        ...inputAttributes,
      }}
    />
  );
}
