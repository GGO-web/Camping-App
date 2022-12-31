import React from 'react';
import {
  Assets,
  Colors, Text, Typography, View,
} from 'react-native-ui-lib';
import { FormikProps } from 'formik';

import { CrumbsLink } from '../../../../components/common/CrumbsLink';

import type { IActivity } from '../../../../models/Activity.model';
import type { AssetsIconsType } from '../../../../matherialUI';

import { TextArea } from '../../../../components/Input/TextArea';
import { DismissKeyboardView } from '../../../../components/common/DismissKeyboardView';

export function AddActivityForm({
  formSubmitHandler,
  formik,
}: {
  formSubmitHandler: Function,
  formik: FormikProps<IActivity>;
}) {
  return (
    <DismissKeyboardView>
      <CrumbsLink
        iconRight={(Assets.icons as AssetsIconsType).checkmark}
        iconRightStyles={{
          width: 22,
          height: 16,
          tintColor: formik.isValid ? Colors.dark : Colors.gray200,
        }}
        onPressIconRight={() => formSubmitHandler(formik.values)}
        buttonIconRightProps={{
          disabled: !formik.isValid,
          disabledBackgroundColor: 'transparent',
        }}
      >
        <Text>Add Activity</Text>
      </CrumbsLink>

      <View>
        <TextArea
          formik={formik}
          fieldName="heading"
          placeholder="Add heading"
          inputStyles={{
            ...Typography.heading3,
          }}
          numberOfLines={2}
          marginB-16
        />

        <TextArea
          formik={formik}
          fieldName="description"
          placeholder="Add description"
        />
      </View>
    </DismissKeyboardView>
  );
}
