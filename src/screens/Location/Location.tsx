import React from 'react';
import {
  View, Text, Image, Button, Colors,
} from 'react-native-ui-lib';

import { useNavigation, useRoute } from '@react-navigation/native';

import { CrumbsLink } from '../../components/common/CrumbsLink';

import { globalStyles } from '../../styles/global';
import { ILocation } from '../../models/Locations.model';
import { useActions } from '../../hooks/actions';

export function Location() {
  const route = useRoute();
  const navigation = useNavigation();

  const { location, locationImage } = route.params as {
    location: ILocation,
    locationImage: string
  };

  const { addLocation } = useActions();

  const saveLocation = () => {
    addLocation(location);

    navigation.goBack();
  };

  return (
    <View style={{
      ...globalStyles.container, ...globalStyles.navcontainer, paddingHorizontal: 0, position: 'relative',
    }}
    >
      <Image
        overlayType={Image.overlayTypes.SOLID}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: -2,
        }}
        source={{ uri: locationImage }}
      />

      <View bottom paddingB-32 flex paddingH-20 style={{ zIndex: 2 }}>
        <CrumbsLink iconStyles={{ tintColor: '#fff' }} style={{ marginBottom: 'auto', paddingHorizontal: 0 }}>
          <Text white>Back to locations list</Text>
        </CrumbsLink>

        <View>
          <Text white heading3 marginB-2 style={{ maxWidth: '90%' }}>{location.name}</Text>
          <Text white paragraph2 marginB-16 style={{ maxWidth: '90%' }}>
            {
              location?.addresses?.length
                ? [
                  location?.addresses[0].city,
                  location?.addresses[0].stateCode,
                  location?.addresses[0].postalCode,
                ].join(', ')
                : ''
            }
          </Text>
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
