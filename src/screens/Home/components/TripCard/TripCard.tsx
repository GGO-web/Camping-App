import React from 'react';

import {
  Card, Carousel, Colors, Image, Text, View,
} from 'react-native-ui-lib';

import type { ITrip } from '../../../../models/Trip.model';

export function TripCard({ trip }: { trip: ITrip }) {
  return (
    <Card
      enableShadow={false}
      marginB-16
      containerStyle={{
        backgroundColor: Colors.primary100,
        width: '100%',
        borderRadius: 16,
        overflow: 'hidden',
        borderWidth: 2,
        borderColor: Colors.primary700,
      }}
    >
      <View>
        <Carousel
          animated
          autoplay
          itemSpacings={5}
          style={{
            width: '100%',
            height: 200,
            overflow: 'hidden',
          }}
        >
          {trip.selectedLocations[0].images.map((tripImage) => (
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

        <Text marginV-10 textCenter paragraph2>{trip.tripName}</Text>
      </View>
    </Card>
  );
}
