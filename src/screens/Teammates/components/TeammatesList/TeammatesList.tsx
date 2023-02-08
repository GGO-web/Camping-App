import React from 'react';
import { ScrollView } from 'react-native';
import { Assets, Text } from 'react-native-ui-lib';
import { Formik, FormikHelpers } from 'formik';

import { ButtonPrimary } from '../../../../components/Buttons/ButtonPrimary';
import { NoResults } from '../../../../components/common/NoResults';
import { Loader } from '../../../../components/Loader/Loader';
import { TeammembersForm } from '../../../NewTrip/components/Teammembers/components/TeammembersForm/TeammembersForm';
import { TeammatesListItem } from '../TeammatesListItem/TeammatesListItem';

import { teammateSchema } from '../../../../helpers/validationSchema';
import { AssetsGraphicType } from '../../../../matherialUI';

import {
  useAddTeammateMutation,
  useGetAllTeammatesQuery,
} from '../../../../redux/api/teammates';

export function TeammatesList() {
  const formInitialValues: { teammateId: string } = {
    teammateId: '',
  };

  const { data: teammates, isLoading } = useGetAllTeammatesQuery();

  const [isReady, setIsReady] = React.useState(false);
  const [addTeammate] = useAddTeammateMutation();

  if (isLoading) {
    return <Loader message="Teammates is fetching from the server" />;
  }

  const addNewTeammateHandler = async (
    teammateId: string,
    actions: FormikHelpers<{ teammateId: string }>,
  ) => {
    try {
      await addTeammate(teammateId).unwrap();

      setIsReady(false);
    } catch (e: any) {
      actions.setFieldError('teammateId', e.data.message);
    }
  };

  return !isReady ? (
    !teammates?.length ? (
      <NoResults
        image={(Assets.graphic as AssetsGraphicType).trips}
        text="You didn’t have any teammates added."
        buttonText="Add teammate"
        buttonCallback={() => setIsReady(true)}
      />
    ) : (
      <>
        <ScrollView>
          {teammates?.map((teammate) => (
            <TeammatesListItem key={teammate.uid} teammate={teammate} />
          ))}
        </ScrollView>

        <ButtonPrimary
          buttonCallback={() => setIsReady(true)}
          buttonText="Add teammate"
          marginB-20
        />
      </>
    )
  ) : (
    <>
      <Text paragraph2 textMuted marginB-24>
        Say your teammate to log-in first on Camping App. then your teammate
        will automatically recieve the ID. Then put the ID here and he will
        recieve the notification of invite. When he accept the request he’ll
        automatically add on to your team.
      </Text>

      <Formik
        initialValues={formInitialValues}
        onSubmit={(values: { teammateId: string }, actions) => {
          addNewTeammateHandler(values.teammateId, actions);
        }}
        validationSchema={teammateSchema}
        validateOnMount
      >
        {(formik) => <TeammembersForm formik={formik} />}
      </Formik>

      <ButtonPrimary
        marginT-10
        buttonText="Go back"
        buttonCallback={() => setIsReady(false)}
      />
    </>
  );
}
