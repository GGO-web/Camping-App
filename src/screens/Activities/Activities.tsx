import React from 'react';
import {
  Assets, Text, View, Image, Button, Colors,
} from 'react-native-ui-lib';
import { useNavigation, useRoute } from '@react-navigation/native';

import { gestureHandlerRootHOC } from 'react-native-gesture-handler';

import { ActionsBar } from '../../components/ActionsBar/ActionsBar';
import { MainWrapper } from '../../components/MainWrapper/MainWrapper';
import { RemainingDays } from './components/RemainingDays/RemainingDays';
import { ActivitiesList } from './components/ActivitiesList/ActivitiesList';

import { useAppSelector } from '../../redux/hooks';
import { getActivatedTripCollectionItemSelector } from '../../redux/tripsCollection/tripsCollection';

import { AssetsGraphicType, AssetsIconsType } from '../../matherialUI';

import { globalStyles } from '../../styles/global';

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
        <View center flex>
          <Image marginB-24 source={(Assets.graphic as AssetsGraphicType).activitiesTasks} />
          <Text marginB-8 paragraph2 gray700>
            You didn&apos;t add any Activity or Task yet.
          </Text>
          <View left>
            <Button
              style={globalStyles.buttonOutlined}
              backgroundColor={Colors.primary}
              mode="outlined"
              onPress={() => navigation.navigate('AddActivity' as never)}
            >
              <Text
                style={{
                  ...globalStyles.text,
                  ...globalStyles.buttonText,
                  ...globalStyles.buttonTextOutlined,
                }}
              >
                Add activity
              </Text>
            </Button>
          </View>
        </View>
      ) : <ActivitiesList activities={activitiesTasks} />}

      <ActionsBar activeScreenName={screenName} />
    </MainWrapper>
  );
});
