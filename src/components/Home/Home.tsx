import React from "react";
import { Text, View } from "react-native-ui-lib";

import { useAppSelector } from "../../redux/hooks";
import { userSelector } from "../../redux/userConfig/userSlice";
import { globalStyles } from "../../styles/global";

export const Home = () => {
   const user = useAppSelector(userSelector);

   return (
      <View style={globalStyles.container}>
         <Text>Welcome home {user.fullname}</Text>
      </View>
   );
};
