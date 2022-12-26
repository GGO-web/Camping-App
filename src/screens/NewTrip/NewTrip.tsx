import React, { useState } from 'react';
import { View } from 'react-native-ui-lib';
import { Toast, ToastPresets } from 'react-native-ui-lib/src/incubator';

import { Formik } from 'formik';

import { useNavigation } from '@react-navigation/native';
import { CrumbsLink } from '../../components/common/CrumbsLink';

import { NewTripForm } from './components/NewTripForm/NewTripForm';

import { firebaseAuth } from '../../firebase/firebase';
import { useAppSelector } from '../../redux/hooks';
import { useActions } from '../../hooks/actions';

import { ITeamMate } from './NewTrip.model';

import { globalStyles } from '../../styles/global';
import { NEW_TRIP_TOAST_MESSAGES } from '../../constants';
import { ITripPeriod } from '../../models/Trip.model';

export interface INewTrip {
  name: string;
  teammates: Array<ITeamMate>;
  tripPeriod: ITripPeriod
}

export function NewTrip() {
  const tripData = useAppSelector((store) => store.trip);

  const formInitialValues: INewTrip = {
    name: tripData.tripName,
    teammates: tripData.teammates || [{
      id: firebaseAuth.currentUser?.uid as string,
      avatar: firebaseAuth.currentUser?.photoURL as string,
    }],
    tripPeriod: tripData.tripPeriod,
  };

  const navigation = useNavigation();

  const { setTripName, setTeammates } = useActions();

  const [toastParams, setToastParams] = useState({
    visible: false,
    preset: ToastPresets.GENERAL,
    message: '',
  });

  const formSubmitHandler = async (
    values: INewTrip,
  ) => {
    if (values.name.length === 0) {
      setToastParams((prevToast) => ({
        ...prevToast,
        message: NEW_TRIP_TOAST_MESSAGES.tripNameEmpty.message,
        preset: NEW_TRIP_TOAST_MESSAGES.tripNameEmpty.preset,
        visible: true,
      }));
      return;
    }

    if (tripData.selectedLocations.length === 0) {
      setToastParams((prevToast) => ({
        ...prevToast,
        message: NEW_TRIP_TOAST_MESSAGES.tripLocationsEmpty.message,
        preset: NEW_TRIP_TOAST_MESSAGES.tripLocationsEmpty.preset,
        visible: true,
      }));
      return;
    }

    if (tripData.tripPeriod.formatted.length === 0) {
      setToastParams((prevToast) => ({
        ...prevToast,
        message: NEW_TRIP_TOAST_MESSAGES.tripDatePeriodEmpty.message,
        preset: NEW_TRIP_TOAST_MESSAGES.tripDatePeriodEmpty.preset,
        visible: true,
      }));
      return;
    }

    setTripName(values.name);
    setTeammates(values.teammates);

    setToastParams({
      message: NEW_TRIP_TOAST_MESSAGES.tripSuccess.message,
      preset: NEW_TRIP_TOAST_MESSAGES.tripSuccess.preset,
      visible: true,
    });
  };

  return (
    <>
      <Toast
        visible={toastParams.visible}
        position="top"
        message={toastParams.message}
        preset={toastParams.preset}
        onDismiss={() => {
          setToastParams((prevToast) => ({ ...prevToast, visible: false }));

          // on dismiss toast navigate to the next screen
          if (toastParams.preset === ToastPresets.SUCCESS) {
            navigation.navigate('Bag' as never);
          }
        }}
        autoDismiss={2500}
        zIndex={2500}
      />
      <View style={{ ...globalStyles.container, ...globalStyles.navcontainer }}>
        <CrumbsLink>Add new Trip</CrumbsLink>

        <Formik
          initialValues={formInitialValues}
          onSubmit={(values: INewTrip) => {
            formSubmitHandler(values);
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
    </>
  );
}
