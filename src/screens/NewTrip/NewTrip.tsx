import React from 'react';
import { View } from 'react-native-ui-lib';

import { Formik, FormikHelpers } from 'formik';

import { useNavigation } from '@react-navigation/native';
import { CrumbsLink } from '../../components/common/CrumbsLink';

import { NewTripForm } from './components/NewTripForm/NewTripForm';

import { firebaseAuth } from '../../firebase/firebase';
import { useAppSelector } from '../../redux/hooks';
import { useActions } from '../../hooks/actions';

import { ITeamMate } from './NewTrip.model';

import { globalStyles } from '../../styles/global';

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

  const navigation = useNavigation();

  const tripData = useAppSelector((store) => store.trip);

  const { setTripName, setTeammates } = useActions();

  const formSubmitHandler = async (
    values: INewTrip,
    actions: FormikHelpers<INewTrip>,
  ) => {
    if (values.name.length === 0) {
      return;
    }

    if (tripData.selectedLocations.length === 0) {
      return;
    }

    if (tripData.tripPeriod.formatted.length === 0) {
      return;
    }

    setTripName(values.name);
    setTeammates(values.teammates);

    navigation.navigate('Bag' as never);
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
