import React from 'react';
import {
  View, Text, Image, Button, Colors, Carousel,
} from 'react-native-ui-lib';

import { useNavigation, useRoute } from '@react-navigation/native';

import { CrumbsLink } from '../../../../../../components/common/CrumbsLink';

import { useActions } from '../../../../../../hooks/actions';
import { ILocation, ILocationImage } from '../../../../../../models/Locations.model';

import { globalStyles } from '../../../../../../styles/global';

import { ScreenNavigationProp } from '../../../../../../types';

export function Location() {
  const route = useRoute();
  const navigation = useNavigation<ScreenNavigationProp>();

  const { location, locationImage } = route.params as {
    location: ILocation,
    locationImage: ILocationImage
  };

  const { addLocation } = useActions();

  const locationAddress = location?.addresses?.length
    ? [
      location?.addresses[0].city,
      location?.addresses[0].stateCode,
      location?.addresses[0].postalCode,
    ].join(', ')
    : '';

  const saveLocation = () => {
    addLocation(location);

    navigation.goBack();
  };

  return (
    <View style={{
      ...globalStyles.container,
      ...globalStyles.navcontainer,
      paddingHorizontal: 0,
      position: 'relative',
    }}
    >
      <Carousel
        animated
        loop
        autoplay
        containerStyle={{
          position: 'absolute',
          flex: 1,
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: -2,
          backgroundColor: Colors.dark,
        }}
      >
        {location.images.map((tripImage, index) => (
          <Image
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            overlayType={Image.overlayTypes.SOLID}
            style={{
              width: '100%',
              height: '100%',
            }}
            source={{ uri: tripImage?.url || locationImage.url }}
          />
        ))}
      </Carousel>

      <View
        bottom
        paddingB-32
        flex
        spread
        paddingH-20
        style={{
          zIndex: 2,
          position: 'relative',
        }}
      >
        <CrumbsLink iconStyles={{ tintColor: '#fff' }} style={{ marginBottom: 'auto', paddingHorizontal: 0 }}>
          <Text white>Back to locations list</Text>
        </CrumbsLink>

        <View>
          <Text white heading3 marginB-2 style={{ maxWidth: '90%' }}>{location.name}</Text>

          {locationAddress ? (
            <Text white paragraph2 marginB-16 style={{ maxWidth: '90%' }}>
              {locationAddress}
            </Text>
          ) : null}

          <Text gray paragraph2 marginB-16>{location.description}</Text>

          <View marginH-20>
            <Button
              activeOpacity={0.97}
              style={{ ...globalStyles.button, minWidth: 160 }}
              backgroundColor={Colors.primary}
              disabledBackgroundColor={Colors.gray400}
              onPress={() => {
                saveLocation();
              }}
              mode="contained"
            >
              <Text
                style={{
                  ...globalStyles.text,
                  ...globalStyles.buttonText,
                }}
              >
                Select Location
              </Text>
            </Button>
          </View>
        </View>
      </View>
    </View>
  );
}
