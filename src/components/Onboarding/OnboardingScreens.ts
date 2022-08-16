export interface IOnboardingScreen {
   imageSrc: string;
   title: string;
   text: string;
}

export const onboardingScreens: Array<IOnboardingScreen> = [
   {
      imageSrc: '../../../assets/onboarding/img-1.png',
      title: 'Your Tasks',
      text: 'I always reminds you about your planned activities. which is always my priority and your importance.',
   },
   {
      imageSrc: '/assets/onboarding/img-2.png',
      title: 'Capture Your Memories',
      text: 'We know that catching photos are necessary in your trip. that’s why we have built-in camera and gallery feature.',
   },
   {
      imageSrc: '/assets/onboarding/img-3.png',
      title: 'Track Your Fitness',
      text: 'Fitness is one of the main thing which is really inportant to your body and we track it in every second.',
   },
   {
      imageSrc: '/assets/onboarding/img-4.png',
      title: 'There Is Much More',
      text: 'We have bunch of other cool features. which is super helpful for your next camping trip. so what are you waiting for?',
   },
];
