import { ImageSourcePropType } from 'react-native';
import { Assets } from 'react-native-ui-lib';
import { AssetsGraphicType } from '../../matherialUI';

export interface IOnboardingScreen {
  image: ImageSourcePropType;
  title: string;
  text: string;
}

export const onboardingScreens: Array<IOnboardingScreen> = [
  {
    image: (Assets.graphic as AssetsGraphicType).onboarding1,
    title: 'Your Tasks',
    text: 'I always reminds you about your planned activities. which is always my priority and your importance.',
  },
  {
    image: (Assets.graphic as AssetsGraphicType).onboarding2,
    title: 'Capture Your Memories',
    text: 'We know that catching photos are necessary in your trip. that’s why we have built-in camera and gallery feature.',
  },
  {
    image: (Assets.graphic as AssetsGraphicType).onboarding3,
    title: 'Track Your Fitness',
    text: 'Fitness is one of the main thing which is really inportant to your body and we track it in every second.',
  },
  {
    image: (Assets.graphic as AssetsGraphicType).onboarding4,
    title: 'There Is Much More',
    text: 'We have bunch of other cool features. which is super helpful for your next camping trip. so what are you waiting for?',
  },
];
