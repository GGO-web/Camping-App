import React from 'react';
import { View } from 'react-native-ui-lib';

import { CrumbsLink } from '../../components/common/CrumbsLink';

import { globalStyles } from '../../styles/global';

export function Location() {
  return (
    <View style={{ ...globalStyles.container, ...globalStyles.navcontainer }}>
      <CrumbsLink>Back to locations list</CrumbsLink>
    </View>
  );
}
