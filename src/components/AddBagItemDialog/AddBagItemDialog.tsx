import React, { useState } from 'react';
import {
  Assets,
  Colors,
  Dialog, PanningProvider, TextField, ToastPresets,
} from 'react-native-ui-lib';

import { v4 } from 'uuid';

import { Toast } from '../Toast/Toast';
import { ButtonIcon } from '../Buttons/ButtonIcon';
import { ButtonPrimary } from '../Buttons/ButtonPrimary';

import { AssetsColorsType, AssetsIconsType } from '../../matherialUI';

import { globalStyles } from '../../styles/global';
import { IBagItem } from '../../models/BagItem.model';

export function AddBagItemDialog({
  bagInputDialogVisible,
  setBagInputDialogVisible,
  addBagItemCallback,
}: {
  bagInputDialogVisible: boolean,
  setBagInputDialogVisible: Function,
  addBagItemCallback: Function
}) {
  const [bagItem, setBagItem] = useState('');
  const [toastParams, setToastParams] = useState({
    visible: false,
    preset: ToastPresets.FAILURE,
    message: 'Item couldn`t be empty',
  });

  return (
    <Dialog
      flex
      visible={bagInputDialogVisible}
      onDismiss={() => {
        setBagInputDialogVisible(false);
      }}
      overlayBackgroundColor="rgba(0,0,0,0.7)"
      containerStyle={{
        justifyContent: 'center',
        oveflow: 'visible',
      }}
      panDirection={PanningProvider.Directions.RIGHT}
    >
      <Toast
        visible={toastParams.visible}
        preset={toastParams.preset}
        toastMessage={toastParams.message}
        duration={700}
        autoDismiss={700}
        onDismiss={() => {
          setToastParams((prevToast) => ({ ...prevToast, visible: false }));
        }}
      />

      <ButtonIcon iconSource={(Assets as AssetsIconsType).back} />

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
            addBagItemCallback({
              id: v4(),
              description: bagItem,
              count: 1,
              checked: true,
            } as IBagItem);

            setBagItem('');
            setBagInputDialogVisible(false);
          } else {
            setToastParams((prevToast) => ({ ...prevToast, visible: true }));
          }
        }}
      />
    </Dialog>
  );
}
