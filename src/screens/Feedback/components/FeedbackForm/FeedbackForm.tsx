import React from 'react';
import { FormikProps } from 'formik';

import { TextArea, Typography } from 'react-native-ui-lib';

import { DismissKeyboardView } from '../../../../components/common/DismissKeyboardView';
import { ButtonPrimary } from '../../../../components/Buttons/ButtonPrimary';

import type { IFeedbackValues } from '../../Feedback';

import { globalStyles } from '../../../../styles/global';

export function FeedbackForm({
  formik,
}: {
  formik: FormikProps<IFeedbackValues>;
}) {
  return (
    <DismissKeyboardView>
      <TextArea
        formik={formik}
        fieldName="message"
        label="Message"
        numberOfLines={7}
        placeholder="White some feedback for us :)"
        inputStyles={{
          maxHeight: 200,
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
        marginT-8
        buttonText="Submit"
        buttonCallback={() => formik.submitForm()}
      />
    </DismissKeyboardView>
  );
}
