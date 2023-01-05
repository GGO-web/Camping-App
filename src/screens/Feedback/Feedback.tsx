import React, { useState } from 'react';
import { Formik } from 'formik';
import { Text, ToastPresets } from 'react-native-ui-lib';

import { MainWrapper } from '../../components/MainWrapper/MainWrapper';
import { FeedbackForm } from './components/FeedbackForm/FeedbackForm';
import { Toast } from '../../components/Toast/Toast';

import { feedbackSchema } from '../../helpers/validationSchema';

export interface IFeedbackValues {
  message: string;
}

export function Feedback() {
  const formInitialValues: IFeedbackValues = {
    message: '',
  };

  const [toastParams, setToastParams] = useState({
    visible: false,
    preset: ToastPresets.FAILURE,
    message: 'Feedback hasn`t sended',
  });

  const formSubmitHandler = (values: IFeedbackValues) => {
    console.log(values.message);
  };

  return (
    <MainWrapper headerTitle="Feedback">
      <Text paragraph2 gray500 marginB-24>
        We are continously trying to make the app better and your experience is
        matter. If you are seeing any kind of problems or bugs. Let us know we
        will listen you.
      </Text>

      <Formik
        initialValues={formInitialValues}
        onSubmit={(values: IFeedbackValues) => {
          formSubmitHandler(values);
        }}
        validationSchema={feedbackSchema}
        validateOnMount
        validateOnBlur
        validateOnChange
      >
        {(formik) => <FeedbackForm formik={formik} />}
      </Formik>

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
