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
          <ScrollView style={{ margin: -12 }}>
            <View flex row style={{ flexWrap: 'wrap' }}>
              {snaps.map((snap) => (
                <View
                  margin-12
                  key={snap.id}
                  style={{
                    flexBasis: 'auto',
                    flexGrow: 1,
                    flexShrink: 1,
                  }}
                >
                  <Image
                    source={{ uri: snap.uri }}
                    style={{
                      flex: 1,
                      minWidth: 155,
                      height: 240,
                      borderRadius: 16,
                    }}
                  />
                </View>
              ))}

              <Button
                mode="contained"
                backgroundColor={Colors.gray}
                disabledBackgroundColor={Colors.gray400}
                style={{
                  flexBasis: 'auto',
                  flexGrow: 1,
                  flexShrink: 1,
                  minWidth: 155,
                  height: 240,
                  borderRadius: 16,
                  margin: 12,
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
            </View>
          </ScrollView>
        )}
    </MainWrapper>
  );
}
