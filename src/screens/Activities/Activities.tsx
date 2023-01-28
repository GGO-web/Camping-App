import React from 'react';
import {
  Assets,
} from 'react-native-ui-lib';
import { useNavigation, useRoute } from '@react-navigation/native';

import { gestureHandlerRootHOC } from 'react-native-gesture-handler';

import { ActionsBar } from '../../components/ActionsBar/ActionsBar';
import { MainWrapper } from '../../components/MainWrapper/MainWrapper';
import { RemainingDays } from './components/RemainingDays/RemainingDays';
import { ActivitiesList } from './components/ActivitiesList/ActivitiesList';
import { NoResults } from '../../components/common/NoResults';
import { Loader } from '../../components/Loader/Loader';

import { useGetAllActivitiesQuery } from '../../redux/api/trip';

import { AssetsGraphicType, AssetsIconsType } from '../../matherialUI';

import { ScreenNavigationProp } from '../../types';

export const Activities = gestureHandlerRootHOC(() => {
  const { name: screenName } = useRoute();

  const navigation = useNavigation<ScreenNavigationProp>();

  const { data: activities, isLoading } = useGetAllActivitiesQuery();

  return (
    <MainWrapper
      headerTitle={screenName}
      iconRight={(Assets.icons as AssetsIconsType).plus}
      iconRightCallback={() => navigation.navigate('AddActivity')}
    >
      <RemainingDays />

      {isLoading
        ? <Loader message="Activities is fetching from the server, please wait some time..." />
        : null}

      {(!activities?.length && !isLoading) && (
        <NoResults
          image={(Assets.graphic as AssetsGraphicType).activitiesTasks}
          text={'You didn\'t add any Activity or Task yet.'}
          buttonText="Add activity"
          buttonCallback={() => navigation.navigate('AddActivity')}
        />
      )}

      {(activities?.length && !isLoading) ? <ActivitiesList activities={activities} /> : null}

      <ActionsBar activeScreenName={screenName} />
    </MainWrapper>
  );
});
