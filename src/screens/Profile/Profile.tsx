import { Formik } from 'formik';
import React, { useState } from 'react';
import { View, Text, ToastPresets } from 'react-native-ui-lib';

import { CrumbsLink } from '../../components/common/CrumbsLink';
import { ProfileAvatar } from './components/ProfileAvatar/ProfileAvatar';

import { IProfileValues } from './Profile.model';

import { globalStyles } from '../../styles/global';
import { profileSchema } from '../../helpers/validationSchema';
import { ProfileForm } from './components/ProfileForm/ProfileForm';
import { useActions } from '../../hooks/actions';
import { useAppSelector } from '../../redux/hooks';
import { userSelector } from '../../redux/userConfig/userSlice';
import { Toast } from '../../components/Toast/Toast';

export function Profile() {
  const userProfile = useAppSelector(userSelector);

  const formInitialValues: IProfileValues = {
    name: userProfile.fullname || '',
    bio: userProfile.bio || '',
    occupation: userProfile.occupation || '',
  };

  const [toastParams, setToastParams] = useState({
    visible: false,
    preset: ToastPresets.FAILURE,
    message: 'Profile info is not saved',
  });

  const { setProfileInfo } = useActions();

  const formSubmitHandler = async (
    values: IProfileValues,
  ) => {
    setToastParams((prevToast) => ({
      ...prevToast,
      message: 'Profile updated successfully',
      preset: ToastPresets.SUCCESS,
      visible: true,
    }));
    setProfileInfo(values);
  };

  return (
    <View style={{ ...globalStyles.container, ...globalStyles.navcontainer }}>
      <CrumbsLink>
        <Text>Edit Profile</Text>
      </CrumbsLink>

      <ProfileAvatar />

      <Formik
        initialValues={formInitialValues}
        onSubmit={(values: IProfileValues) => {
          formSubmitHandler(values);
        }}
        validationSchema={profileSchema}
        validateOnMount
        validateOnBlur
        validateOnChange
      >
        {(formik) => (
          <ProfileForm
            formik={formik}
          />
        )}
      </Formik>

      <Toast
        visible={toastParams.visible}
        preset={toastParams.preset}
        toastMessage={toastParams.message}
        onDismiss={() => {
          setToastParams((prevToast) => ({ ...prevToast, visible: false }));
        }}
      />
    </View>
  );
}
