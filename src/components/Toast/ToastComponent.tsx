import React, { useEffect } from 'react';
import { Animated, Easing } from 'react-native';
import {
  Assets, Colors, Image, Text, ToastPresets,
} from 'react-native-ui-lib';

import { AssetsIconsType } from '../../matherialUI';

export function ToastComponent({
  visible,
  toastMessage,
  preset,
  toastIcon,
  duration,
  leftOffsetValue,
  autoDismiss,
  onDismiss,
}: {
  visible: boolean,
  toastMessage: string,
  preset: ToastPresets,
  toastIcon?: AssetsIconsType,
  duration: number,
  leftOffsetValue: any,
  autoDismiss?: number,
  onDismiss?: Function,
}) {
  const getIconByPreset = (): AssetsIconsType => {
    const icons = Assets.icons as AssetsIconsType;

    switch (preset) {
      case ToastPresets.FAILURE:
        return icons.failure;
      case ToastPresets.SUCCESS:
        return icons.checkmark;
      default:
        return icons.info;
    }
  };

  const getIconColorByPreset = () => {
    switch (preset) {
      case ToastPresets.FAILURE:
        return Colors.red;
      case ToastPresets.SUCCESS:
        return Colors.primary;
      default:
        return Colors.white;
    }
  };

  useEffect(() => {
    if (visible) {
      Animated.sequence([
        Animated.timing(leftOffsetValue, {
          toValue: 0,
          duration,
          easing: Easing.elastic(1),
          useNativeDriver: true,
        }),
        Animated.timing(leftOffsetValue, {
          toValue: -200,
          duration: autoDismiss,
          easing: Easing.elastic(1),
          useNativeDriver: true,
        }),
      ]).start(() => {
        if (onDismiss) {
          onDismiss();
        }
      });
    }
  }, [visible]);

  return (
    <>
      <Image
        tintColor={getIconColorByPreset()}
        style={{
          minWidth: 24,
          minHeight: 18,
          maxWidth: getIconByPreset() === (Assets.icons as AssetsIconsType).checkmark ? 24 : 32,
          maxHeight: getIconByPreset() === (Assets.icons as AssetsIconsType).checkmark ? 18 : 32,
          resizeMode: 'contain',
        }}
        source={toastIcon || (getIconByPreset())}
        marginR-16
      />

      <Text
        dark
        paragraph2
        style={{ maxWidth: 300 }}
      >
        {toastMessage}
      </Text>
    </>
  );
}
