import React from 'react';
import {
  Assets, Colors, View,
} from 'react-native-ui-lib';

import { ButtonIcon } from '../../../../components/Buttons/ButtonIcon';
import { CrumbsLink } from '../../../../components/common/CrumbsLink';

import type { AssetsColorsType, AssetsIconsType } from '../../../../matherialUI';

import { globalStyles } from '../../../../styles/global';

export function Bag() {
  return (
    <View style={{ ...globalStyles.container, ...globalStyles.navcontainer }}>
      <View centerV spread row>
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
        />
      </View>

    </View>
  );
}
