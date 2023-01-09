import React from 'react';
import { Typography, View } from 'react-native-ui-lib';
import { FormikProps } from 'formik';

import { Input } from '../../../../components/Input/Input';
import { TextArea } from '../../../../components/Input/TextArea';
import { DismissKeyboardView } from '../../../../components/common/DismissKeyboardView';

import type { IProfileValues } from '../../Profile.model';

import { globalStyles } from '../../../../styles/global';
import { ButtonPrimary } from '../../../../components/Buttons/ButtonPrimary';

export function ProfileForm({
  formik,
}: {
  formik: FormikProps<IProfileValues>;
}) {
  return (
    <DismissKeyboardView>
      <View style={globalStyles.formGroup}>
        <Input formik={formik} fieldName="name" label="Name" />
      </View>

      <View style={globalStyles.formGroup}>
        <Input formik={formik} fieldName="occupation" label="Occupation" />
      </View>

      <View style={globalStyles.formGroup}>
        <TextArea
          formik={formik}
          fieldName="bio"
          label="Bio"
          numberOfLines={7}
          placeholder="White something about yourself"
          inputStyles={{
            height: 200,
          }}
          {...{
            fieldStyle: {
              ...globalStyles.text,
              ...globalStyles.input,
              ...Typography.paragraph2,
            },
          }}
        />
      </View>

      <ButtonPrimary
        marginT-8
        buttonText="Save"
        buttonCallback={() => formik.submitForm()}
      />
    </DismissKeyboardView>
  );
}
