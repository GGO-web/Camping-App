import { ImagePickerResult, MediaTypeOptions } from 'expo-image-picker/build/ImagePicker.types';
import React, { useEffect, useState } from 'react';
import {
  View, Text, Stepper, Button, Colors, Icon, Image,
} from 'react-native-ui-lib';

// eslint-disable-next-line import/no-extraneous-dependencies
import * as FileSystem from 'expo-file-system';

import { launchCameraAsync } from 'expo-image-picker';

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
      bagItemId: backpackItem.id,
      count: debouncedBackpackItemCount,
    });
  }, [debouncedBackpackItemCount]);

  const takePicture = async () => {
    const pickerResult: ImagePickerResult = await launchCameraAsync({
      mediaTypes: MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!pickerResult.canceled) {
      const base64 = await FileSystem.readAsStringAsync(pickerResult.assets[0].uri, { encoding: 'base64' });

      updateBagItemImage({
        bagItemId: backpackItem.id,
        image: `data:image/png;base64,${base64}`,
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
