import React from 'react';
import {
  Assets, View, Text, Image, Button, Colors, Icon,
} from 'react-native-ui-lib';
import {
  ImageInfo, ImagePickerResult, launchCameraAsync, MediaTypeOptions,
} from 'expo-image-picker';

import { ScrollView } from 'react-native';
import { MainWrapper } from '../../components/MainWrapper/MainWrapper';

import { AssetsGraphicType } from '../../matherialUI';

import { globalStyles } from '../../styles/global';
import { useActions } from '../../hooks/actions';
import { useAppSelector } from '../../redux/hooks';
import { getActivatedTripCollectionItemSelector } from '../../redux/tripsCollection/tripsCollection';

export function Snaps() {
  const snaps = useAppSelector(getActivatedTripCollectionItemSelector)?.snaps;

  const { addNewSnap } = useActions();

  const catchSnap = async () => {
    const pickerResult: ImagePickerResult | ImageInfo = await launchCameraAsync({
      mediaTypes: MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!pickerResult.cancelled) {
      addNewSnap(pickerResult.uri);
    }
  };

  return (
    <MainWrapper headerTitle="Catch Snaps">
      {!snaps?.length
        ? (
          <View center flex>
            <Image
              marginB-24
              source={(Assets.graphic as AssetsGraphicType).onboarding2}
            />

            <Text marginB-8 paragraph2 gray700>
              You didn’t catch any snaps yet.
            </Text>

            <View left>
              <Button
                style={globalStyles.buttonOutlined}
                backgroundColor={Colors.primary}
                mode="outlined"
                onPress={() => catchSnap()}
              >
                <Text
                  style={{
                    ...globalStyles.text,
                    ...globalStyles.buttonText,
                    ...globalStyles.buttonTextOutlined,
                  }}
                >
                  Catch Snaps
                </Text>
              </Button>
            </View>
          </View>
        )
        : (
          <ScrollView style={{ margin: -24 }}>
            {snaps.map((snap) => (
              <View margin-24 key={snap.id}>
                <Image
                  source={{ uri: snap.uri }}
                  style={{ width: 155, height: 240 }}
                />
              </View>
            ))}

            <Button
              mode="contained"
              backgroundColor={Colors.gray}
              disabledBackgroundColor={Colors.gray400}
              style={{
                minWidth: 155,
                width: 155,
                height: 240,
                borderRadius: 16,
                margin: 24,
              }}
              onPress={() => catchSnap()}
            >
              <Icon
                style={{
                  width: 16,
                  height: 16,
                  resizeMode: 'contain',
                }}
                assetName="plus"
              />
            </Button>
          </ScrollView>
        )}
    </MainWrapper>
  );
}
