import React from "react";
import {
  View,
  Image,
  Colors,
  Text,
  TouchableOpacity,
} from "react-native-ui-lib";

import { useNavigation } from "@react-navigation/native";
import { IUser } from "../../../../models/User.model";

export function TeammatesListItem({ teammate }: { teammate: IUser }) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      row
      centerV
      marginB-24
      onPress={() =>
        navigation.navigate("TeammateProfile" as never, { teammate } as never)
      }
    >
      <Image
        marginR-16
        source={
          typeof teammate.avatar === "string"
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
    </TouchableOpacity>
  );
}
