import React, { useState } from 'react';

import {
  Assets,
  Card, Carousel, Colors, Dialog, Image, PanningProvider, Text, TouchableOpacity, View,
} from 'react-native-ui-lib';

import { ButtonIcon } from '../../../../components/Buttons/ButtonIcon';
import { ButtonPrimary } from '../../../../components/Buttons/ButtonPrimary';

import { useActions } from '../../../../hooks/actions';

import { useCheckoutTripImages } from '../../../../hooks/checkoutTripImages';
import { AssetsIconsType } from '../../../../matherialUI';

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

  const [showTripSelectedDialog, setShowTripSelectedDialog] = useState<boolean>(false);

  const { setActivedTrip, setActiveTrip } = useActions();

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
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          overflow: 'hidden',
        }}
      >
        <View style={{
          backgroundColor: Colors.primary600,
          padding: 8,
          borderBottomLeftRadius: 8,
        }}
        >
          <Text paragraph3 white>
            {trip.tripPeriod.formatted}
          </Text>
        </View>

        <TouchableOpacity
          activeOpacity={0.9}
          row
          centerV
          style={{
            backgroundColor: Colors.dark,
            alignSelf: 'flex-end',
            paddingVertical: 4,
            paddingLeft: 16,
            paddingRight: 8,
            borderBottomLeftRadius: 8,
          }}
          onPress={() => setShowTripSelectedDialog(true)}
        >
          <Text paragraph3 white marginR-8>Enter trip</Text>
          <ButtonIcon
            iconSource={(Assets.icons as AssetsIconsType).enter}
            iconStyles={{
              tintColor: Colors.primary,
              width: 24,
              height: 24,
            }}
            onPressCallback={() => setShowTripSelectedDialog(true)}
          />
        </TouchableOpacity>
      </View>

      <Text
        textCenter
        paragraph2
        style={{ padding: 10 }}
      >
        {trip.tripName}
      </Text>

      <Dialog
        visible={showTripSelectedDialog}
        onDismiss={() => {
          setShowTripSelectedDialog(false);
        }}
        overlayBackgroundColor="rgba(0,0,0,0.7)"
        containerStyle={{
          justifyContent: 'center',
          oveflow: 'visible',
        }}
        panDirection={PanningProvider.Directions.RIGHT}
      >
        <Text heading3 white marginB-16>
          Do you want to enter this trip?
        </Text>

        <View row right>
          <ButtonPrimary
            buttonCallback={() => {
              setActivedTrip(trip.tripId);
              setActiveTrip(trip);
              setShowTripSelectedDialog(false);
            }}
            buttonText="Enter"
            marginR-8
            flexG-3
          />

          <ButtonPrimary
            buttonCallback={() => {
              setShowTripSelectedDialog(false);
            }}
            buttonText="Cancel"
            buttonStyles={{
              backgroundColor: Colors.red,
            }}
            flexG-1
          />
        </View>
      </Dialog>
    </Card>
  );
}
