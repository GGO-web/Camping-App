import React, { useState, useRef } from 'react';
import { Animated, SafeAreaView } from 'react-native';
import { Assets } from 'react-native-ui-lib';

import { Header } from '../Header/Header';
import { Navbar } from '../Navbar/Navbar';

import type { IRoute } from '../../App.models';
import type { AssetsIconsType } from '../../matherialUI';

import { globalStyles } from '../../styles/global';

export function MainWrapper({
  headerTitle,
  children,
  iconRight,
}: {
  headerTitle: string;
  children: any;
  iconRight?: AssetsIconsType
}) {
  const [showMenu, setShowMenu] = useState(false);

  const offsetValue = useRef(new Animated.Value(0)).current;
  const scaleValue = useRef(new Animated.Value(1)).current;

  const routes: IRoute[] = [
    {
      name: 'Home',
      path: 'Homepage',
      icon: Assets.icons.homeIcon,
    },
    {
      name: 'How to use',
      path: 'HowToUse',
      icon: Assets.icons.question,
    },
    {
      name: 'Language',
      path: 'Language',
      icon: Assets.icons.globe,
    },
    {
      name: 'Log-out',
      path: 'Logout',
      icon: Assets.icons.logout,
    },
  ];

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Navbar routes={routes} />

      <Animated.View
        style={{
          ...globalStyles.container,
          ...globalStyles.navcontainer,
          ...{
            flexGrow: 1,
            backgroundColor: 'white',
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            overflow: 'hidden',
          },
          ...{
            transform: [
              { scale: scaleValue },
              { translateX: offsetValue },
            ],
            borderRadius: showMenu ? 40 : 0,
          },
        }}
        onTouchEnd={() => showMenu && setShowMenu(false)}
      >
        <Header
          {...{
            showMenu,
            setShowMenu,
            offsetValue,
            scaleValue,
          }}
          title={headerTitle}
          iconRight={iconRight}
        />

        {children}
      </Animated.View>
    </SafeAreaView>
  );
}
