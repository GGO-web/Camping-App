import React from 'react';
import {
  View,
} from 'react-native-ui-lib';
import { useNavigation } from '@react-navigation/native';
import { Formik, FormikHelpers } from 'formik';

import { CrumbsLink } from '../../../../components/common/CrumbsLink';

import { locationSchema } from '../../../../helpers/validationSchema';

import { globalStyles } from '../../../../styles/global';
import { LocationsForm } from './components/LocationForm/LocationsForm';

export interface ILocationValue {
  location: string;
}

export function Locations() {
  const formInitialValues: ILocationValue = {
    location: '',
  };

  const navigation = useNavigation();

  const formSubmitHandler = async (
    values: ILocationValue,
    actions: FormikHelpers<ILocationValue>,
  ) => {
    try {
      // find person by id on the database and throw the error when it isn't present

      navigation.goBack();
    } catch (error) {
      actions.setFieldError(
        'teammateId',
        'Looks like this ID is not valid. try another one',
      );
    }
  };

  return (
    <View style={{ ...globalStyles.container, ...globalStyles.navcontainer }}>
      <CrumbsLink>Locations</CrumbsLink>

      <Formik
        initialValues={formInitialValues}
        onSubmit={(values: ILocationValue, actions) => {
          formSubmitHandler(values, actions);
        }}
        validationSchema={locationSchema}
        validateOnMount
      >
        {(formik) => (
          <LocationsForm
            formik={formik}
          />
        )}
      </Formik>
    </View>
  );
}
