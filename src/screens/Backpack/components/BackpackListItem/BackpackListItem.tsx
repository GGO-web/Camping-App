import { ImagePickerResult, MediaTypeOptions } from 'expo-image-picker/build/ImagePicker.types';
import React, { useEffect, useState } from 'react';
import {
  View, Text, Stepper, Button, Colors, Icon, Image,
} from 'react-native-ui-lib';

import { launchCameraAsync } from 'expo-image-picker';

import * as Permissions from 'expo-permissions';

import { IBagItem } from '../../../../models/BagItem.model';
import { useUpdateBagItemCountMutation, useUpdateBagItemImageMutation } from '../../../../redux/api/trip';
import { useDebounce } from '../../../../hooks/debounce';

export function BackpackListItem({ backpackItem }: { backpackItem: IBagItem }) {
  const [backpackItemCount, setBackpackItemCount] = useState(backpackItem.count);

  const debouncedBackpackItemCount = useDebounce(backpackItemCount, 3000);

  const [updateBagItemImage] = useUpdateBagItemImageMutation();
  const [updateBagItemCount] = useUpdateBagItemCountMutation();

  useEffect(() => {
    updateBagItemCount({
      bagItemId: backpackItem.id as string,
      count: debouncedBackpackItemCount,
    });
  }, [debouncedBackpackItemCount]);

  const takePicture = async () => {
    const cameraPermission = await Permissions.getAsync(Permissions.MEDIA_LIBRARY);

    if (cameraPermission.status !== 'granted') {
      return;
    }

    const pickerResult: ImagePickerResult = await launchCameraAsync({
      mediaTypes: MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
      base64: true,
    });

    if (!pickerResult.canceled) {
      updateBagItemImage({
        bagItemId: backpackItem.id as string,
        image: `data:image/jpeg;base64,${
          pickerResult.assets[0].base64}`,
      });
    }
  };

  return (
    <View marginB-16 row centerV spread>
      <View row centerV>
        <Button
          mode="contained"
          backgroundColor={Colors.gray}
          disabledBackgroundColor={Colors.gray400}
          marginR-16
          style={{
            minWidth: 48,
            width: 48,
            height: 48,
            borderRadius: 16,
            overflow: 'hidden',
          }}
          onPress={() => {
            takePicture();
          }}
        >
          {!backpackItem.image
            ? (
              <Icon
                size={24}
                style={{
                  resizeMode: 'cover',
                }}
                assetName="plus"
              />
            )
            : (
              <Image
                source={{ uri: backpackItem.image }}
                style={{ width: 48, height: 48, resizeMode: 'cover' }}
              />
            )}
        </Button>

        <Text style={{ width: '100%', maxWidth: 160 }} heading4 numberOfLines={2}>
          {backpackItem.description}
        </Text>
      </View>

      <View flex right>
        <Stepper
          value={backpackItemCount}
          minValue={1}
          maxValue={Infinity}
          useCustomTheme
          onValueChange={(newValue: number) => {
            setBackpackItemCount(newValue);
          }}
        />
      </View>
    </View>
  );
}
