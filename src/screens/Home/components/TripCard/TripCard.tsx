import React from 'react';

import {
  Card, Carousel, Colors, Image, Text, View,
} from 'react-native-ui-lib';
import { useCheckoutTripImages } from '../../../../hooks/checkoutTripImages';

import type { ILocation, ILocationImage } from '../../../../models/Locations.model';

import type { ITrip } from '../../../../models/Trip.model';

export function TripCard({
  trip,
  isActivated,
}: {
  trip: ITrip,
  isActivated: boolean
}) {
  const tripImages = useCheckoutTripImages({
    images: trip.selectedLocations.map((location: ILocation) => location.images).flat(2),
  });

  return (
    <Card
      enableShadow={false}
      marginB-16
      containerStyle={{
        position: 'relative',
        backgroundColor: Colors.primary100,
        width: '100%',
        borderRadius: 16,
        overflow: 'hidden',
        borderWidth: 2,
        borderColor: isActivated ? Colors.primary900 : Colors.primary100,
      }}
    >
      <Carousel
        animated
        autoplay
        style={{
          width: '100%',
          height: 200,
          overflow: 'hidden',
        }}
        pageControlProps={{
          size: 10,
          limitShownPages: 8,
          color: Colors.primary,
          inactiveColor: Colors.primary50,
        }}
        pageControlPosition={Carousel.pageControlPositions.OVER}
        showCounter
      >
        {tripImages.map((tripImage: ILocationImage) => (
          <Image
            key={tripImage.altText}
            style={{
              width: '100%',
              height: '100%',
              borderRadius: 16,
            }}
            source={{
              uri: tripImage.url,
            }}
          />
        ))}
      </Carousel>

      <View
        padding-8
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          borderBottomLeftRadius: 4,
          backgroundColor: Colors.primary600,
        }}
      >
        <Text paragraph3 white>
          {trip.tripPeriod.formatted}
        </Text>
      </View>

      <Text marginV-10 textCenter paragraph2>{trip.tripName}</Text>
    </Card>
  );
}
