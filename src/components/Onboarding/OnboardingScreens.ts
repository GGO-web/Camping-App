import { ImageSourcePropType } from 'react-native';

export interface IOnboardingScreen {
   image: ImageSourcePropType;
   title: string;
   text: string;
}

export const onboardingScreens: Array<IOnboardingScreen> = [
   {
      image: require('../../../assets/onboarding/img-1.png'),
      title: 'Your Tasks',
      text: 'I always reminds you about your planned activities. which is always my priority and your importance.',
   },
   {
      image: require('../../../assets/onboarding/img-2.png'),
      title: 'Capture Your Memories',
      text: 'We know that catching photos are necessary in your trip. that’s why we have built-in camera and gallery feature.',
   },
   {
      image: require('../../../assets/onboarding/img-3.png'),
      title: 'Track Your Fitness',
      text: 'Fitness is one of the main thing which is really inportant to your body and we track it in every second.',
   },
   {
      image: require('../../../assets/onboarding/img-4.png'),
      title: 'There Is Much More',
      text: 'We have bunch of other cool features. which is super helpful for your next camping trip. so what are you waiting for?',
   },
];
