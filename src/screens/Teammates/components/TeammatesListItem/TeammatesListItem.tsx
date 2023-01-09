import React from 'react';
import {
  View, Image, Colors, Text,
} from 'react-native-ui-lib';
import { ITeamMate } from '../../../../models/Teammate.model';

export function TeammatesListItem({
  teammate,
}: {
  teammate: ITeamMate
}) {
  return (
    <View row centerV marginB-24>
      <Image
        marginR-16
        source={typeof teammate.avatar === 'string' ? ({
          uri: teammate.avatar,
        }) : teammate.avatar}
        style={{
          width: 100,
          height: 100,
          borderRadius: 16,
          backgroundColor: Colors.gray100,
        }}
      />

      <View flex>
        <Text marginB-8 heading4>{teammate.name}</Text>

        {teammate.occupation
          ? <Text paragraph3 gray300>{teammate.occupation}</Text>
          : null}
      </View>
    </View>
  );
}
