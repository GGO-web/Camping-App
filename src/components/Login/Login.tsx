import React from "react";
import { Text, View } from "react-native";

import { useAppSelector } from "../../redux/hooks";
import { IUser } from "../../redux/userConfig/user.model";
import { userSelector } from "../../redux/userConfig/userSlice";
import { loginStyles } from "./LoginStyles";

export const Login = () => {
   const user: IUser = useAppSelector(userSelector);

   return (
      <View style={loginStyles.header}>
         <Text>Logged as {user.fullname}</Text>
      </View>
   );
};
