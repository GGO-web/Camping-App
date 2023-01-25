import React, { useState } from 'react';
import {
  Assets, View, Image, Button, Colors, Icon, ToastPresets,
} from 'react-native-ui-lib';
import {
  ImagePickerResult, launchCameraAsync, MediaTypeOptions,
} from 'expo-image-picker';

import * as Clipboard from 'expo-clipboard';

import * as Permissions from 'expo-permissions';

import { ScrollView } from 'react-native';

import { MainWrapper } from '../../components/MainWrapper/MainWrapper';
import { NoResults } from '../../components/common/NoResults';

import { AssetsGraphicType, AssetsIconsType } from '../../matherialUI';
import { useGetAllSnapsQuery, useTakeSnapMutation } from '../../redux/api/trip';
import { ButtonIcon } from '../../components/Buttons/ButtonIcon';
import { Toast } from '../../components/Toast/Toast';

export function Snaps() {
  // const snaps = useAppSelector(getActivatedTripCollectionItemSelector)?.snaps;
  const { data: snaps } = useGetAllSnapsQuery();

  // const { addNewSnap } = useActions();
  const [takeSnap] = useTakeSnapMutation();

  const [toastParams, setToastParams] = useState({
    visible: false,
    preset: ToastPresets.SUCCESS,
    message: 'Image link has copied, just paste it into the browser to download',
  });

  const catchSnap = async () => {
    const cameraPermission = await Permissions.getAsync(Permissions.MEDIA_LIBRARY);

    if (cameraPermission.status !== 'granted') {
      setToastParams({
        visible: true,
        preset: ToastPresets.FAILURE,
        message: 'Sorry, we need a camera permissions to make this work',
      });

      return;
    }

    const pickerResult: ImagePickerResult = await launchCameraAsync({
      mediaTypes: MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.5,
      base64: true,
    });

    if (!pickerResult.canceled) {
      await takeSnap(`data:image/png;base64,${pickerResult.assets[0].base64}`).unwrap();
    }
  };

  const copyImageLink = async (image: string) => {
    await Clipboard.setStringAsync(image);
  };

  return (
    <MainWrapper headerTitle="Catch Snaps">
      <Toast
        visible={toastParams.visible}
        preset={toastParams.preset}
        toastMessage={toastParams.message}
        duration={1500}
        autoDismiss={1500}
        onDismiss={() => {
          setToastParams((prevToast) => ({ ...prevToast, visible: false }));
        }}
      />

      {!snaps?.length
        ? (
          <NoResults
            image={(Assets.graphic as AssetsGraphicType).onboarding2}
            text="You didn’t catch any snaps yet."
            buttonText="Catch Snaps"
            buttonCallback={() => catchSnap()}
          />
        )
        : (
          <ScrollView style={{ margin: -12 }}>
            <View flex row style={{ flexWrap: 'wrap' }}>
              {snaps.map((snap) => (
                <View
                  margin-12
                  key={snap._id}
                  style={{
                    position: 'relative',
                    flexBasis: 'auto',
                    flexGrow: 1,
                    flexShrink: 1,
                  }}
                >
                  <Image
                    source={{ uri: snap.image }}
                    style={{
                      flex: 1,
                      minWidth: 155,
                      height: 240,
                      borderRadius: 16,
                    }}
                  />

                  <ButtonIcon
                    buttonStyles={{
                      position: 'absolute',
                      right: 0,
                      top: 0,
                      width: 40,
                      height: 40,
                      padding: 8,
                      borderBottomLeftRadius: 16,
                      backgroundColor: Colors.primary500,
                    }}
                    iconSource={(Assets.icons as AssetsIconsType).copy}
                    iconStyles={{ width: '100%', height: '100%', tintColor: Colors.white }}
                    onPressCallback={() => {
                      copyImageLink(snap?.image);

                      setToastParams({
                        ...toastParams,
                        visible: true,
                      });
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
