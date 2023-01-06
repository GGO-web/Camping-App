import React, { useState } from 'react';

import {
  Assets, Button, Colors, Image, Text, View,
} from 'react-native-ui-lib';
import { useNavigation } from '@react-navigation/native';

import { Formik, FormikHelpers } from 'formik';

import { CrumbsLink } from '../../../../components/common/CrumbsLink';
import { TeammembersForm } from './components/TeammembersForm/TeammembersForm';

import { useAppSelector } from '../../../../redux/hooks';
import { teammateSchema } from '../../../../helpers/validationSchema';

import type { ITeamMate } from '../../NewTrip.model';

import { globalStyles } from '../../../../styles/global';

export interface ITeammateId {
  teammateId: string;
}

export function Teammembers() {
  const formInitialValues: ITeammateId = {
    teammateId: '',
  };

  const teammatesList: ITeamMate[] = useAppSelector((store) => store.trip.teammates);
  const [isReady, setIsReady] = useState(teammatesList.length > 1);

  const navigation = useNavigation();

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
        <View center flex>
          <Image
            marginB-24
            source={Assets.graphic.trips}
            style={{
              width: 230,
              height: 180,
              resizeMode: 'contain',
            }}
          />
          <Text marginB-8 paragraph2 gray700>
            You didn’t have any teammates added.
          </Text>
          <View left>
            <Button
              style={globalStyles.buttonOutlined}
              backgroundColor={Colors.primary}
              mode="outlined"
              onPress={() => setIsReady(true)}
            >
              <Text
                style={{
                  ...globalStyles.text,
                  ...globalStyles.buttonText,
                  ...globalStyles.buttonTextOutlined,
                }}
              >
                Add teammate
              </Text>
            </Button>
          </View>
        </View>
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
