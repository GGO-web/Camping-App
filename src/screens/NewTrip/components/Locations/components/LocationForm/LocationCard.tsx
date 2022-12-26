import React, { useState } from 'react';
import {
  View, Image, Text, Button, Colors, Assets,
} from 'react-native-ui-lib';
import { useNavigation } from '@react-navigation/native';

import { ILocation } from '../../../../../../models/Locations.model';

import { globalStyles } from '../../../../../../styles/global';

export function LocationCard({ camp }: { camp: ILocation }) {
  const [altImages, setAltImages] = useState(
    [
      ...camp.images.map((image) => image.url),
    ],
  );
  const [campImageSrc, setCampImageSrc] = useState(altImages[0]);

  const navigation = useNavigation();

  const skipCampImage = () => {
    setAltImages(altImages.slice(1));
    setCampImageSrc(altImages[1]);
  };

  return (
    <View flex paddingH-16 centerV>
      <View flex style={{ height: '100%' }}>
        <Image
          overlayType={Image.overlayTypes.BOTTOM}
          style={{
            height: 400,
            borderRadius: 36,
            overflow: 'hidden',
          }}
          source={campImageSrc ? {
            uri: campImageSrc,
          } : Assets.graphic.camp}
          onError={() => {
            skipCampImage();
          }}
        />
      </View>

      <View flex style={{ marginTop: '-30%' }}>
        <Text white heading3 textCenter marginB-16 style={{ maxWidth: '90%' }}>{camp.name}</Text>

        <View centerH>
          <Button
            activeOpacity={0.97}
            style={{ ...globalStyles.button, minWidth: 160 }}
            backgroundColor={Colors.primary}
            disabledBackgroundColor={Colors.gray400}
            onPress={() => {
              navigation.navigate('Location' as never, {
                location: camp,
                locationImage: campImageSrc,
              } as never);
            }}
            mode="contained"
          >
            <Text
              style={{
                ...globalStyles.text,
                ...globalStyles.buttonText,
              }}
            >
              Explore
            </Text>
          </Button>
        </View>
      </View>
    </View>
  );
}
