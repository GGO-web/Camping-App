import { ImagePickerResult, MediaTypeOptions } from 'expo-image-picker/build/ImagePicker.types';
import React, { useEffect, useState } from 'react';
import {
  View, Text, Stepper, Button, Colors, Icon, Image, Assets,
} from 'react-native-ui-lib';

import { launchCameraAsync, requestCameraPermissionsAsync } from 'expo-image-picker';

import { Alert } from 'react-native';

import { ButtonIcon } from '../../../../components/Buttons/ButtonIcon';

import { IBagItem } from '../../../../models/BagItem.model';
import { useDeleteBagItemMutation, useUpdateBagItemCountMutation, useUpdateBagItemImageMutation } from '../../../../redux/api/trip';
import { useDebounce } from '../../../../hooks/debounce';

import { AssetsIconsType } from '../../../../matherialUI';

export function BackpackListItem({ backpackItem }: { backpackItem: IBagItem }) {
  const [backpackItemCount, setBackpackItemCount] = useState(backpackItem.count);

  const debouncedBackpackItemCount = useDebounce(backpackItemCount, 3000);

  const [updateBagItemImage] = useUpdateBagItemImageMutation();
  const [updateBagItemCount] = useUpdateBagItemCountMutation();
  const [deleteBagItem] = useDeleteBagItemMutation();

  const deleteBagItemCallback = () => {
    Alert.alert(
      'Are you sure?',
      'This action will permanently delete bag item from your backpack.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: async () => {
            await deleteBagItem(backpackItem.id as string).unwrap();
          },
        },
      ],
    );
  };

  useEffect(() => {
    updateBagItemCount({
      bagItemId: backpackItem.id as string,
      count: debouncedBackpackItemCount,
    });
  }, [debouncedBackpackItemCount]);

  const takePicture = async () => {
    const cameraPermission = await requestCameraPermissionsAsync();

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
    <View marginB-16 style={{ backgroundColor: Colors.primary, padding: 8, borderRadius: 12 }}>
      <View row centerV marginB-8>
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

        <Text flex heading4 white numberOfLines={2}>
          {backpackItem.description}
        </Text>

        <ButtonIcon
          iconSource={(Assets.icons as AssetsIconsType).garbage}
          buttonStyles={{
            marginLeft: 'auto',
            width: 48,
            height: 48,
            padding: 8,
          }}
          iconStyles={{
            width: 32,
            height: 32,
            tintColor: Colors.primary50,
          }}
          onPressCallback={deleteBagItemCallback}
        />
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
