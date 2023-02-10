import React from 'react';
import {
  View,
  Colors,
  Text,
  TouchableOpacity,
  Assets,
  Avatar,
  Typography,
} from 'react-native-ui-lib';
import { useNavigation } from '@react-navigation/native';

import { IUser } from '../../../../models/User.model';

import { ScreenNavigationProp } from '../../../../types';
import { ButtonIcon } from '../../../../components/Buttons/ButtonIcon';
import { AssetsIconsType } from '../../../../matherialUI';
import { useDeleteTeammateMutation } from '../../../../redux/api/teammates';

import { ITripResponse } from '../../../../models/responses/TripResponse';

import { useGetUserQuery } from '../../../../redux/api/user';

export function TeammatesListItem(
  { teammate, activatedTrip }:
  { teammate: IUser, activatedTrip?: ITripResponse | undefined },
) {
  const { data: user } = useGetUserQuery();

  const navigation = useNavigation<ScreenNavigationProp>();

  const [deleteTeammate] = useDeleteTeammateMutation();

  const isTripOwner = activatedTrip?.userId === teammate.uid;
  const isUserAdmin = user?.uid === activatedTrip?.userId;

  const deleteTeammateHandler = async () => {
    try {
      await deleteTeammate(teammate.uid).unwrap();
    } catch (e: any) {
      console.log(e);
    }
  };

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      row
      centerV
      marginB-24
      onPress={() => navigation.navigate('TeammateProfile', { teammate })}
    >
      <Avatar
        source={
          typeof teammate.avatar === 'string'
            ? {
              uri: teammate.avatar,
            }
            : teammate.avatar
        }
        size={100}
        imageStyle={{
          borderRadius: 16,
          backgroundColor: Colors.gray100,
        }}
        containerStyle={{
          marginRight: 16,
        }}
        ribbonLabel={isTripOwner ? 'Scout' : ''}
        ribbonLabelStyle={{ ...Typography.paragraph3 }}
        ribbonStyle={{
          backgroundColor: Colors.primary900,
          top: -8,
          marginLeft: 8,
        }}
      />

      <View flex>
        <Text marginB-8 heading4>
          {teammate.fullname}
        </Text>

        {teammate.occupation ? (
          <Text paragraph3 gray300>
            {teammate.occupation}
          </Text>
        ) : null}
      </View>

      {(isUserAdmin && !isTripOwner) ? (
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
            tintColor: Colors.primary900,
          }}
          onPressCallback={deleteTeammateHandler}
        />
      ) : null}
    </TouchableOpacity>
  );
}
