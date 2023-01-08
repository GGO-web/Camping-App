import React from 'react';
import { ScrollView } from 'react-native';
import {
  Assets, Colors, Icon, View, Text,
} from 'react-native-ui-lib';

import { v4 } from 'uuid';

import dayjs from 'dayjs';
import { MainWrapper } from '../../components/MainWrapper/MainWrapper';

import { notifications as mockedNotifications } from '../../constants';

import { datesIsDifferent, sortedNotificationsByDate } from '../../helpers/notificationsHelpers';

import { NotificationTypes } from '../../models/Notification.model';
import { AssetsIconsType } from '../../matherialUI';

export function Notifications() {
  const notifications = mockedNotifications;
  const sortedNotifications = sortedNotificationsByDate(notifications);

  const getNotificationIcon = (iconType: NotificationTypes) => {
    switch (iconType) {
      case 'badge':
        return (Assets.icons as AssetsIconsType).reward;
      case 'info':
        return (Assets.icons as AssetsIconsType).info;
      case 'complete':
        return (Assets.icons as AssetsIconsType).checkmark;
      default:
        return (Assets.icons as AssetsIconsType).info;
    }
  };

  return (
    <MainWrapper headerTitle="Notifications">
      <ScrollView>
        {sortedNotifications.map((notification, index) => {
          const dateHeading = index === 0 || datesIsDifferent(
            sortedNotifications[index - 1].date,
            notification.date,
          );

          return (
            <>
              {dateHeading
                ? (
                  <Text key={v4()} paragraph3 textCenter gray300 marginB-16>
                    {dayjs(notification.date).format('DD MMM YYYY')}
                  </Text>
                )
                : null}

              <View
                key={notification.id}
                backgroundColor={Colors.primary50}
                style={{ borderRadius: 16 }}
                row
                centerV
                padding-16
                marginB-24
              >
                <View
                  left
                  marginR-16
                  style={{
                    borderRadius: 16,
                    backgroundColor: Colors.primary100,
                    width: 48,
                    height: 48,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Icon
                    source={getNotificationIcon(notification.icon)}
                    style={{
                      width: 24,
                      height: 24,
                      resizeMode: 'contain',
                      tintColor: Colors.primary900,
                    }}
                  />
                </View>

                <View flex>
                  <Text paragraph3 primary900>
                    {notification.title}
                  </Text>

                  <Text
                    numberOfLines={3}
                    style={{ maxWidth: 220 }}
                    paragraph3
                    primary700
                  >
                    {notification.text}
                  </Text>
                </View>
              </View>
            </>
          );
        })}
      </ScrollView>
    </MainWrapper>
  );
}
