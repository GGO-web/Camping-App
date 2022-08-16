import { StyleSheet } from 'react-native';

export const onboardingStyles = StyleSheet.create({
   container: {
      alignItems: 'flex-start',
   },
   carousel: {
      justifyContent: 'flex-start',
      height: '100%',
   },
   carouselImage: {
      width: 224,
      height: 228,
      marginBottom: 40,
   },
   carouselTitle: {
      marginBottom: 8,
   },
   carouselText: {
      maxWidth: 320,
      marginBottom: 32,
   },
   pagination: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      height: 40,
      marginBottom: 24,
   },
   button: {
      position: 'absolute',
      width: 40,
      height: 40,
      borderRadius: 10,
   },
});
