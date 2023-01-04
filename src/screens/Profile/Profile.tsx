import React from 'react';
import { View, Text } from 'react-native-ui-lib';
import { CrumbsLink } from '../../components/common/CrumbsLink';
import { globalStyles } from '../../styles/global';
import { ProfileAvatar } from './components/ProfileAvatar/ProfileAvatar';

export function Profile() {
  return (
    <View style={{ ...globalStyles.container, ...globalStyles.navcontainer }}>
      <CrumbsLink>
        <Text>Edit Profile</Text>
      </CrumbsLink>

      <ProfileAvatar />
    </View>
  );
}
