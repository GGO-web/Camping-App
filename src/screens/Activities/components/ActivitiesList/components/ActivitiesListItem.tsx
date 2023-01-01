import React, { useRef } from 'react';
import { LayoutAnimation } from 'react-native';

import {
  Colors, Drawer, Text, Typography, View,
} from 'react-native-ui-lib';

import { useActions } from '../../../../../hooks/actions';

import type { IActivity } from '../../../../../models/Activity.model';

export function ActivitiesListItem({ activity }: { activity: IActivity }) {
  const activityRef = useRef<any>(null);

  const { removeActivity, setCompletedActivity } = useActions();

  const completeActivityHandler = () => {
    setCompletedActivity(activity.id as string);

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

    setTimeout(() => {
      removeActivity(activity.id as string);
    }, 600);

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
      // itemsMinWidth={143}
      fullSwipeLeft
      fullSwipeRight
      onFullSwipeLeft={completeActivityHandler}
      onFullSwipeRight={deleteActivityHandler}
      leftItem={{
        background: Colors.success,
        text: 'Complete',
        onPress: completeActivityHandler,
        // customElement: (
        //   <View
        //     flex
        //     centerH
        //     centerV
        //     padding-20
        //     style={{
        //       position: 'absolute',
        //       left: 0,
        //       right: 0,
        //       top: 0,
        //       bottom: 0,
        //       backgroundColor: Colors.primary,
        //       borderRadius: 20,
        //       marginRight: 16,
        //     }}
        //   >
        //     <Text heading4 white>Complete</Text>
        //   </View>
        // ),
      }}
      rightItems={[{
        text: 'Delete',
        background: Colors.red,
        onPress: deleteActivityHandler,
      }]}
    >
      <View style={{
        padding: 24,
        borderRadius: 20,
        backgroundColor: activity.completed ? Colors.primary : Colors.gray,
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
            By you
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
      </View>
    </Drawer>
  );
}
