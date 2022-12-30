import React from 'react';
import { View } from 'react-native-ui-lib';

import { Formik } from 'formik';

import { AddActivityForm } from './AddActivityForm';

import { IActivity } from '../../../../models/Activity.model';

import { globalStyles } from '../../../../styles/global';

export function AddActivity() {
  const formInitialValues: IActivity = {
    heading: '',
    description: '',
  };

  const formSubmitHandler = (values: IActivity) => {
    console.log(values);
  };

  return (
    <View style={{ ...globalStyles.container, ...globalStyles.navcontainer }}>
      <Formik
        initialValues={formInitialValues}
        onSubmit={(values: IActivity) => {
          formSubmitHandler(values);
        }}
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
