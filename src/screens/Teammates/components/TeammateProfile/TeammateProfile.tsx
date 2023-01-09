import { useRoute } from '@react-navigation/native';
import React from 'react';
import { ScrollView } from 'react-native';
import {
  Colors, View, Image, Text,
} from 'react-native-ui-lib';
import { CrumbsLink } from '../../../../components/common/CrumbsLink';

import { ITeamMate } from '../../../../models/Teammate.model';

import { globalStyles } from '../../../../styles/global';

export function TeammateProfile() {
  const { teammate } = useRoute().params as { teammate: ITeamMate };

  return (
    <View style={{ ...globalStyles.container, ...globalStyles.navcontainer }}>
      <CrumbsLink>Teammate</CrumbsLink>

      <ScrollView>
        <Image
          marginB-24
          source={typeof teammate.avatar === 'string' ? ({
            uri: teammate.avatar,
          }) : teammate.avatar}
          style={{
            width: 335,
            height: 335,
            borderRadius: 16,
            backgroundColor: Colors.gray100,
          }}
        />

        <View flex>
          <Text marginB-8 heading4>{teammate.name}</Text>

          {teammate.occupation
            ? <Text paragraph3 gray300 marginB-24>{teammate.occupation}</Text>
            : null}

          {teammate.description
            ? (
              <>
                <Text heading4 marginB-8>Description</Text>
                <Text paragraph2>{teammate.description}</Text>
              </>
            )
            : null}
        </View>
      </ScrollView>
    </View>
  );
}
