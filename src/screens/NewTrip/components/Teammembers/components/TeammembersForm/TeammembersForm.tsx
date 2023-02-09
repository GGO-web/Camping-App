import React from 'react';
import {
  Button, Colors, Text, View,
} from 'react-native-ui-lib';

import { FormikProps } from 'formik';

import { Input } from '../../../../../../components/Input/Input';

import type { ITeammateId } from '../../Teammembers';

import { globalStyles } from '../../../../../../styles/global';

export function TeammembersForm({
  formik,
}: {
  formik: FormikProps<ITeammateId>;
}) {
  return (
    <View>
      <View style={globalStyles.formGroup}>
        <Input
          formik={formik}
          fieldName="teammateId"
          label="ID"
          {...{
            caretHidden: false,
          }}
        />
      </View>

      <Button
        style={globalStyles.button}
        mode="contained"
        backgroundColor={Colors.primary}
        disabledBackgroundColor={Colors.gray400}
        disabled={!formik.isValid}
        onPress={() => formik.submitForm()}
      >
        <Text style={{ ...globalStyles.text, ...globalStyles.buttonText }}>
          Send request
        </Text>
      </Button>
    </View>
  );
}
