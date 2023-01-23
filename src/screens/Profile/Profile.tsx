import { Formik } from 'formik';
import React, { useState } from 'react';
import { View, Text, ToastPresets } from 'react-native-ui-lib';

import { CrumbsLink } from '../../components/common/CrumbsLink';
import { ProfileAvatar } from './components/ProfileAvatar/ProfileAvatar';

import { IProfileValues } from './Profile.model';

import { globalStyles } from '../../styles/global';
import { profileSchema } from '../../helpers/validationSchema';
import { ProfileForm } from './components/ProfileForm/ProfileForm';

import { Toast } from '../../components/Toast/Toast';

import { useGetUserQuery, useUpdateUserProfileMutation } from '../../redux/api/user';
import { IUser } from '../../models/User.model';

export function Profile() {
  const { data: userProfile } = useGetUserQuery();

  const formInitialValues: IProfileValues = {
    name: userProfile?.fullname || '',
    bio: userProfile?.bio || '',
    occupation: userProfile?.occupation || '',
  };

  const [toastParams, setToastParams] = useState({
    visible: false,
    preset: ToastPresets.FAILURE,
    message: 'Profile info is not saved',
  });

  // const { setProfileInfo } = useActions();
  const [updateProfileInfo] = useUpdateUserProfileMutation();

  const formSubmitHandler = async (
    values: IProfileValues,
  ) => {
    setToastParams((prevToast) => ({
      ...prevToast,
      message: 'Profile updated successfully',
      preset: ToastPresets.SUCCESS,
      visible: true,
    }));

    const newProfile: IUser = {
      fullname: values.name,
      occupation: values.occupation,
      bio: values.bio,
    };

    updateProfileInfo(newProfile);
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
