import React, { useState } from 'react';
import {
  Assets, Text, View,
} from 'react-native-ui-lib';
import { useNavigation } from '@react-navigation/native';

import { Formik, FormikHelpers } from 'formik';

import { CrumbsLink } from '../../../../components/common/CrumbsLink';
import { TeammembersForm } from './components/TeammembersForm/TeammembersForm';
import { NoResults } from '../../../../components/common/NoResults';

import { useAppSelector } from '../../../../redux/hooks';
import { teammateSchema } from '../../../../helpers/validationSchema';
import { IUser } from '../../../../models/User.model';

import { AssetsGraphicType } from '../../../../matherialUI';

import { globalStyles } from '../../../../styles/global';

import { ScreenNavigationProp } from '../../../../types';

export interface ITeammateId {
  teammateId: string;
}

export function Teammembers() {
  const formInitialValues: ITeammateId = {
    teammateId: '',
  };

  const teammatesList: IUser[] = useAppSelector((store) => store.trip.teammates);
  const [isReady, setIsReady] = useState(teammatesList.length > 1);

  const navigation = useNavigation<ScreenNavigationProp>();

  const formSubmitHandler = async (
    values: ITeammateId,
    actions: FormikHelpers<ITeammateId>,
  ) => {
    try {
      // find person by id on the database and throw the error when it is't present

      navigation.goBack();
    } catch (error) {
      actions.setFieldError(
        'teammateId',
        'Looks like this ID is not valid. try another one',
      );
    }
  };

  return (
    <View style={{ ...globalStyles.container, ...globalStyles.navcontainer }}>
      <CrumbsLink>Add Teammate</CrumbsLink>

      {!isReady ? (
        <NoResults
          image={(Assets.graphic as AssetsGraphicType).trips}
          text="You didn’t have any teammates added."
          buttonText="Add teammate"
          buttonCallback={() => setIsReady(true)}
        />
      ) : (
        <>
          <Text paragraph2 textMuted marginB-24>
            Say your teammate to log-in first on Camping App. then your
            teammate will automatically recieve the ID. Then put the ID
            here and he will recieve the notification of invite. When he
            accept the request he’ll automatically add on to your team.
          </Text>

          <Formik
            initialValues={formInitialValues}
            onSubmit={(values: ITeammateId, actions) => {
              formSubmitHandler(values, actions);
            }}
            validationSchema={teammateSchema}
            validateOnMount
          >
            {(formik) => (
              <TeammembersForm
                formSubmitHandler={formSubmitHandler}
                formik={formik}
              />
            )}
          </Formik>
        </>
      )}
    </View>
  );
}
