import React, { useState } from 'react';

import {
  Assets,
  Card,
  Carousel, Colors, Dialog, Icon, Image, PanningProvider, Text, TouchableOpacity, View,
} from 'react-native-ui-lib';

import { ButtonIcon } from '../../../../components/Buttons/ButtonIcon';
import { ButtonPrimary } from '../../../../components/Buttons/ButtonPrimary';

import { useCheckoutTripImages } from '../../../../hooks/checkoutTripImages';
import { AssetsIconsType, AssetsGraphicType } from '../../../../matherialUI';

import type { ILocation, ILocationImage } from '../../../../models/Locations.model';
import { ITripResponse } from '../../../../models/responses/TripResponse';
import { useDeactivateTripMutation, useSetActivatedTripMutation } from '../../../../redux/api/trip';

export function TripCard({
  trip,
  isActivated,
}: {
  trip: ITripResponse,
  isActivated: boolean
}) {
  const tripImages = useCheckoutTripImages({
    images: trip.locations.map((location: ILocation) => location.images).flat(2),
  });

  const [showTripSelectedDialog, setShowTripSelectedDialog] = useState<boolean>(false);

  const [setActivatedTrip] = useSetActivatedTripMutation();
  const [deactivateTrip] = useDeactivateTripMutation();

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
        borderColor: isActivated ? Colors.primary500 : Colors.primary100,
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
            defaultSource={(Assets.graphic as AssetsGraphicType).onboarding1}
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
            backgroundColor: isActivated ? Colors.red : Colors.dark,
            alignSelf: 'flex-end',
            paddingVertical: 4,
            paddingLeft: 16,
            paddingRight: 8,
            borderBottomLeftRadius: 8,
          }}
          onPress={() => setShowTripSelectedDialog(true)}
        >
          <Text paragraph3 white marginR-8>
            {isActivated ? 'Exit' : 'Enter'}
            {' '}
            trip
          </Text>
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
        heading4
        style={{
          padding: 10,
        }}
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
          Do you want to
          {' '}
          {isActivated ? 'exit' : 'enter'}
          {' '}
          this trip?
        </Text>

        <View row right>
          <ButtonPrimary
            buttonCallback={async () => {
              if (isActivated) {
                await deactivateTrip().unwrap();
              } else {
                setActivatedTrip(trip._id as string);
              }

              setShowTripSelectedDialog(false);
            }}
            buttonText={isActivated ? 'EXIT' : 'ENTER'}
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

      {trip.activated
        ? (
          <View
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              padding: 6,
              width: 32,
              height: 32,
              backgroundColor: Colors.primary,
            }}
          >
            <Icon
              source={(Assets.icons as AssetsIconsType).reward}
              style={{
                width: '100%',
                height: '100%',
                tintColor: Colors.white,
                resizeMode: 'contain',
              }}
            />
          </View>
        )
        : null}
    </Card>
  );
}
