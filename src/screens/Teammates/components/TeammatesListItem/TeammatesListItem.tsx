import React from 'react';
import {
  View,
  Image,
  Colors,
  Text,
  TouchableOpacity,
  Assets,
} from 'react-native-ui-lib';
import { useNavigation } from '@react-navigation/native';

import { IUser } from '../../../../models/User.model';

import { ScreenNavigationProp } from '../../../../types';
import { ButtonIcon } from '../../../../components/Buttons/ButtonIcon';
import { AssetsIconsType } from '../../../../matherialUI';
import { useDeleteTeammateMutation } from '../../../../redux/api/teammates';
import { useGetActivatedTripQuery } from '../../../../redux/api/trip';
import { firebaseAuth } from '../../../../firebase/firebase';

export function TeammatesListItem({ teammate }: { teammate: IUser }) {
  const navigation = useNavigation<ScreenNavigationProp>();

  const { data: activatedTrip } = useGetActivatedTripQuery();
  const [deleteTeammate] = useDeleteTeammateMutation();

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
      <Image
        marginR-16
        source={
          typeof teammate.avatar === 'string'
            ? {
              uri: teammate.avatar,
            }
            : teammate.avatar
        }
        style={{
          width: 100,
          height: 100,
          borderRadius: 16,
          backgroundColor: Colors.gray100,
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

      {activatedTrip?.userId === firebaseAuth.currentUser?.uid ? (
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
