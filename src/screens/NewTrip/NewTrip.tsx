import React, { useState } from 'react';
import { Platform, ToastAndroid } from 'react-native';
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

import { ITripPeriod } from '../../models/Trip.model';
import { IToast } from '../../models/Toast.model';

import { NEW_TRIP_TOAST_MESSAGES } from '../../constants';

import { globalStyles } from '../../styles/global';

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

  const [toastParams, setToastParams] = useState<IToast>({
    visible: false,
    preset: ToastPresets.GENERAL,
    message: '',
  });

  const isIOS = Platform.OS === 'ios';

  const formSubmitHandler = async (
    values: INewTrip,
  ) => {
    let formSubmitMessage: string = '';
    let formSubmitPreset: ToastPresets = ToastPresets.GENERAL;

    if (values.name.length === 0) {
      formSubmitMessage = NEW_TRIP_TOAST_MESSAGES.tripNameEmpty.message;
      formSubmitPreset = NEW_TRIP_TOAST_MESSAGES.tripNameEmpty.preset;
    } else if (tripData.selectedLocations.length === 0) {
      formSubmitMessage = NEW_TRIP_TOAST_MESSAGES.tripLocationsEmpty.message;
      formSubmitPreset = NEW_TRIP_TOAST_MESSAGES.tripLocationsEmpty.preset;
    } else if (tripData.tripPeriod.formatted.length === 0) {
      formSubmitMessage = NEW_TRIP_TOAST_MESSAGES.tripDatePeriodEmpty.message;
      formSubmitPreset = NEW_TRIP_TOAST_MESSAGES.tripDatePeriodEmpty.preset;
    }

    if (formSubmitMessage && formSubmitPreset) {
      if (isIOS) {
        setToastParams((prevToast) => ({
          ...prevToast,
          message: formSubmitMessage,
          preset: formSubmitPreset,
          visible: true,
        }));
      } else {
        ToastAndroid.showWithGravity(
          formSubmitMessage,
          ToastAndroid.SHORT,
          ToastAndroid.TOP,
        );
      }
    } else {
      setTripName(values.name);
      setTeammates(values.teammates);

      if (isIOS) {
        setToastParams({
          message: NEW_TRIP_TOAST_MESSAGES.tripSuccess.message,
          preset: NEW_TRIP_TOAST_MESSAGES.tripSuccess.preset,
          visible: true,
        });
      } else {
        ToastAndroid.showWithGravity(
          NEW_TRIP_TOAST_MESSAGES.tripSuccess.message,
          ToastAndroid.SHORT,
          ToastAndroid.TOP,
        );
      }

      // when toast preset get SUCCESS - navigate to the bag screen
      navigation.navigate('Bag' as never);
    }
  };

  return (
    <>
      { isIOS ? (
        <Toast
          visible={toastParams.visible}
          position="top"
          message={toastParams.message}
          preset={toastParams.preset}
          onDismiss={() => {
            setToastParams((prevToast) => ({ ...prevToast, visible: false }));
          }}
          autoDismiss={700}
          zIndex={2500}
        />
      ) : null }

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
