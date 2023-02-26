import React, { useState } from 'react';
import { Formik, FormikHelpers } from 'formik';
import { Text, ToastPresets } from 'react-native-ui-lib';

import { MainWrapper } from '../../components/MainWrapper/MainWrapper';
import { FeedbackForm } from './components/FeedbackForm/FeedbackForm';
import { Toast } from '../../components/Toast/Toast';
import { DismissKeyboardView } from '../../components/common/DismissKeyboardView';

import { feedbackSchema } from '../../helpers/validationSchema';

import { useCreateFeedbackMutation } from '../../redux/api/feedback';

export interface IFeedbackValues {
  message: string;
}

export function Feedback() {
  const formInitialValues: IFeedbackValues = {
    message: '',
  };

  const [createFeedback] = useCreateFeedbackMutation();

  const [toastParams, setToastParams] = useState({
    visible: false,
    preset: ToastPresets.FAILURE,
    message: 'Feedback hasn`t sended',
  });

  const formSubmitHandler = async (
    values: IFeedbackValues,
    actions: FormikHelpers<IFeedbackValues>,
  ) => {
    try {
      await createFeedback(values.message);

      setToastParams((prevToast) => ({
        ...prevToast,
        preset: ToastPresets.SUCCESS,
        message: 'Thank you for submitting your valuable review. We will read your message soon.',
        visible: true,
      }));

      actions.resetForm();
    } catch (err) {
      setToastParams((prevToast) => ({
        ...prevToast,
        preset: ToastPresets.FAILURE,
        message: 'Message has not been sent. Please try again later.',
        visible: true,
      }));
    }
  };

  return (
    <MainWrapper headerTitle="Feedback">
      <DismissKeyboardView>
        <Text paragraph2 gray500 marginB-24>
          We are continously trying to make the app better and your experience is
          matter. If you are seeing any kind of problems or bugs. Let us know we
          will listen you.
        </Text>

        <Formik
          initialValues={formInitialValues}
          onSubmit={(values: IFeedbackValues, actions: FormikHelpers<IFeedbackValues>) => {
            formSubmitHandler(values, actions);
          }}
          validationSchema={feedbackSchema}
          validateOnMount
          validateOnBlur
          validateOnChange
        >
          {(formik) => <FeedbackForm formik={formik} />}
        </Formik>

      </DismissKeyboardView>

      <Toast
        visible={toastParams.visible}
        preset={toastParams.preset}
        toastMessage={toastParams.message}
        onDismiss={() => {
          setToastParams((prevToast) => ({ ...prevToast, visible: false }));
        }}
      />
    </MainWrapper>
  );
}
