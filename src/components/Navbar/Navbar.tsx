import {
  useNavigation, useRoute,
} from '@react-navigation/native';
import React, { useEffect, useState } from 'react';

import {
  Assets,
  Avatar,
  Button,
  Colors,
  Icon,
  Text,
  TouchableOpacity,
  View,
} from 'react-native-ui-lib';

import { ScrollView } from 'react-native';

import { IRoute } from '../../App.models';
import { expandedNavigationRoutes, mainNavigationRoutes } from '../../constants';

import { useGetActivatedTripQuery } from '../../redux/api/trip';
import { useGetUserQuery } from '../../redux/api/user';

import { globalStyles } from '../../styles/global';
import { navbarStyles } from './NavbarStyles';

import { ScreenNavigationProp } from '../../types';

export function Navbar() {
  // const user = useAppSelector(userSelector);
  const { data: user } = useGetUserQuery();

  const navigation = useNavigation<ScreenNavigationProp>();

  const route = useRoute();

  const { data: activatedTrip } = useGetActivatedTripQuery();

  const [routes, setRoutes] = useState(mainNavigationRoutes);

  useEffect(() => {
    setRoutes(activatedTrip ? expandedNavigationRoutes : mainNavigationRoutes);
  }, [activatedTrip]);

  return (
    <View
      style={{
        ...globalStyles.container,
        ...globalStyles.navcontainer,
        ...navbarStyles.container,
      }}
    >
      <View marginB-30 style={navbarStyles.innerContainer}>
        <Avatar
          source={
            user?.avatar
              ? {
                uri: user.avatar,
              }
              : Assets.icons.avatar
          }
          size={64}
          onPress={() => navigation.navigate('Profile')}
        />

        <View marginT-8 marginB-30 style={navbarStyles.profile}>
          <Text white heading4 marginR-16>
            {user?.fullname}
          </Text>

          <Button
            backgroundColor="transparent"
            iconStyle={{ width: 24, height: 24, resizeMode: 'contain' }}
            iconSource={Assets.icons.pen}
            onPress={() => navigation.navigate('Profile')}
          />
        </View>

        <ScrollView>
          {routes?.map((routeItem: IRoute, index: number) => {
            const isActiveRoute = route.name === routeItem.path;

            return (
              <TouchableOpacity
                // eslint-disable-next-line react/no-array-index-key
                key={index}
                activeOpacity={0.8}
                row
                centerV
                marginB-24
                style={{
                  ...navbarStyles.route,
                  ...(isActiveRoute ? navbarStyles.activeRoute : null),
                }}
                onPress={() => navigation.navigate(routeItem.path)}
              >
                <Icon
                  style={{
                    ...{
                      display: 'flex',
                      flexBasis: 24,
                      flexShrink: 1,
                      tintColor: !isActiveRoute
                        ? Colors.primary100
                        : Colors.primary900,
                      resizeMode: 'contain',
                    },
                  }}
                  size={24}
                  marginR-16
                  source={routeItem.icon}
                />

                <Text
                  paragraph2
                  style={{
                    ...{
                      color: !isActiveRoute
                        ? Colors.primary100
                        : Colors.primary900,
                    },
                  }}
                >
                  {routeItem.name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
    </View>
  );
}
