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

import { useAppSelector } from '../../redux/hooks';
import { getActivatedTripCollectionItemSelector } from '../../redux/tripsCollection/tripsCollection';

import { AssetsGraphicType, AssetsIconsType } from '../../matherialUI';

export const Activities = gestureHandlerRootHOC(() => {
  const { name: screenName } = useRoute();

  const navigation = useNavigation();

  const activatedTrip = useAppSelector(getActivatedTripCollectionItemSelector);
  const activitiesTasks = activatedTrip?.activities;

  return (
    <MainWrapper
      headerTitle={screenName}
      iconRight={(Assets.icons as AssetsIconsType).plus}
      iconRightCallback={() => navigation.navigate('AddActivity' as never)}
    >
      <RemainingDays />

      {!activitiesTasks?.length ? (
        <NoResults
          image={(Assets.graphic as AssetsGraphicType).activitiesTasks}
          text={'You didn\'t add any Activity or Task yet.'}
          buttonText="Add activity"
          buttonCallback={() => navigation.navigate('AddActivity' as never)}
        />
      ) : <ActivitiesList activities={activitiesTasks} />}

      <ActionsBar activeScreenName={screenName} />
    </MainWrapper>
  );
});
