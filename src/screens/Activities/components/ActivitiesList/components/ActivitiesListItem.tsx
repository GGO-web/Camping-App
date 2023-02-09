import { useNavigation } from '@react-navigation/native';
import React, { useRef } from 'react';
import { LayoutAnimation } from 'react-native';

import {
  Colors, Drawer, Text, TouchableOpacity, Typography, View,
} from 'react-native-ui-lib';

import type { IActivity } from '../../../../../models/Activity.model';
import { useCompleteActivityMutation, useDeleteActivityMutation, useGetActivatedTripQuery } from '../../../../../redux/api/trip';
import { useGetUserQuery } from '../../../../../redux/api/user';

import { ScreenNavigationProp } from '../../../../../types';

export function ActivitiesListItem({ activity }: { activity: IActivity }) {
  const { data: user } = useGetUserQuery();
  const { data: activityUser } = useGetUserQuery(activity.userId);
  const { data: activatedTrip } = useGetActivatedTripQuery();

  const activityRef = useRef<any>(null);

  const [setCompletedActivity] = useCompleteActivityMutation();
  const [removeActivity] = useDeleteActivityMutation();

  const navigation = useNavigation<ScreenNavigationProp>();

  const isActivityOwner = activity.userId === user?.uid;
  const isTripOwner = activatedTrip?.userId === user?.uid;

  const completeActivityHandler = () => {
    if (isActivityOwner || isTripOwner) {
      setCompletedActivity(activity.id as string);
    }

    if (activityRef.current) {
      activityRef.current.closeDrawer();
    }
  };

  const deleteActivityHandler = () => {
    LayoutAnimation.configureNext({
      update: {
        type: LayoutAnimation.Types.easeIn,
        property: LayoutAnimation.Properties.scaleXY,
      },
      delete: {
        type: LayoutAnimation.Types.easeIn,
        property: LayoutAnimation.Properties.scaleXY,
        duration: 400,
      },
      duration: 400,
    });

    if (isActivityOwner || isTripOwner) {
      setTimeout(() => {
        removeActivity(activity.id as string);
      }, 1000);
    }

    if (activityRef.current) {
      activityRef.current.closeDrawer();
    }
  };

  return (
    <Drawer
      ref={activityRef}
      style={{
        borderRadius: 20,
        marginBottom: 24,
      }}
      itemsTextStyle={{
        ...Typography.heading4,
        color: Colors.white,
      }}
      fullSwipeLeft
      fullSwipeRight
      onFullSwipeLeft={completeActivityHandler}
      onFullSwipeRight={deleteActivityHandler}
      leftItem={{
        background: Colors.success,
        text: 'Complete',
        onPress: completeActivityHandler,
      }}
      rightItems={[{
        text: 'Delete',
        background: Colors.red,
        onPress: deleteActivityHandler,
      }]}
    >
      <TouchableOpacity
        activeOpacity={0.8}
        style={{
          padding: 24,
          borderRadius: 20,
          backgroundColor: activity.completed ? Colors.primary : Colors.gray,
        }}
        onLongPress={() => {
          navigation.navigate('Activity', { activity });
        }}
      >
        <View
          row
          spread
          centerV
          marginB-8
        >
          <Text
            numberOfLines={1}
            heading4
            style={{
              maxWidth: 180,
              color: activity.completed ? Colors.white : Colors.dark,
            }}
          >
            {activity.heading}
          </Text>

          <Text
            paragraph3
            gray300
            style={{
              color: activity.completed ? Colors.white : Colors.gray300,
            }}
          >
            By
            {' '}
            {isActivityOwner ? 'you' : activityUser?.fullname}
          </Text>
        </View>

        <Text
          numberOfLines={2}
          paragraph2
          gray700
          style={{
            color: activity.completed ? Colors.white : Colors.gray700,
          }}
        >
          {activity.description}
        </Text>
      </TouchableOpacity>
    </Drawer>
  );
}
