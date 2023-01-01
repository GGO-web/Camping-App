import React, { useState } from 'react';
import { ToastPresets, View } from 'react-native-ui-lib';

import { Formik, FormikHelpers } from 'formik';

import { AddActivityForm } from './AddActivityForm';
import { Toast } from '../../../../components/Toast/Toast';

import { useActions } from '../../../../hooks/actions';

import { IActivity } from '../../../../models/Activity.model';
import { activitiesSchema } from '../../../../helpers/validationSchema';

import { globalStyles } from '../../../../styles/global';

export function AddActivity() {
  const formInitialValues: IActivity = {
    heading: '',
    description: '',
  };

  const [toastParams, setToastParams] = useState({
    visible: false,
    preset: ToastPresets.FAILURE,
    message: 'Item couldn`t be empty',
  });

  const { addActivity } = useActions();

  const formSubmitHandler = (values: IActivity, actions: FormikHelpers<IActivity>) => {
    setToastParams((prevToast) => ({
      ...prevToast,
      message: 'Activity has been added successfully',
      preset: ToastPresets.SUCCESS,
      visible: true,
    }));
    addActivity(values);

    actions.resetForm();
    actions.setErrors({
      heading: 'Activity heading is empty',
      description: 'Activity description is empty',
    });
  };

  return (
    <View style={{ ...globalStyles.container, ...globalStyles.navcontainer }}>
      <Toast
        visible={toastParams.visible}
        preset={toastParams.preset}
        toastMessage={toastParams.message}
        onDismiss={() => {
          setToastParams((prevToast) => ({ ...prevToast, visible: false }));
        }}
      />

      <Formik
        initialValues={formInitialValues}
        onSubmit={(values: IActivity, actions: FormikHelpers<IActivity>) => {
          formSubmitHandler(values, actions);
        }}
        validationSchema={activitiesSchema}
        validateOnChange
        validateOnMount
      >
        {(formik) => (
          <AddActivityForm
            formSubmitHandler={formSubmitHandler}
            formik={formik}
          />
        )}
      </Formik>
    </View>
  );
}
