import React from 'react';
import { View } from 'react-native-ui-lib';

import { Formik, FormikHelpers } from 'formik';

import { CrumbsLink } from '../../components/common/CrumbsLink';

import { NewTripForm } from './components/NewTripForm/NewTripForm';

import { ITeamMate } from './NewTrip.model';

import { globalStyles } from '../../styles/global';
import { firebaseAuth } from '../../firebase/firebase';
import { useAppSelector } from '../../redux/hooks';

export interface INewTrip {
  name: string;
  teammates: Array<ITeamMate>;
}

export function NewTrip() {
  const formInitialValues: INewTrip = {
    name: '',
    teammates: [{
      id: firebaseAuth.currentUser?.uid as string,
      avatar: firebaseAuth.currentUser?.photoURL as string,
    }],
  };

  const selectedLocations = useAppSelector(
    (store) => store.selectedLocations.selectedLocations.map(
      (selectedLocation) => selectedLocation.name,
    ),
  );

  const formSubmitHandler = async (
    values: INewTrip,
    actions: FormikHelpers<INewTrip>,
  ) => {
    console.log(values);
  };

  return (
    <View style={{ ...globalStyles.container, ...globalStyles.navcontainer }}>
      <CrumbsLink>Add new Trip</CrumbsLink>

      <Formik
        initialValues={formInitialValues}
        onSubmit={(values: INewTrip, actions) => {
          formSubmitHandler(values, actions);
        }}
      >
        {(formik) => (
          <NewTripForm
            formSubmitHandler={formSubmitHandler}
            formik={formik}
          />
        )}
      </Formik>
    </View>
  );
}
