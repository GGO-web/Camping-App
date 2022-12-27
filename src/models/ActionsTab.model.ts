import { Animated, StyleProp, ViewStyle } from 'react-native';
import type { AssetsIconsType } from '../matherialUI';

export interface IActionTab {
  id: string;
  title: string;
  active: boolean;
  icon: AssetsIconsType,
  iconStyles: StyleProp<ViewStyle | Animated.AnimatedProps<ViewStyle>>,
}
