import React, { useState } from 'react';
import {
  Assets, Colors, Dialog, PanningProvider, View, TextField, ToastPresets, TouchableOpacity,
} from 'react-native-ui-lib';
import { Toast } from 'react-native-ui-lib/src/incubator';

import { v4 } from 'uuid';

import { ButtonIcon } from '../../../../components/Buttons/ButtonIcon';
import { ButtonPrimary } from '../../../../components/Buttons/ButtonPrimary';
import { CrumbsLink } from '../../../../components/common/CrumbsLink';
import { useActions } from '../../../../hooks/actions';

import type { AssetsColorsType, AssetsIconsType } from '../../../../matherialUI';

import { globalStyles } from '../../../../styles/global';
import { BagListItems } from './components/BagListItems/BagListItems';

export function Bag() {
  const [bagInputDialogVisible, setBagInputDialogVisible] = useState(false);

  const [bagItem, setBagItem] = useState('');
  const [toastParams, setToastParams] = useState({
    visible: false,
    preset: ToastPresets.FAILURE,
    message: 'Item couldn`t be empty',
  });

  const { addBagItem } = useActions();

  return (
    <View style={{ ...globalStyles.container, ...globalStyles.navcontainer }}>
      <View marginB-32 centerV spread row>
        <CrumbsLink style={{ marginBottom: 0 }}>Prepare your Bag</CrumbsLink>

        <ButtonIcon
          iconSource={(Assets.icons as AssetsIconsType).plus}
          buttonStyles={{
            width: 32,
            height: 32,
            padding: 6,
          }}
          iconStyles={{
            tintColor: (Colors as AssetsColorsType).dark,
            width: '100%',
            height: '100%',
            resizeMode: 'cover',
          }}
          onPressCallback={() => setBagInputDialogVisible(true)}
        />
      </View>

      <Dialog
        flex
        visible={bagInputDialogVisible}
        onDismiss={() => {
          setBagInputDialogVisible(false);
        }}
        styles={{ height: '500px' }}
        overlayBackgroundColor="rgba(0,0,0,0.7)"
        containerStyle={{
          // alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100%',
        }}
        panDirection={PanningProvider.Directions.RIGHT}
      >
        <TouchableOpacity
          style={{
            justifyContent: 'center',
            height: '100%',
            overflow: 'hidden',
          }}
          onPressOut={() => {
            setBagInputDialogVisible(false);
          }}
          activeOpacity={1}
        >
          <Toast
            visible={toastParams.visible}
            position="top"
            message={toastParams.message}
            preset={toastParams.preset}
            onDismiss={() => {
              setToastParams((prevToast) => ({ ...prevToast, visible: false }));
            }}
            autoDismiss={2500}
            zIndex={2500}
          />

          <TextField
            migrate
            marginB-10
            label="Add a new bag item💡"
            value={bagItem}
            onChangeText={(newValue: string) => {
              setBagItem(newValue);
            }}
            validationMessageStyle={{
              ...globalStyles.validationMessage,
            }}
            labelStyle={{
              ...globalStyles.text,
              ...globalStyles.label,
              color: (Colors as AssetsColorsType).white,
            }}
            autoCapitalize="none"
            fieldStyle={{
              ...globalStyles.text,
              ...globalStyles.input,
            }}
          />

          <ButtonPrimary
            buttonText="Add item"
            buttonCallback={() => {
              if (bagItem.length !== 0) {
                addBagItem({
                  id: v4(),
                  content: bagItem,
                  count: 1,
                });

                setBagItem('');
                setBagInputDialogVisible(false);
              } else {
                setToastParams((prevToast) => ({ ...prevToast, visible: true }));
              }
            }}
          />
        </TouchableOpacity>
      </Dialog>

      <BagListItems />
    </View>
  );
}
