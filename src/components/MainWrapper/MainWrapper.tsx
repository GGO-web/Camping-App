import React, { useState, useRef } from 'react';
import { Animated, SafeAreaView } from 'react-native';

import { Header } from '../Header/Header';
import { Navbar } from '../Navbar/Navbar';

import type { AssetsIconsType } from '../../matherialUI';

import { globalStyles } from '../../styles/global';

export function MainWrapper({
  headerTitle,
  children,
  iconRight,
  iconRightCallback,
}: {
  headerTitle: string;
  children: any;
  iconRight?: AssetsIconsType
  iconRightCallback?: Function
}) {
  const [showMenu, setShowMenu] = useState(false);

  const offsetValue = useRef(new Animated.Value(0)).current;
  const scaleValue = useRef(new Animated.Value(1)).current;

  return (
    <SafeAreaView style={{ flex: 1, height: '100%' }}>
      <Navbar />

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
          iconRightCallback={iconRightCallback}
        />

        {children}
      </Animated.View>
    </SafeAreaView>
  );
}
