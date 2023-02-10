import React, { useState } from 'react';
import {
  Assets, Text, View,
} from 'react-native-ui-lib';
import { useNavigation } from '@react-navigation/native';

import { Formik, FormikHelpers } from 'formik';

import { ScrollView } from 'react-native';
import { CrumbsLink } from '../../../../components/common/CrumbsLink';
import { TeammembersForm } from './components/TeammembersForm/TeammembersForm';
import { NoResults } from '../../../../components/common/NoResults';

import { useAppSelector } from '../../../../redux/hooks';
import { teammateSchema } from '../../../../helpers/validationSchema';
import { IUser } from '../../../../models/User.model';

import { AssetsGraphicType } from '../../../../matherialUI';

import { globalStyles } from '../../../../styles/global';

import { ScreenNavigationProp } from '../../../../types';
import { useActions } from '../../../../hooks/actions';
import { useLazyGetUserQuery } from '../../../../redux/api/user';
import { TeammatesListItem } from '../../../Teammates/components/TeammatesListItem/TeammatesListItem';
import { ButtonPrimary } from '../../../../components/Buttons/ButtonPrimary';
import { firebaseAuth } from '../../../../firebase/firebase';

export interface ITeammateId {
  teammateId: string;
}

export function Teammembers() {
  const formInitialValues: ITeammateId = {
    teammateId: '',
  };

  const teammatesList: IUser[] = useAppSelector((store) => store.trip.teammates);

  const [getUser] = useLazyGetUserQuery();
  const { addTeammate } = useActions();

  const [isReady, setIsReady] = useState(teammatesList.length > 1);

  const navigation = useNavigation<ScreenNavigationProp>();

  const formSubmitHandler = async (
    values: ITeammateId,
    actions: FormikHelpers<ITeammateId>,
  ) => {
    try {
      // find person by id on the database and throw the error when it is't present
      const userIsAlreadyAdded = teammatesList.some(
        (teammate) => teammate.uid === values.teammateId,
      );

      if (values.teammateId === firebaseAuth.currentUser?.uid) {
        throw new Error('You can not add yourself as a teammate');
      }

      if (userIsAlreadyAdded) {
        throw new Error('User is already added');
      }

      const user = await getUser(values.teammateId).unwrap();

      addTeammate(user);

      navigation.goBack();
    } catch (error: any) {
      const errorMessage = error.message;

      actions.setFieldError(
        'teammateId',
        errorMessage,
      );
    }
  };

  return (
    <View style={{ ...globalStyles.container, ...globalStyles.navcontainer }}>
      <CrumbsLink>Add Teammate</CrumbsLink>

      {!isReady
        ? !teammatesList.length ? (
          <NoResults
            image={(Assets.graphic as AssetsGraphicType).trips}
            text="You didn’t have any teammates added."
            buttonText="Add teammate"
            buttonCallback={() => setIsReady(true)}
          />
        ) : (
          <>
            <ScrollView>
              {teammatesList.map((teammate) => (
                <TeammatesListItem
                  key={teammate.uid}
                  teammate={teammate}
                />
              ))}
            </ScrollView>

            <ButtonPrimary
              buttonCallback={() => setIsReady(true)}
              buttonText="Add teammate"
              marginB-20
            />
          </>
        )
        : (
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
                  formik={formik}
                />
              )}
            </Formik>
          </>
        )}
    </View>
  );
}
