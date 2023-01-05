import React from 'react';
import { FormikProps } from 'formik';

import { Typography, View } from 'react-native-ui-lib';

import { ButtonPrimary } from '../../../../components/Buttons/ButtonPrimary';
import { TextArea } from '../../../../components/Input/TextArea';

import type { IFeedbackValues } from '../../Feedback';

import { globalStyles } from '../../../../styles/global';

export function FeedbackForm({
  formik,
}: {
  formik: FormikProps<IFeedbackValues>;
}) {
  return (
    <View>
      <TextArea
        formik={formik}
        fieldName="message"
        label="Message"
        numberOfLines={7}
        placeholder="White some feedback for us :)"
        inputStyles={{
          height: 200,
        }}
        {...{
          fieldStyle: {
            ...globalStyles.text,
            ...globalStyles.input,
            ...Typography.paragraph2,
          },
        }}
      />

      <ButtonPrimary
        marginT-24
        buttonText="Submit"
        buttonCallback={() => formik.submitForm()}
      />
    </View>
  );
}
