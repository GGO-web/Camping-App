import { ImageInfo, ImagePickerResult, MediaTypeOptions } from 'expo-image-picker/build/ImagePicker.types';
import React, { useState } from 'react';
import {
  View, Text, Stepper, Button, Colors, Icon, Image,
} from 'react-native-ui-lib';

import { launchCameraAsync } from 'expo-image-picker';

import { useActions } from '../../../../hooks/actions';

import { IBagItem } from '../../../../models/BagItem.model';

export function BackpackListItem({ backpackItem }: { backpackItem: IBagItem }) {
  const [backpackImagePath, setBackpackImagePath] = useState('');

  const { updateBackpackItemCount } = useActions();

  const takePicture = async () => {
    const pickerResult: ImagePickerResult | ImageInfo = await launchCameraAsync({
      mediaTypes: MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!pickerResult.cancelled) {
      setBackpackImagePath(pickerResult.uri as string);
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
          {!backpackImagePath
            ? (
              <Icon
                size={24}
                style={{
                  resizeMode: 'cover',
                }}
                assetName="plus"
                source={{ uri: backpackImagePath }}
              />
            )
            : (
              <Image
                source={{ uri: backpackImagePath }}
                style={{ width: 64, height: 64, resizeMode: 'cover' }}
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
