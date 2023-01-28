import React from 'react';
import {
  View,
} from 'react-native-ui-lib';
import { useNavigation } from '@react-navigation/native';
import { Formik, FormikHelpers } from 'formik';

import { CrumbsLink } from '../../../../components/common/CrumbsLink';
import { LocationsForm } from './components/LocationForm/LocationsForm';

import { locationSchema } from '../../../../helpers/validationSchema';

import { globalStyles } from '../../../../styles/global';
import { ScreenNavigationProp } from '../../../../types';

export interface ILocationValue {
  location: string;
}

export function Locations() {
  const formInitialValues: ILocationValue = {
    location: '',
  };

  const navigation = useNavigation<ScreenNavigationProp>();

  const formSubmitHandler = async (
    values: ILocationValue,
    actions: FormikHelpers<ILocationValue>,
  ) => {
    try {
      navigation.goBack();
    } catch (error) {
      actions.setFieldError(
        'location',
        'Looks location is not present, please try another one',
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
