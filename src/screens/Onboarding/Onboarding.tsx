import React, { useRef, useState } from 'react';

import { View } from 'react-native';
import {
  Button,
  Colors,
  PageControl,
  Typography,
  Text,
  Image,
} from 'react-native-ui-lib';
import { Carousel } from 'react-native-ui-lib/src/components/carousel';
import { Link, useNavigation } from '@react-navigation/native';

import { v4 } from 'uuid';

import { onboardingScreens } from './OnboardingScreens';

import { globalStyles } from '../../styles/global';
import { onboardingStyles } from './OnboardingStyles';

import { ScreenNavigationProp } from '../../types';

export function Onboarding() {
  const [currentPage, setCurrentPage] = useState(0);
  const numOfPages = 4;

  const navigation = useNavigation<ScreenNavigationProp>();

  const carousel = useRef<any>(null);

  const moveBack = () => {
    const page = Math.max(0, currentPage - 1);

    carousel.current.goToPage(page);

    setCurrentPage(page);
  };

  const moveFront = () => {
    const page = Math.min(currentPage + 1, numOfPages);

    carousel.current.goToPage(page);

    setCurrentPage(page);
  };

  const moveTo = (index: number) => {
    carousel.current.goToPage(index);

    setCurrentPage(index);
  };

  const isDisabled = (type: string) => {
    switch (type) {
      case 'prev':
        return currentPage === 0;
      case 'next':
        return currentPage === numOfPages - 1;
      default:
        return false;
    }
  };

  return (
    <View style={globalStyles.container}>
      <Carousel
        ref={carousel}
        pagingEnabled
        initialPage={currentPage}
        pageControlProps={{ currentPage }}
        onChangePage={moveTo}
      >
        {onboardingScreens.map((item) => (
          <View key={v4()} style={onboardingStyles.carousel}>
            <View>
              <Image
                style={onboardingStyles.carouselImage}
                source={item.image}
              />
              <Text
                textCenter
                heading2
                style={onboardingStyles.carouselTitle}
              >
                {item.title}
              </Text>
              <Text
                textCenter
                paragraph2
                style={onboardingStyles.carouselText}
              >
                {item.text}
              </Text>
            </View>

            <View style={onboardingStyles.pagination}>
              <Button
                onPress={moveBack}
                style={{
                  ...onboardingStyles.button,
                  ...{
                    backgroundColor: Colors.primary100,
                    left: 0,
                  },
                  ...(isDisabled('prev')
                    ? globalStyles.visuallyHidden
                    : []),
                }}
                iconSource={require('../../../assets/prev.png')}
                iconStyle={{ tintColor: Colors.primary900, width: 16, height: 14 }}
                disabled={isDisabled('prev')}
              />

              <PageControl
                style={{ backgroundColor: '#eee' }}
                color={Colors.primary}
                inactiveColor={Colors.gray}
                onPagePress={moveTo}
                numOfPages={numOfPages}
                spacing={8}
                size={24}
                currentPage={currentPage}
              />

              <Button
                onPress={moveFront}
                style={{
                  ...onboardingStyles.button,
                  ...{
                    backgroundColor: Colors.primary900,
                    right: 0,
                  },
                  ...(isDisabled('next')
                    ? globalStyles.visuallyHidden
                    : []),
                }}
                iconSource={require('../../../assets/next.png')}
                iconStyle={{ tintColor: Colors.primary100, width: 16, height: 14 }}
                disabled={isDisabled('next')}
              />
            </View>

            <Button
              backgroundColor={Colors.primary}
              uppercase={false}
              style={{
                ...globalStyles.button,
                ...{ width: '100%', marginBottom: 16 },
              }}
              mode="contained"
              onPress={() => navigation.navigate('Login')}
            >
              <Text
                style={{
                  ...globalStyles.text,
                  ...globalStyles.buttonText,
                }}
              >
                Log In
              </Text>
            </Button>

            <Text textCenter>
              Don’t have an Account?
              {' '}
              <Link
                style={{
                  ...Typography.paragraph2,
                  ...Typography.underline,
                }}
                to={{ screen: 'SignUp' }}
              >
                Register
              </Link>
            </Text>
          </View>
        ))}
      </Carousel>
    </View>
  );
}
