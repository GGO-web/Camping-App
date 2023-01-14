import { ImagePickerResult, MediaTypeOptions } from 'expo-image-picker/build/ImagePicker.types';
import React from 'react';
import {
  View, Text, Stepper, Button, Colors, Icon, Image,
} from 'react-native-ui-lib';

import { launchCameraAsync } from 'expo-image-picker';

import { useActions } from '../../../../hooks/actions';

import { IBagItem } from '../../../../models/BagItem.model';

export function BackpackListItem({ backpackItem }: { backpackItem: IBagItem }) {
  const { updateBackpackItemCount, setBackpackItemUri } = useActions();

  const takePicture = async () => {
    const pickerResult: ImagePickerResult = await launchCameraAsync({
      mediaTypes: MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!pickerResult.canceled) {
      setBackpackItemUri({ id: backpackItem.id, uri: pickerResult.assets[0].uri });
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
          {!backpackItem.imageUri
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
                source={{ uri: backpackItem.imageUri }}
                style={{ width: 48, height: 48, resizeMode: 'cover' }}
              />
            )}
        </Button>

        <Text style={{ width: '100%', maxWidth: 160 }} heading4 numberOfLines={2}>
          {backpackItem.content}
        </Text>
      </View>

      <View flex right>
        <Stepper
          value={backpackItem.count}
          minValue={1}
          maxValue={Infinity}
          useCustomTheme
          onValueChange={(newValue: number) => {
            updateBackpackItemCount({
              id: backpackItem.id,
              count: newValue,
            });
          }}
        />
      </View>
    </View>
  );
}
