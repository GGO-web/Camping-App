import React, { useRef } from 'react';
import { Animated } from 'react-native';

import { Colors, ToastPresets } from 'react-native-ui-lib';
import { ToastComponent } from './ToastComponent';

import { AssetsIconsType } from '../../matherialUI';

export function Toast({
  visible,
  toastMessage,
  preset = ToastPresets.GENERAL,
  toastIcon,
  duration = 1000,
  topOffset = 50,
  zIndex = 9999,
  autoDismiss = 1000,
  onDismiss,
}: {
  visible?: boolean,
  toastMessage: string,
  preset?: ToastPresets,
  toastIcon?: AssetsIconsType,
  duration?: number,
  topOffset?: number,
  zIndex?: number,
  autoDismiss?: number,
  onDismiss?: Function,
}) {
  const leftOffsetValue = useRef(new Animated.Value(-200)).current;

  return (
    <Animated.View style={{
      position: 'absolute',
      top: topOffset,
      zIndex,
      alignSelf: 'center',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: Colors.white,
      borderRadius: 16,
      paddingVertical: 10,
      paddingHorizontal: 20,
      transform: [{
        translateY: leftOffsetValue,
      }],
    }}
    >
      <ToastComponent {...{
        visible: visible || false,
        toastMessage,
        preset,
        toastIcon,
        duration,
        leftOffsetValue,
        autoDismiss,
        onDismiss,
      }}
      />
    </Animated.View>
  );
}
