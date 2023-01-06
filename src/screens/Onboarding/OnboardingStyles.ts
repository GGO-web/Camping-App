import { StyleSheet } from 'react-native';

export const onboardingStyles = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
  },
  carousel: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  carouselImage: {
    resizeMode: 'contain',
    width: 248,
    height: 228,
    margin: 'auto',
    alignSelf: 'center',
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
    width: '100%',
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
